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
import bgImage from 'assets/images/bridgestars/circle-solid.svg'

function IssueCard({ title, description, author, status, creationTime, ...rest }) {
  return (
    <Card sx={{ width: '100%' }}>
      <Grid container>
        <Grid container item md={2}>
          <Box
            mb={2}
            width={'60%'}
            textAlign='center'
            sx={{
              border: 1,
              borderRadius: '15px 15px 15px 15px',
              borderWidth: '2px',
              borderColor: 'grey.500',
            }}
          >
            <Grid
              md={12}
              item
              alignItems='center' //vertikalt
              justifyContent='center' //horisontellt
            >
              <Box
                textAlign='center'
                sx={{
                  borderBottom: 1,
                  borderWidth: '2px',
                  borderColor: 'grey.500',
                }}
              >
                <IconButton>
                  <Icon>thumb_up</Icon>
                </IconButton>
              </Box>

              <Box textAlign='center'>
                <MKTypography variant='h4' sx={{ fontSize: '3vmin' }}>
                  123
                </MKTypography>
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Grid item md={8}>
          <Grid container item md={12}>
            <MKTypography variant='h2' sx={{ fontSize: '4vmin' }}>
              {title}
            </MKTypography>
          </Grid>
          <Grid container item md={12}>
            <Box
              mb={1}
              px={1}
              bgcolor='rgba(255,0,0,0.5)'
              sx={{
                borderRadius: '10px 10px 10px 10px',
              }}
            >
              <MKTypography
                sx={{ fontSize: '2vmin', color: 'rgba(255,0,0,1)' }}
              >
                {status}
              </MKTypography>
            </Box>
          </Grid>
          <Grid container item md={12}>
            <MKTypography>
              {description.length > 100
                ? description.substring(0, 100) + ' . . . '
                : description}
            </MKTypography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={0}
          md={2}
          alignItems='center' //vertikalt
          justifyContent='center' //horisontellt
        >
          <Grid item>
            <IconButton>
              <Icon sx={{ transform: 'scale(2)' }}>comment</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={12} mx={3} textAlign='right'>
          <MKTypography variant='text2' sx={{ fontSize: '1.5vmin' }}>
            <span>
              {author.username}
              <MKBox
                mb={0.15}
                mx={1}
                width='0.8vmin'
                height='0.8vmin'
                bgColor='rgba(0,0,0,0.8)'
                sx={{
                  display: 'inline-block',
                  borderRadius: '10px 10px 10px 10px',
                }}
              ></MKBox>
              {creationTime}
            </span>
          </MKTypography>
        </Grid>
      </Grid>
    </Card>
    // <Grid container item xs={12} lg={10} xl={8} xxl={8} mx={'auto'} {...rest}>
    //   <Card sx={{ width: '100%' }}>
    //     <Grid container alignItems='center'>
    //       <Grid item xs={12} lg={8}>
    //         <MKBox py={3} px={4}>
    //           <MKTypography variant='h3' mb={1}>
    //             {title}
    //           </MKTypography>
    //           <MKTypography variant='body2' color='text' fontWeight='regular'>
    //             {description}
    //           </MKTypography>
    //         </MKBox>
    //       </Grid>
    //       <Grid item xs={12} lg={4}>
    //         <MKBox p={3} textAlign='center'>
    //           <MKTypography variant='h6' mt={{ xs: 0, sm: 3 }}></MKTypography>
    //           <MKTypography variant='h1'>Free</MKTypography>
    //           <MKButton
    //             variant='gradient'
    //             component='a'
    //             href={link}
    //             color='error'
    //             size='large'
    //             sx={{ my: 2 }}
    //           >
    //             Download
    //           </MKButton>
    //           <MKTypography
    //             display='block'
    //             variant='button'
    //             color='text'
    //             fontWeight='regular'
    //           >
    //             Download size ({size})
    //           </MKTypography>
    //         </MKBox>
    //       </Grid>
    //     </Grid>
    //   </Card>
    // </Grid>
  );
}

export default IssueCard;
