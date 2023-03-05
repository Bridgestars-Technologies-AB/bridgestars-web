import { Box, MenuItem } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';

function getAllSubTypes() {
  return [0, 1, 2, 3, 4, 5, 7, 6];
}

function statusColor(status) {
  switch (status) {
    case 'All':
      return '150, 150, 150';
    case 'Unknown':
      return '150, 150, 150';
    case 'New':
      return '200, 124, 247';
    case 'Reviewed':
      return '124, 150, 247';
    case 'Planned':
      return '111, 241, 220';
    case 'In Progress':
      return '255, 200, 114';
    case 'In Beta':
      return '150, 247, 124';
    case 'Already Exists':
      return '255, 60, 50';
    default:
      //Live
      return '58, 191, 43';
  }
}

function statusText(statusInt) {
  switch (statusInt) {
    case 0:
      return 'Unknown';
    case 1:
      return 'New';
    case 2:
      return 'Reviewed';
    case 3:
      return 'Planned';
    case 4:
      return 'In Progress';
    case 5:
      return 'In Beta';
    case 6:
      return 'Already Exists';
    default:
      return 'Live';
  }
}

function generateMenuItems(filterVal, counts) {
  const item = (text, count) => {
    const key = text.toLowerCase().replace(' ', '');
    return (
      <MenuItem value={key}>
        {text}

        {filterVal != key &&
          count > 0 &&
          drawCountBadge(count, statusColor(text))}
      </MenuItem>
    );
  };
  return getAllSubTypes().map((x) => {
    const count = (counts && counts[x]) || 0;
    if (x === 0) return item('All', count);
    return item(statusText(x), count);
  });
}

function drawCountBadge(nbr, color) {
  return (
    <Box width='100%' sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <MKBox
        width='min-content'
        mt={0.3}
        pt={0.2}
        pb={0.35}
        px={{ sm: 0.9, xs: 0.75 }}
        bgColor={'rgb(' + color + ', 0.7)'}
        sx={{
          left: { sm: '30px', xs: '15px' },
          top: { sm: '-2px', xs: '-1.5px' },
          zIndex: 1000,
          borderRadius: '20px',
        }}
      >
        <MKTypography
          position='relative'
          variant='h3'
          // color='white'
          sx={{ fontSize: { sm: '12px', xs: '10px' } }}
        >
          {nbr}
        </MKTypography>
      </MKBox>
    </Box>
  );
}
export { generateMenuItems, statusColor, statusText, getAllSubTypes };
