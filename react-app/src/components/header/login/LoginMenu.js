import * as React from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
// import { useUser } from "../../../context/userContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import './LoginMenu.css'

export default function LoginMenu() {
  const dispatch = useDispatch();
  // const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const currUser = useSelector((state) => state.session.user);




  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = (e) => {
    handleClose();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >

        <Avatar src={currUser.profile_url}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem className='dropdown_item' onClick={handleClose}>Profile</MenuItem> */}
        <ul>
          <li>{currUser.username}</li>
          <li>{currUser.email}</li>
        </ul>
        {!currUser && <MenuItem className='dropdown_item' onClick={handleClose}>Login</MenuItem>}
        {currUser && <MenuItem className='dropdown_item' onClick={logout}>Logout</MenuItem>}
      </Menu>
    </div>
  );
}
