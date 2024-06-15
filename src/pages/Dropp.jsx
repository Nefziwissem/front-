import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Import correct pour AccountCircle
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Dropp = () => {

  const navigate = useNavigate(); // Get the navigate function
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="Account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { }}>Paramètres  </MenuItem>
        <MenuItem onClick={() =>  navigate('/reset-password')}>P  </MenuItem>

        <MenuItem onClick={() => navigate('/')}>  Déconnexion</MenuItem>
      </Menu>
    </div>
  );
};

export default Dropp;
