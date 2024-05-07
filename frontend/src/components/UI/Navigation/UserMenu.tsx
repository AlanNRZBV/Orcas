import React, { useState } from 'react';
import { User } from '../../../types';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import Image from 'mui-image';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import {logout} from "../../../features/Users/usersThunks.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  let avatarImage = imageNotAvailable;

  if (user.avatar) {
    if (user.avatar.includes('googleusercontent')) {
      avatarImage = user.avatar;
    } else {
      avatarImage = apiURL + '/' + user.avatar;
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box display="flex" alignItems="center">
      <Button color="inherit" onClick={handleClick} sx={{ flexShrink: '0' }}>
        Hello, {user.displayName}!
      </Button>
      <Image
        src={avatarImage}
        alt={`${user.avatar} avatar`}
        style={{ width: '35px', height: '35px', borderRadius: '50%' }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
