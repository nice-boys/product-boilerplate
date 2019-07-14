import express from "express";
import passport from "passport";
import middlewares from "../../../../utils/middlewares";

const app = express();

middlewares(app);

app.get(
  "*",
  // Store the redirectUrl from the ?r query param
  (req, _, next) => {
    if (req.query && req.session && req.query.r)
      req.session.redirectUrl = req.query.r;
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

export default app;
