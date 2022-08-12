
// @mui material components
import { Box, Grid, Skeleton } from '@mui/material';

// Otis Kit PRO components
import MKTypography from 'otis/MKTypography';
import colors from 'assets/theme/base/colors';

function drawVoter(voted, voteCount, handleVote) {
  return (
    <Grid item container>
      <Grid
        item
        xs={4}
        sm={12}
        mx={{ xs: 1, sm: 0 }}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          py={0.5}
          minWidth='75px'
          width='min-content'
          textAlign='center'
          sx={{
            border: 1,
            borderRadius: '2px 2px 2px 2px',
            borderWidth: '1.5px',
            borderColor: voted ? 'success.main' : 'dark.main',
          }}
        >
          <MKTypography
            sx={{ fontSize: '20px' }}
            color={voted ? 'success' : 'dark'}
          >
            {voteCount ? voteCount : '1,203'}
          </MKTypography>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sm={12}
        mx={{ xs: 1, sm: 0 }}
        my={{ xs: 'auto', sm: 0.5 }}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          width='55px'
          textAlign='center'
          variant='button'
          bgcolor={voted ? 'success.main' : 'dark.main'}
          py={0.5}
          px={1}
          // width='61.8%'
          sx={{
            borderRadius: '2px 2px 2px 2px',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
          onClick={handleVote}
        >
          <MKTypography sx={{ fontSize: '12px' }} color='white'>
            {voted ? 'VOTED' : 'VOTE'}
          </MKTypography>
        </Box>
      </Grid>
    </Grid>
  );
}

function drawXSVoter(voted, voteCount, handleVote) {
  return (
    <Grid item container>
      <Grid
        item
        xs={12}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          sx={{
            width: '25px',
            height: 0,
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderBottom:
              '25px solid ' + (voted ? colors.success.main : colors.dark.main),
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
          variant='button'
          // width='61.8%'
          onClick={handleVote}
        ></Box>
      </Grid>

      <Grid
        item
        xs={4}
        mt={1}
        width='min-content'
        mx={'auto'}
        display='flex'
        justifyContent='center'
      >
        <MKTypography
          sx={{ fontSize: '18px' }}
          variant='h3'
          color={voted ? 'success' : 'dark'}
        >
          {voteCount ? voteCount : 0}
        </MKTypography>
      </Grid>
      {/* <Box
          py={0.5}
          minWidth='75px'
          width='min-content'
          textAlign='center'
          sx={{
            border: 1,
            borderRadius: '2px 2px 2px 2px',
            borderWidth: '1.5px',
            borderColor: voted ? 'success.main' : 'dark.main',
          }}
        >
          <MKTypography
            sx={{ fontSize: '20px' }}
            color={voted ? 'success' : 'dark'}
          >
            {voteCount ? voteCount : '1,203'}
          </MKTypography>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sm={12}
        mx={{ xs: 1, sm: 0 }}
        my={{ xs: 'auto', sm: 0.5 }}
        width='min-content'
        display='flex'
        justifyContent='center'
      >
        <Box
          width='55px'
          textAlign='center'
          variant='button'
          bgcolor={voted ? 'success.main' : 'dark.main'}
          py={0.5}
          px={1}
          // width='61.8%'
          sx={{
            borderRadius: '2px 2px 2px 2px',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
          onClick={handleVote}
        >
          <MKTypography sx={{ fontSize: '12px' }} color='white'>
            {voted ? 'VOTED' : 'VOTE'}
          </MKTypography>
        </Box>*/}
    </Grid>
  );
}

export { drawXSVoter, drawVoter };
