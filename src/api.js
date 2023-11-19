require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const admin = require("firebase-admin");
const { getFirebaseConfig } = require("./config/firebaseConfig");

const app = express();
const router = express.Router();

// Initialize Firebase Admin SDK
const serviceAccount = getFirebaseConfig();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors({ origin: process.env.CLIENT_APP, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/", (req, res, next) =>
  res.status(200).json({
    message: "Welcome to Resume Builder",
  })
);

require("./routes/auth")(app);

module.exports = app;
module.exports.handler = serverless(app);
