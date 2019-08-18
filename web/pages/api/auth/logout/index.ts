import express from "express";
import middlewares from "../../../../utils/middlewares";

const app = express();

middlewares(app);

app.get("*", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default app;
