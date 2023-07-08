import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = ({ size }) => {
  function FacebookCircularProgress(props) {
    return (
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            mt: 1,
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}
          size={size}
          thickness={4}
          {...props}
          value={100}
        />
      </Box>
    );
  }
  return <FacebookCircularProgress />;
};

export default Spinner;
