import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography component={NavLink} to="/" variant="h3">
        Page doesn't exist yet. Let me get you home.
      </Typography>
    </Box>
  );
};

export default NotFound;
