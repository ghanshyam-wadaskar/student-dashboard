import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/students">
          <ListItemText primary="Students Page" />
        </ListItem>
        <ListItem>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
