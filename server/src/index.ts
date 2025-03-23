import ansis from 'ansis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { connectToDb } from './db';
import './dotenv-type';
import { authRouter } from './routers/auth';
import { clientRouter } from './routers/client';
import { OK_STR } from './utils/console-colors';


const PORT = process.env.PORT ?? 8080;
export const APP_URL = process.env.APP_URL;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
  })
);
app.use(cors({ credentials: true, origin: APP_URL }));
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/api/auth', authRouter);
app.use(clientRouter);

// Startup
console.log(`Starting server...`);
app.listen(PORT, () => {
  console.log(`${OK_STR}Running on port ${ansis.greenBright.underline(String(PORT))}!`);

  try {
    connectToDb();
    console.log(`${OK_STR}Connected to database!`);
  } catch (err) {
    throw err;
  }
});
