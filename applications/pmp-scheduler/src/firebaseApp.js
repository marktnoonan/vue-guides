import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAyCtBUQFGLziQJJvZf2xR738wS3okr790",
  authDomain: "pmp-scheduler.firebaseapp.com",
  databaseURL: "https://pmp-scheduler.firebaseio.com",
  projectId: "pmp-scheduler",
  storageBucket: "",
  messagingSenderId: "823409033366"
}

export const firebaseApp = firebase.initializeApp(config)
export const workPeriodsRef = firebaseApp.database().ref().child('workPeriods')
