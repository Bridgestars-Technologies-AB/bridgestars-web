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
        py={0.5}
        textAlign='center'
        sx={{
          border: 1,
          borderRadius: '2px 2px 2px 2px',
          borderWidth: '1.5px',
          borderColor: voted ? 'success.main' : 'dark.main',
        }}
      >
        <MKTypography
          sx={{ fontSize: '4vw' }}
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
        <MKTypography sx={{ fontSize: '2.3vw' }} color='white'>
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
  const statusColor = () => {
    switch (status) {
      case "Reviewed":
        return "0, 0, 255"
      case "Planned":
        return "255, 0, 255"
      case "In Progress":
        return '0, 255, 255'
      case "In Beta":
        return '0, 255, 128'
      case "Already Exists":
        return "255, 0, 0"
      default: //0.1.1
        return "0, 255, 0"
    }
  }
  return (
    <Card sx={{ width: '100%' }} {...rest}>
      <Grid container p={1}>
        <Grid container item pt={1} xs={3} sm={3} md={2} lg={2}>
          {drawVote(voted, nbrVotes, handleVote)}
        </Grid>

        <Grid item xs={9} sm={9} md={10} lg={10}>
          <Grid container item md={12}>
            <MKTypography variant='h2' mt={1} sx={{ fontSize: '4vw' }}>
              {title}
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container item md={12} px={2} py={1}>
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
            <MKBox component='img' src={userIcon} width='6vw'></MKBox>
            <MKTypography
              variant='h3'
              sx={{ fontSize: '3vw', color: '#1e2e4acc' }}
              mx={1}
            >
              {author.username}
            </MKTypography>
            <MKBox
              width='1.2vw'
              height='1.2vw'
              mt={0.3}
              bgColor='#1e2e4acc'
              sx={{
                display: 'inline-block',
                borderRadius: '1vw 1vw 1vw 1vw',
              }}
            ></MKBox>
            <MKTypography
              variant='h3'
              sx={{ fontSize: '3vw', color: '#1e2e4acc' }}
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
                <MKTypography
                  variant='h3'
                  sx={{ fontSize: '3vw', opacity: 0.8 }}
                >
                  {status}
                </MKTypography>
              </Box>
            )}
          </Grid>

          <MKBox component='img' src={commentIcon} width='6vw'></MKBox>
          <MKTypography
            variant='h3'
            sx={{ fontSize: '3vw', color: '#1e2e4acc' }}
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
