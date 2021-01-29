import firebase from "firebase";
import "firebase/firestore";
import './../Firebase-config/init-firebase';

const db = firebase.firestore();

//-----------------------------------------------retrieve data on all events from db
const getDBdata = (eventsData,setEventsData) => {
    // let eventsArray = []; //data? <--
    db.collection("events")

 
    .onSnapshot((eventsSnapshot) => {
        // console.log(eventsSnapshot)
        eventsSnapshot.docChanges().forEach((change) => {
            // console.log("change");
            // console.log(change);
            let data = change.doc.data();

                //----------------------------------------if new event created add to eventsData state
                if (change.type === "added") {

                    console.log("New event: ", data);
                    console.log("doc.id: "+ change.doc.id)

                    let result = createGeoJSONfrom( data, change.doc.id );
                    if (result)
                        eventsData=eventsData.concat(result);
                    
                }


                //----------------------------------------if new event modified replace old event with altered one by event ID in eventsData state
                if (change.type === "modified") {
                    console.log("Modified event: ", data);
                    console.log("eventsData")
                    console.log(eventsData);

                    let index = eventsData.findIndex((event)=>{
                        console.log("Modified Single event")
                        console.log(event);
                        return event.properties.eventID === change.doc.id
                    })

                    console.log("index "+index)
          
                        
                    let result = createGeoJSONfrom( data, change.doc.id );
                    if(result)
                        eventsData.splice(index, 1, result)

                    console.log("eventsData")
                    console.log(eventsData)
                }


                //----------------------------------------if event deleted adjust eventsData state
                if (change.type === "removed") {
                    console.log("Removed event: ", data);

                    let index = eventsData.findIndex((event)=>{
                        return event.properties.eventID === change.doc.id
                    })

                    eventsData.splice(index, 1)
                }
            });
            setEventsData(eventsData);


    },
        (error) => {console.log(error)
    });

}

//----------------------------------------------adding new event
const addEvent = (curentUserID, ArrayOfCoordinates, objectOfProperties) => {

    db.collection("events").add({
        author: curentUserID,
        coordinates: ArrayOfCoordinates,
        ...objectOfProperties  
    })
    .then(function() {
        console.log("Document successfully written! run cb function");

    })
    .catch(function(error) {
        console.error("Error when adding new event to current user : ", error);
    });
}
    //-----------------------------------------------------creating new user in firestore db upon signing up
/*
    const createNewUser = (currentUser) => {

        if (currentUser){
       
            const userRef = db.collection('events').doc(currentUser.uid);
            
            userRef.get()
            .then(doc => {
            
                if (!doc.exists){
              
                    userRef.set({
                            events: [],
                            userEmail: currentUser.email
                        }
                    );
                }
            })
            
        }
    }
*/

//--------------------------------------Private function

    
const createGeoJSONfrom = (data, docID) => {
    let geoJSONtemplate = null;
    // coordinates validation
    if (data.coordinates && data.title && data.eventType && data.description && data.time && data.privacy && data.author){
        if (Array.isArray(data.coordinates)){
            if (data.coordinates.length == 2 && !isNaN(data.coordinates[0]) && !isNaN(data.coordinates[1])){
                if (data.coordinates[0] >= -180 && data.coordinates[0] <= 180 && data.coordinates[1] >= -90 && data.coordinates[0] <= 90) {
                    // rest string fields validation
                    if (data.title.length > 0 && data.eventType.length > 0 && data.description.length > 0 && data.privacy.length > 0 && data.author.length > 0 && docID.length > 0){
                        
                            geoJSONtemplate = {
                                "type": "Feature",
                                "geometry": {
                                "type": "Point",
                                "coordinates": data.coordinates
                                },
                                "properties": {
                                "title": data.title,
                                "eventType": data.eventType,
                                "description": data.description,
                                "startTime": data.time.seconds,
                                "privacy":  data.privacy,
                                "author": data.author,
                                "eventID": docID
                                }
                            }

                        
                    }
                }
            }
        }
    }
    return geoJSONtemplate;
}



export {getDBdata, addEvent};