const admin = require('firebase-admin');
const serviceAccount = require("./scavenger-8f9b4-firebase-adminsdk-d10zx-e290abffe3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scavenger-8f9b4.firebaseio.com"
});

const getUserId = async (token) => {
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
}

module.exports.admin = admin;
module.exports.getUserId = getUserId;