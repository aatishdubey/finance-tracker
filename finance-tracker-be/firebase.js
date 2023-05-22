const admin = require("firebase-admin");
const { serviceAccount } = require("./config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.projectId}.firebaseio.com`, // Replace with your Firestore database URL
});

module.exports = admin;
