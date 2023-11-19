module.exports = (app) => {
  const { signIn, signUp } = require("../controllers/auth.controller.js");

  const router = require("express").Router();
  
  router.post("/sign-in", signIn);
  router.post("/sign-up", signUp);

  app.use("/.netlify/functions/api/auth", router);
};
