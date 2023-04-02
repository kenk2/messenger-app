import React, { useState } from "react";
import useLogin from "@customHooks/useLogin";
import { User } from "@customTypes/users";
import {
  IconButton,
  Typography,
  Avatar,
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";

type IUserOptions = {
  user: User;
};

export default function UserOptions(props: IUserOptions) {
  const { user } = props;
  const { logout } = useLogin();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement | undefined>();

  const handleMenu = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(evt.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchor(undefined);
    setMenuOpen(false);
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography>Messenger App</Typography>
        <IconButton
          sx={{ marginLeft: "auto", color: "white" }}
          onClick={handleMenu}
        >
          <Typography sx={{ marginRight: "8px" }}>{user.userName}</Typography>
          <Avatar src={user.avatar} />
        </IconButton>
      </Toolbar>
      <Menu open={menuOpen} anchorEl={anchor} onClose={handleClose}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
