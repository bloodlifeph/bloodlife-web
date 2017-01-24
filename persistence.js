/**
 * Paul Sydney Orozco (@xtrycatchx)
 * 
 * Persists requests. Currently coupled with firebase services
 */

var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://<REPLACE_WITH_YOURS>.firebaseio.com"
});

// this will record requestors for audit trail
exports.saveFootPrint = function(data) {
    let ref = firebase.database().ref('/blood-requests');
    let timeInMss = new Date().getTime();
    let userRef = ref.push({
        name: data.fullName,
        email: data.emailAddress,
        contactNumber: data.contactNumber,
        bloodType: data.bloodType,
        time: timeInMss
    });
}