// @mui material components
import { Box, Skeleton, Typography } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import userIcon from 'assets/images/bridgestars/User.png';

export function drawAuthor(author, creationTime, loading) {
  return (
    <>
      {loading ? (
        <Box display='flex' justifyContent='flex-start' alignItems='center'>
          <Skeleton width='130px' height='18px' />
        </Box>
      ) : (
        <Box display='flex' justifyContent='flex-start' alignItems='center'>
          <MKBox
            component='img'
            src={author?.get("img") ?? userIcon}
            width='18px'
            display='inline-block'
          ></MKBox>
          <MKTypography
            variant='h3'
            sx={{ fontSize: '12px', color: '#1e2e4acc' }}
            mx={{ sm: 1, xs: 0.5 }}
            display='inline-block'
          >
            {/* theotheotheotheo */}
            {author?.get("dispName") ?? "Anonymous"}
          </MKTypography>
          <MKBox
            width='4.5px'
            height='4.5px'
            mt={0.3}
            mb={0}
            bgColor='#1e2e4acc'
            sx={{
              borderRadius: '2px 2px 2px 2px',
            }}
            display='inline-block'
          ></MKBox>
          <MKTypography
            variant='h3'
            sx={{ fontSize: '12px', color: '#1e2e4acc' }}
            mx={{ sm: 1, xs: 0.5 }}
            display='inline-block'
          >
            {creationTime}
          </MKTypography>
        </Box>
      )}
    </>
  );
}
