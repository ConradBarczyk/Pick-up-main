
import React, { useEffect, useState } from 'react';
import ACCESS_TOKEN from './../Mapbox-config/Mapbox';


import ReactMapGL, {Layer,Source,Marker} from 'react-map-gl';
import { ReactSVG } from 'react-svg'
import CenterMarker from './CenterMarker/CenterMarker'
// import './TestMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import {getDBdata} from './../util/FirestoreFunctions';
import "firebase/firestore";
import './../Firebase-config/init-firebase'

const TestMap = (props) => {
    const{ eventsData, setEventsData, viewport, setViewport, showCreteEvent } = props;
    
    console.log("eventsData in TEST MAP");
    console.log(eventsData);

    useEffect( ()=>{
        getDBdata(eventsData,setEventsData); //retrieves data from firestore and saves it in state
         
    },[])
    
/*    
    //when "eventsData" changes, it adds Source/Layer to map obgect or just updates the map source
    useEffect(() => {
       
    }, [eventsData])
*/

    
    /*
    const layerConfig = {
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };
    */      
  

   return (  
       <ReactMapGL
       {...viewport}
            mapStyle= 'mapbox://styles/dorik-84/ckgpb164d0mzi19rz2431yfxi'
            mapboxApiAccessToken={ACCESS_TOKEN}
            onViewportChange={nextViewport => setViewport(nextViewport)}>

{/*
            <Source type="geojson" data={{type: 'FeatureCollection', features: eventsData}}>
                <Layer {... layerConfig} />
            </Source> 
 */}           

        <CenterMarker viewport={viewport} showCreteEvent={showCreteEvent} />
        { eventsData ? eventsData.map((eachEvent,index) => {
            let url = `/icons/${eachEvent.properties.eventType}.svg`;
            // let defaultURL = `/icons/location.svg`;
            return (
                <Marker 
                    key={index} 
                    latitude={eachEvent.geometry.coordinates[0]} 
                    longitude={eachEvent.geometry.coordinates[1]} 
                    // offsetLeft={10} 
                    // offsetTop={-10} 
                    >

                    <ReactSVG 
                    src={url}
                    beforeInjection={(svg) => {

                        svg.setAttribute('style', 'height: 25px')
                    }} />
                </Marker>)

        })
        : null
        }
                
        </ReactMapGL>   
    )
}
 
export default TestMap;