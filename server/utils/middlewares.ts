import { Express } from "express";
import session from "cookie-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "../auth/passport";

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET)
  throw new Error(
    "Please provide the SESSION_SECRET env variable via a .env file in the root of the project."
  );

export default (app: Express) => {
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    session({
      name: "session",
      keys: [SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
      signed: true,
      sameSite: "strict",
      httpOnly: true,
      maxAge: TWENTY_FOUR_HOURS
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // Refresh session on every request
  app.use((req, _, next) => {
    if (req.session && req.user) {
      req.session.lastRequest = Date.now();
    }
    next();
  });
};
