import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="My Health" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Schedule" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="Agenda" icon={<AutoStoriesIcon />} />
        <NavLink  to={"/profile"}>  
          <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
        </NavLink>
      </BottomNavigation>
    </Box>
  );
}