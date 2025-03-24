import axios from 'axios';
import { RequestHandler } from 'express';
import passport, { DoneCallback } from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { APP_URL } from 'src';
import { MicrosoftUserProfile } from 'src/interfaces/login';
import { AuthStatusResponse } from '../../shared/interfaces/auth';

const TENANT_ID = process.env.TENANT_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const SERVER_URL = process.env.SERVER_URL;

passport.use(
  new MicrosoftStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL || `${SERVER_URL}/api/auth/login`,
      scope: ['user.read'],
      tenant: process.env.TENANT_ID,
      authorizationURL: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
      tokenURL: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    },
    async function (accessToken: string, refreshToken: string, profile: MicrosoftUserProfile, done: DoneCallback) {
      const response = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'arraybuffer'
      });
      if (response.status === 200) {
        const photoBase64 = response.data.toString('base64');
        profile.photo = photoBase64;
      }
      return done(null, profile);
    }
  )
);

passport.serializeUser((user: MicrosoftUserProfile, done: DoneCallback) => {
  done(null, user);
});

passport.deserializeUser((user: MicrosoftUserProfile, done: DoneCallback) => {
  done(null, user);
});

export const loginHandler: RequestHandler = (req, res, next) => {
  const redirectUrl = req.query.redirect as string | undefined;

  if (!req.query.code) {
    passport.authenticate('microsoft')(req, res, next);
  } else {
    passport.authenticate('microsoft', {
      failureRedirect: '/api/auth/login-failed',
      failureMessage: true,
    })(req, res, (err: any) => {
      if (err) {
        return next(err);
      }
      res.redirect(redirectUrl ?? `${APP_URL}/_recruiter`); // redirect to the client
    });
  }
};

export const statusHandler: RequestHandler<null, AuthStatusResponse, unknown> = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      user: {
        id: req.user?.id,
        displayName: req.user?.displayName,
        email: req.user?._json.mail!,
        photo: req.user?.photo, 
      },
    });
  }

  res.status(200).json({ isAuthenticated: false });
};

export const logoutHandler: RequestHandler = async (req, res, next) => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.logout(err => {
        if (err) return reject(err);
        resolve();
      });
    });
    await new Promise<void>((resolve, reject) => {
      req.session.destroy(err => {
        if (err) return reject(err);
        resolve();
      });
    });
    res.clearCookie('connect.sid').status(200).send({ success: true, message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
