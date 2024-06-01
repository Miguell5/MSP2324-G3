import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ClinicLogo from '../assets/logoMyClinic.png';
import { useNavigate } from "react-router-dom";
import QueueWaitTime from '../pages/QueueWaitTime';
import PaymentAndBilling from '../pages/PaymentAndBilling';


const pages = ['Queue Wait Time','Remote Triage'];
const settings = ['Account', 'Logout','Payment And Billing','Triage requests'];

function ResponsiveAppBar({ setLoginState }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [dialogOpenQueue, setDialogOpenQueue] = React.useState(false);
  const [dialogOpenPayment, setDialogOpenPayment] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === 'Queue Wait Time') {
      setDialogOpenQueue(true); 
    }
    if (page === 'Remote Triage') {
      navigate("/remoteTriage");
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      setLoginState(false);
      navigate("/");
    } else if (setting === 'Account') {
      navigate("/profile");
    }
    if (setting === 'Payment And Billing') {
      setDialogOpenPayment(true); 
    }
    if (setting === 'Triage requests') {
      navigate("/triageInfo");
    }
  };

  return (

    <AppBar position="static" sx={{backgroundColor:'white',width: "102%"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            src={ClinicLogo}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 55, height: 55 }}
            alt="Clinic Logo"
          />


          <Box sx={{ width: "100%",flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Avatar
              src={ClinicLogo}
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 0.01,
                width: '50px',
              }}
              alt="Clinic Logo"
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "#3373d6", display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <QueueWaitTime open={dialogOpenQueue} onClose={() => setDialogOpenQueue(false)} />
      <PaymentAndBilling open={dialogOpenPayment} onClose={() => setDialogOpenPayment(false)} />
    </AppBar>
  );
}

export default ResponsiveAppBar;
