const firebase = require('firebase');

const firebaseConfig = {
    
    // my config

    // apiKey: "AIzaSyAYn4xkztbkzCjEWdvk4UeFCW8ECRfrx30",
    // authDomain: "outdoor-activities-test.firebaseapp.com",
    // databaseURL: "https://outdoor-activities-test.firebaseio.com",
    // projectId: "outdoor-activities-test",
    // storageBucket: "outdoor-activities-test.appspot.com",
    // messagingSenderId: "403917603346",
    // appId: "1:403917603346:web:424c6e6793049ef2d1cecb",
    // measurementId: "G-L9NS2BRKP1"

    // Sasha's Dev Config 

    apiKey: "AIzaSyAYn4xkztbkzCjEWdvk4UeFCW8ECRfrx30",
    authDomain: "outdoor-activities-test.firebaseapp.com",
    databaseURL: "https://outdoor-activities-test.firebaseio.com",
    projectId: "outdoor-activities-test",
    storageBucket: "outdoor-activities-test.appspot.com",
    messagingSenderId: "403917603346",
    appId: "1:403917603346:web:424c6e6793049ef2d1cecb",
    measurementId: "G-L9NS2BRKP1"

    // Production config 

    

};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);