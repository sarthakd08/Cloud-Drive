import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCoafWwHTBO7L-sbSzh9R-8X6fxIrrQoFc",
  authDomain: "cloud-drive-507ee.firebaseapp.com",
  projectId: "cloud-drive-507ee",
  storageBucket: "cloud-drive-507ee.appspot.com",
  messagingSenderId: "897160168421",
  appId: "1:897160168421:web:e40a49ea22398fd0e1650c"
})

// Extracting auth mosule from firebase
export const auth = app.auth()

// Extracting firestore module from firebase, but we only need our own colloctions created so extracting them
const fireStore = app.firestore();
export const database = {
  folders: fireStore.collection("folders"),
  files: fireStore.collection("files"),
  formatDoc: doc => {
    return {id: doc.id, ...doc.data()}
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}

export default app
