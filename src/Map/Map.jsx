import React, {useEffect, useState} from 'react';
import {useAuth} from './../util/AuthContext';
import TestMap from './../SashaTestMap/TestMap';
import CreateEvent from '../CreateEvent/CreateEvent';


const Map = () => {
    const {currentUser, logout} = useAuth();
    const [showCreteEvent,setShowCreteEvent] = useState(false);
    const [eventsData, setEventsData] = useState([]);


    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 44.875225,
        longitude: -63.761557,
        zoom: 6
      });


    const toggler = ()=>{
        setShowCreteEvent(!showCreteEvent);
    }

    return ( 
        <>
            <TestMap 
                viewport={viewport}
                setViewport={setViewport}
                eventsData={eventsData} 
                setEventsData={setEventsData}
                showCreteEvent={showCreteEvent} 
            />
            <CreateEvent 
                showCreteEvent={showCreteEvent} 
                setShowCreteEvent={setShowCreteEvent} 
                setEventsData={setEventsData}
                viewport={viewport} />

            {currentUser?<p>{currentUser.email}</p>:""}
            <div onClick={toggler}>Create Event</div>
            <div onClick={logout}>  Sign Out  </div>
           
        </>
    );
}
 
export default Map;


