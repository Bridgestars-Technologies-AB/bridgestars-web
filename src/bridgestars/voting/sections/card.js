/*
=========================================================
* Otis Kit PRO - v2.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { borders } from '@mui/system';
import Box from '@mui/material/Box';
import bgImage from 'assets/images/bridgestars/circle-solid.svg';
import { Typography } from '@mui/material';

import commentIcon from 'assets/images/bridgestars/Comments.png';
import userIcon from 'assets/images/bridgestars/User.png';

function drawVote(voted, voteCount, handleVote) {
  return (
    <Grid
      mt={1}
      xs={12}
      item
      alignItems='center' //vertikalt
      justifyContent='center' //horisontellt
    >
      <Box
        mb={1}
        mx={2}
        py={1}
        textAlign='center'
        sx={{
          border: 1,
          borderRadius: '2px 2px 2px 2px',
          borderWidth: '1.5px',
          borderColor: voted ? 'success.main' : 'dark.main',
        }}
      >
        <MKTypography
          sx={{ fontSize: '4vmin' }}
          color={voted ? 'success' : 'dark'}
        >
          {voteCount ? voteCount : '1,203'}
        </MKTypography>
      </Box>

      <Box
        textAlign='center'
        variant='button'
        bgcolor={voted ? 'success.main' : 'dark.main'}
        mx={3}
        py={0.5}
        px={0.5}
        // width='61.8%'
        sx={{
          borderRadius: '2px 2px 2px 2px',
        }}
        onClick={handleVote}
      >
        <MKTypography sx={{ fontSize: '2.3vmin' }} color='white'>
          {voted ? 'VOTED' : 'VOTE'}
        </MKTypography>
      </Box>
    </Grid>
  );
}

function IssueCard({
  title,
  description,
  author,
  status,
  creationTime,
  handleVote,
  voted,
  nbrVotes,
  nbrComments,
  ...rest
}) {
  return (
    <Card sx={{ width: '100%' }} {...rest}>
      <Grid container p={1}>
        <Grid container item xs={4} sm={3} md={2} xl={1}>
          {drawVote(voted, nbrVotes, handleVote)}
        </Grid>

        <Grid item xs={8} sm={9} md={10}>
          <Grid container item md={12}>
            <MKTypography variant='h2' mt={1} sx={{ fontSize: '5vmin' }}>
              {title}
            </MKTypography>
          </Grid>
          <Grid container item md={12}>
            <Box
              my={1}
              px={1}
              bgcolor='rgba(255,0,0,0.5)'
              sx={{
                borderRadius: '10px 10px 10px 10px',
              }}
            >
              <MKTypography
                sx={{ fontSize: '3vmin', color: 'rgba(255, 0, 0, 1)' }}
              >
                {status}
              </MKTypography>
            </Box>
          </Grid>
        </Grid>
        <Grid container item md={12}>
          <MKTypography>
            {description.length > 200
              ? description.substring(0, 190) + ' . . . '
              : description}
          </MKTypography>
        </Grid>

        <Grid
          container
          sx={{
            flex: 1,
            flexDirection: 'row',
          }}
          justifyContent='center'
          alignItems='center'
          p={1}
        >
          <Grid
            container
            item
            sx={{
              flex: 1,
              flexDirection: 'row',
            }}
            alignItems='center'
          >
            <MKBox component='img' src={userIcon} width='6vmin'></MKBox>
            <MKTypography
              variant='h3'
              sx={{ fontSize: '3vmin', color: '#1e2e4acc' }}
              mx={1}
            >
              {author.username}
            </MKTypography>
            <MKBox
              width='1.2vmin'
              height='1.2vmin'
              mt={0.3}
              bgColor='#1e2e4acc'
              sx={{
                display: 'inline-block',
                borderRadius: '1vmin 1vmin 1vmin 1vmin',
              }}
            ></MKBox>
            <MKTypography
              variant='h3'
              sx={{ fontSize: '3vmin', color: '#1e2e4acc' }}
              mx={1}
            >
              {creationTime}
            </MKTypography>
          </Grid>
          <MKBox component='img' src={commentIcon} width='6vmin'></MKBox>
          <MKTypography
            variant='h3'
            sx={{ fontSize: '3vmin', color: '#1e2e4acc' }}
            ml={1}
          >
            {nbrComments ? nbrComments : 0}
          </MKTypography>
        </Grid>
        
      </Grid>
    </Card>
  );
}

export default IssueCard;
