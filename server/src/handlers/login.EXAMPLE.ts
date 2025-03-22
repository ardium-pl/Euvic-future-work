import { RequestHandler } from 'express';
import passport, { DoneCallback } from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { APP_URL } from 'src';
import { AuthStatusResponse, MicrosoftUserProfile } from 'src/interfaces/login';

const TENANT_ID = process.env.TENANT_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;


passport.use(new MicrosoftStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL || 'http://localhost:3000/api/auth/login',
  scope: ['user.read'],
  tenant: process.env.TENANT_ID,
  authorizationURL: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
  tokenURL: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`
},
function(accessToken: string, refreshToken: string, profile: MicrosoftUserProfile, done: DoneCallback) {
  return done(null, profile);
}
));

passport.serializeUser((user: MicrosoftUserProfile, done: DoneCallback) => {
  done(null, user);
});

passport.deserializeUser((user: MicrosoftUserProfile, done: DoneCallback) => {
  done(null, user);
});

export const loginHandler: RequestHandler = (req, res, next) => {
  if (!req.query.code) {
    passport.authenticate('microsoft')(req, res, next);
  } else {
    passport.authenticate('microsoft', {
      failureRedirect: '/api/auth/login-failed',
      failureMessage: true
    })(req, res, (err: any) => {
      if (err) {
        return next(err);
      }
      res.redirect(APP_URL); // redirect to the client
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
        email: req.user?._json.mail!
      }
    });
  }

  res.status(200).json({ isAuthenticated: false });
};

export const logoutHandler: RequestHandler = (req, res, next) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:4200/api/auth/login');
  });
};




