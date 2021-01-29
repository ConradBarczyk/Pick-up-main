import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useMediaQuery } from '@material-ui/core';
import SignInPage from './SignInPage/SignInPage';
import CreateEvent from './CreateEvent/CreateEvent';
import MyBottomNavigation from './BottomNav/BottomNav';

import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
  
import Map from './Map/Map';
import ProtectedRoute from './util/ProtectedRoute';
import {AuthProvider} from './util/AuthContext';
import SignInGoogleBtn from './SignInGoogleBtn/SignInGoogleBtn'


function App() {
    const matches = useMediaQuery("(min-width: 600px)");
    return (
        <Router>
            <AuthProvider>
                <Switch > 
                    {/* <ProtectedRoute path = "/create" component={CreateEvent} /> */}
                    {/* <Route exact path = "/" component={SignInGoogleBtn} /> */}
                    <Route exact path = "/" component={SignInPage} />

                    <ProtectedRoute path = "/success" component={matches ? Dashboard : MyBottomNavigation} />
                </Switch>
            </AuthProvider>
        </Router>

    );
}

export default App;
