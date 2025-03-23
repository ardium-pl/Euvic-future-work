import ansis from 'ansis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import MySQLStoreCreator from 'express-mysql-session';
import session, * as expressSession from 'express-session';
import passport from 'passport';
import { authRouter } from './routers/auth';
import { clientRouter } from './routers/client';
import { OK_STR } from './utils/console-colors';

const PORT = process.env.PORT ?? 8080;
export const APP_URL = process.env.APP_URL;
const app = express();

const MySQLStore = MySQLStoreCreator(expressSession);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  clearExpired: true,
  checkExpirationInterval: 15 * 60 * 1000,
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000 // 1 hour in milliseconds
  }
}));
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
    // connectToDb();
    console.log(`${OK_STR}Connected to database!`);
  } catch (err) {
    throw err;
  }
});
