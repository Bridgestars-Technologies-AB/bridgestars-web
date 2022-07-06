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
    <Card sx={{ width: '100%', ...rest }}>
      <Grid container p={1}>
        <Grid
          container
          item
          xs={12}
          sm={2}
          justifyContent={{ xs: 'left', sm: 'center' }}
          alignItems={{ xs: 'center', sm: 'center' }}
        >
          {drawVote(voted, nbrVotes, handleVote)}
        </Grid>

        <Grid item md={8} px={2} py={1}>
          <MKTypography
            variant='h2'
            pr={1.5}
            pt={1.5}
            sx={{
              fontSize: '18px',
              overflowWrap: 'break-word',

              flexWrap: 1,
              flex: 1,
            }}
          >
            {title}
          </MKTypography>
          <MKTypography variant='text2' sx={{ fontSize: '12px' }}>
            {description.length > 200
              ? description.substring(0, 190) + '...'
              : description}
          </MKTypography>
          <Grid
            md={12}
            container
            item
            sx={{
              flex: 1,
              flexDirection: 'row',
            }}
            justifyContent='center'
            alignItems='center'
            py={1}
          >
            {bottomRow(author, status, creationTime)}
          </Grid>
        </Grid>
        <Grid item md={2} justifyContent='center' alignItems='center'>
          <MKBox component='img' src={commentIcon} width='40px' sx={{}}></MKBox>
          <MKTypography
            variant='h3'
            sx={{ fontSize: '9px', color: '#1e2e4acc' }}
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



function drawVote(voted, voteCount, handleVote) {
  return (
    <>
      <Grid item xs={3} sm={12} mx={{ xs: 1, sm: 'auto' }}>
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
        mx={{ xs: 1, sm: 'auto' }}
      >
        <Box
          width='min-content'
          textAlign='center'
          variant='button'
          bgcolor={voted ? 'success.main' : 'dark.main'}
          py={0.5}
          px={1}
          // width='61.8%'
          sx={{
            borderRadius: '2px 2px 2px 2px',
          }}
          onClick={handleVote}
        >
          <MKTypography sx={{ fontSize: '12px' }} color='white'>
            {voted ? 'VOTED' : 'VOTE'}
          </MKTypography>
        </Box>
      </Grid>
    </>
  );
}

function bottomRow(author, status, creationTime) {
  const statusColor = () => {
    switch (status) {
      case 'Reemewed':
        return '0, 0, 255'; //blue
      case 'Planned':
        return '255, 0, 255'; //purple
      case 'In Progress':
        return '0, 255, 255'; //cyan
      case 'In Beta':
        return '0, 255, 128'; //more green
      case 'Already Exists':
        return '255, 0, 0'; //red
      default:
        //0.1.1
        return '0, 255, 0'; //green
    }
  };
  return (
    <>
      <Grid
        container
        item
        sx={{
          flex: 1,
          flexDirection: 'row',
        }}
        alignItems='center'
      >
        <MKBox component='img' src={userIcon} width='18px'></MKBox>
        <MKTypography
          variant='h3'
          sx={{ fontSize: '9px', color: '#1e2e4acc' }}
          mx={1}
        >
          {author.username}
        </MKTypography>
        <MKBox
          width='3.6px'
          height='3.6px'
          mt={0.3}
          bgColor='#1e2e4acc'
          sx={{
            display: 'inline-block',
            borderRadius: '2px 2px 2px 2px',
          }}
        ></MKBox>
        <MKTypography
          variant='h3'
          sx={{ fontSize: '9px', color: '#1e2e4acc' }}
          mx={1}
        >
          {creationTime}
        </MKTypography>
        {status && (
          <Box
            mx={2}
            px={1}
            py={0.2}
            bgcolor={`rgba(${statusColor()}, 0.5)`}
            sx={{
              borderRadius: '3px',
            }}
          >
            <MKTypography variant='h3' sx={{ fontSize: '9px', opacity: 0.8 }}>
              {status}
            </MKTypography>
          </Box>
        )}
      </Grid>
    </>
  );
}
