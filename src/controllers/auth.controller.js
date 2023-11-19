const { response } = require("../helpers/api.helper.js");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  signIn: async (req, res, app) => {
    return res.json(response(true, "Logged In Successfully", null));
  },
  signUp: async (req, res, app) => {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        return res
          .status(400)
          .json({ error: "Email, password, and Username are required" });
      }

      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: username,
      });

      const userDocRef = db.collection("users").doc(userRecord.uid);
      await userDocRef.set({
        email,
        username,
      });

      res.json(response(true, "Registered Successfully", null));
    } catch (error) {
      console.error(error);
      res.status(500).json(response(false, "Internal server error", error));
    }
  },
};
