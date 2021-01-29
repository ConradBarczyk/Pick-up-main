import React, { useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {useAuth} from './../util/AuthContext';
require ('./../../node_modules/firebaseui/dist/firebaseui.js');
require ('./../../node_modules/firebaseui/dist/firebaseui.css');


const firebase = require('firebase');
const firebaseui = require('firebaseui');


const SignInPage = () => {
    const history = useHistory()
    const {currentUser} = useAuth();

    useEffect(() => {
        if (currentUser) history.push('/success');
        else {
        const uiConfig = {
            signInSuccessUrl: '/success',
            signInOptions: [
             // Leave the lines as is for the providers you want to offer your users.
             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
             firebase.auth.FacebookAuthProvider.PROVIDER_ID,
             firebase.auth.TwitterAuthProvider.PROVIDER_ID,
             firebase.auth.GithubAuthProvider.PROVIDER_ID,
             firebase.auth.EmailAuthProvider.PROVIDER_ID,
             firebase.auth.PhoneAuthProvider.PROVIDER_ID,
             firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: '<your-tos-url>',
            // Privacy policy url/callback.
            privacyPolicyUrl: function() {
             window.location.assign('<your-privacy-policy-url>');
            }
            };
            
            // Initialize the FirebaseUI Widget using Firebase.
            const ui = new firebaseui.auth.AuthUI(firebase.auth());
            // const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    },[])


    return ( <div id="firebaseui-auth-container"></div> );
}
 
export default SignInPage;