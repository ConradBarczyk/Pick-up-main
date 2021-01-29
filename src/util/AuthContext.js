import React, { useContext, useState, useEffect } from "react";
import firebase from 'firebase';
import {createNewUser} from './../util/FirestoreFunctions';



const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}





export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //----------------------------------------get logged in user object upon first app load (because
  //----------------------------------------this AuthProvider is in the root of the app) and saves it in the state
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        // console.log(user);
        // createNewUser(user);
        setCurrentUser(user);
        setLoading(false);
    })
    return unsubscribe
  }, []);




  //-------------------------------------------additional methods like login/logout/signup that will be accessable eveywhere 
  function googleSignup() {
    // Using a popup.
    var provider = new firebase.auth().GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebase.auth().signOut();
  }

  //------------------------------------------update personal info  
  function updateDisplayName(name) {
    return currentUser.updateProfile({
      displayName: name,
    });
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }




  //this is all methods and curentUser object that are accessable everywhere in the app using  const{currentUser} = useAuth(); do not forget to import useAuth from this file
  const value = {
    currentUser,
    login,
    googleSignup,
    signup,
    logout,
    resetPassword,
    updateDisplayName,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
};