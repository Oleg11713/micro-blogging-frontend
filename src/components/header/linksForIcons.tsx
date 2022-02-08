import React from "react";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import { grey } from "@mui/material/colors";

import {
  MAIN_PAGE_ROUTE,
  MY_PROFILE_ROUTE,
  USERS_ROUTE,
} from "../../utils/constsRoutes";

function HeaderIconHome() {
  return (
    <IconButton aria-label="home">
      <HomeIcon fontSize="medium" sx={{ color: grey[50] }} />
    </IconButton>
  );
}

function HeaderIconUsers() {
  return (
    <IconButton aria-label="home">
      <GroupIcon fontSize="medium" sx={{ color: grey[50] }} />
    </IconButton>
  );
}

function HeaderIconProfile() {
  return (
    <IconButton aria-label="home">
      <AccountCircleIcon fontSize="medium" sx={{ color: grey[50] }} />
    </IconButton>
  );
}

export const publicLinksIcons = [
  {
    path: MAIN_PAGE_ROUTE,
    Icon: HeaderIconHome,
  },
  {
    path: USERS_ROUTE,
    Icon: HeaderIconUsers,
  },
];

export const authLinksIcons = [
  {
    path: MY_PROFILE_ROUTE,
    Icon: HeaderIconProfile,
  },
];
