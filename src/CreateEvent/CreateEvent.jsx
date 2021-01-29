import React, {useState} from 'react';
import firebase from "firebase";

import CreateEventType from "./CreateEventType"

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import {useAuth} from './../util/AuthContext';
import {addEvent} from './../util/FirestoreFunctions';


const CreateEvent = (props) => {

    ///================================================ < styles
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
          padding: '15px'
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    ///================================================styles />

    const {currentUser} = useAuth();
    const {showCreteEvent, setShowCreteEvent, viewport, setEventsData} = props;
    const [time,setTime] = useState('')
    const [description,setDescription] = useState('')
    const [eventType,setEventType] = useState('')
    const [value, setValue] = React.useState('public');


    const handlePrivacy = (event) => {
      setValue(event.target.value);
    };

    const resetForm = () => {
        setTime('');
        setDescription('');
        setEventType("");
        setValue('');
    }

    //adding new event using addEvent method
    const submit = () => {
       let coordinates = [viewport.latitude, viewport.longitude]; /// hardcoded coordinates of new event <<<<<======
       console.log(coordinates);
       let objectOfProperties = {
           title: "any title",
           description: description,
           eventType: eventType,
           privacy: value,
           time: firebase.firestore.Timestamp.fromDate(new Date(time))
       }
        addEvent(currentUser.uid,coordinates,objectOfProperties); //adding the event data into firebase and then save the data in eventsData state
        setShowCreteEvent(false);
        resetForm();
    }
    

    return ( 

        <div style={{position:"absolute",backgroundColor:"white", display:showCreteEvent?"block":"none"}}>

            <div>
                <h1>Create new event</h1>


                <div className={classes.container}>
                    <CreateEventType setEventType={setEventType}/>
                </div>
                
                <form className={classes.container} noValidate>
                    <TextField
                        onChange={(e)=>{setTime(e.target.value)}}
                        value={time}
                        id="datetime-local"
                        label="Schedule Event"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>

                <TextField
                    onChange={(e)=>{setDescription(e.target.value)}}
                    value={description}
                    id="outlined-textarea"
                    label="Event Description"
                    placeholder="Description"
                    className={classes.textField}
                    rows={4}
                    multiline
                    variant="outlined"
                />

                <FormControl className={classes.container} component="fieldset">
                    <FormLabel component="legend">Event Privacy</FormLabel>
                    <RadioGroup aria-label="privacy" name="privacy" value={value} onChange={handlePrivacy}>
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                        <FormControlLabel value="invite-only" control={<Radio />} label="Invite Only" />
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                    </RadioGroup>
                </FormControl>

                <div onClick={submit}>Submit</div>
            </div>
            
        </div>
    );
}
 
export default CreateEvent;
