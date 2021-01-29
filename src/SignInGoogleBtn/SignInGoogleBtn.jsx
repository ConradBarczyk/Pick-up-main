import React from 'react';
import './SignInGoogleBtn.css';
import firebase from 'firebase';
import {useHistory} from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from './../util/AuthContext';


const SignInGoogleBtn = () => {
    const history = useHistory();
    const {currentUser} = useAuth();

    useEffect(()=>{
        if (currentUser) history.push('/success');
    },[])

    const logIn = async () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        await firebase.auth().signInWithRedirect(provider);
    }
  

    return (  
        <button className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" style={{backgroundColor:"#ffffff"}}
            onClick={logIn} >
            <span className="firebaseui-idp-icon-wrapper">
                <img className="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"/>
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
        </button>
                  
    );
}
 
export default SignInGoogleBtn;