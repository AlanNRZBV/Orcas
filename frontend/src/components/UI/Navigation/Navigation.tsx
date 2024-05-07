import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import { selectUser } from '../../../features/Users/usersSlice.ts';

const Navigation = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          to="/"
          component={NavLink}
          variant="h6"
          color="white"
          sx={{ mr: 'auto', textDecoration: 'none' }}
        >
          Orcas
        </Typography>
        <Box display="flex" alignItems="center">
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
