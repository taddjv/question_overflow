import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as sessionActions from "../../../store/session.js";

export default function LoginMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenu, setShowMenu] = React.useState(true);

  const currUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    sessionActions.logout();
    setAnchorEl(null);
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
        <Avatar />
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
        <MenuItem>Profile</MenuItem>
        {currUser && showMenu && (
          <ul>
            <li>{currUser.username}</li>
            <li>{currUser.email}</li>
          </ul>
        )}
        {!currUser && <MenuItem>Login</MenuItem>}
        {currUser && <MenuItem onClick={handleClose}>Logout</MenuItem>}
      </Menu>
    </div>
  );
}
