import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Map from './../Map/Map';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function MyBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Map />
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Home" value="home" icon={<HomeRoundedIcon />} />
          <BottomNavigationAction label="Events" value="events" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Friends" value="friends" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Messages" value="messages" icon={<MessageRoundedIcon />} />
      </BottomNavigation>
    </>
  );
}