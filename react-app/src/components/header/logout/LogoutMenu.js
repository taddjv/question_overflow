import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'

export default function LogoutMenu() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const signUp = (e) =>{
    e.preventDefault()
    handleClose()
    history.push('/sign-up')
  }

  const login = (e) =>{
    e.preventDefault()
    handleClose()
    history.push('/login')

  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={login}>Login</MenuItem>
        <MenuItem onClick={signUp}>Signup</MenuItem>
      </Menu>
    </div>
  );
}
