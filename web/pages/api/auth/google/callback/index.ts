import express from "express";
import passport from "passport";
import middlewares from "../../../../../utils/middlewares";

const app = express();

middlewares(app);

app.get(
  "*",
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    const redirectUrl = (req.session && req.session.redirectUrl) || "/";
    if (req.session) delete req.session.redirectUrl;
    res.redirect(typeof redirectUrl === "string" ? redirectUrl : "/");
  }
);

export default app;
