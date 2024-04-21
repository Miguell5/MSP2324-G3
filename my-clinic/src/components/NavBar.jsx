import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate,useLocation } from "react-router-dom";

export default function NavBar() {
  
  const navigate = useNavigate();
  const location = useLocation();

  // Mapeamento entre paths e valores do BottomNavigation
  const pathToValue = {
    "/": 0,
    "/myHealth": 1,
    "/schedule": 2,
    "/agenda": 3,
    "/profile": 4
  };

  const initialValue = pathToValue[location.pathname] || 0;
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/myHealth");
        break;
      case 2:
        navigate("/schedule");
        break;
      case 3:
        navigate("/agenda");
        break;
      case 4:
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <Box style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="My Health" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Schedule" icon={<AddCircleIcon color='warning' fontSize='large'/>} />
        <BottomNavigationAction label="Agenda" icon={<AutoStoriesIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
}
