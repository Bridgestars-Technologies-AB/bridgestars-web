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
import Icon from '@mui/material/Icon';
// import Stack from "@mui/material/Stack";

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKBadge from 'components/MKBadge';
import image from 'assets/images/bridgestars/black-gold-large.jpg';

function Discord() {
  return (
    <MKBox component='section' position='relative' py={2} mt={5}>
      <Container
        sx={{
          maxWidth: { xl: '90% !important', xxl: '1300px !important' },
        }}
      >
        <Grid container item xs={12} md={10} sx={{ mx: 'auto' }}>
          <MKBox
            variant='gradient'
            bgColor='dark'
            borderRadius='xxl'
            width='100%'
            py={6}
            sx={{ boxShadow: ({ boxShadows: { xxl } }) => xxl }}
          >
            <Grid
              container
              item
              flexDirection='column'
              alignItems='center'
              textAlign={'center'}
              xs={12}
              lg={8}
              sx={{ textAlign: 'center', mx: 'auto', px: { xs: 2 } }}
            >
              <MKTypography variant='h2' mb={1} color='white'>
                Join our Discord server{' '}
              </MKTypography>
              <MKTypography variant='body2' color='white'>
                Join the Bridgestars Discord server to find friends to play
                Bridge with and to contribute with ideas directly to the
                developers.
              </MKTypography>
            </Grid>
            <Grid
              container
              flex
              sx={{
                justifyContent: {
                  xs: 'center',
                  lg: 'center',
                  xl: 'left',
                  xxl: 'left',
                },
              }}
            >
              <Grid
                item
                xs={12}
                xl={6}
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                  position: 'relative',
                  px: 5,
                }}
              >
                <MKBox
                  borderRadius='lg'
                  maxWidth='450px'
                  width='100%'
                  position='relative'
                  sx={{
                    mt: { xxl: 5, xl: 10, lg: 6, xs: 6 },
                  }}
                >
                  <iframe
                    src='https://discord.com/widget?id=944310683141541948&theme=light'
                    width='100%'
                    height='450'
                    allowtransparency='true'
                    frameborder='0'
                    sandbox='allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
                  ></iframe>
                </MKBox>
              </Grid>
              <Grid
                item
                xs={11}
                xl={5}
                //mr={0.5}
                sx={{
                  position: 'relative',
                  py: { xs: 3 },
                  px: { xs: 2, xl: 2 },
                  textAlign: { xs: 'center', lg: 'center', xl: 'left' },
                  mt: { xs: 10, xl: 10, xxl: 7 },
                  my: { xs: 0, md: 'auto' },
                  color: ({ palette: { white } }) => white.main,
                }}
              >
                <Icon fontSize='large'>format_quote</Icon>
                <MKTypography
                  variant='body2'
                  color='white'
                  fontWeight='light'
                  mb={2}
                  sx={{ fontSize: '1.125rem' }}
                >
                  We on the Bridgestars developer team are very keen to provide
                  the best possible experience for you guys. In order to
                  accomplish this, we created a Discord server where you can
                  talk to us directly. However, the Discord server is not only
                  meant to keep us, the developers, busy with buggfixes and new
                  creative ideas but also to let you seamlessly immerse into the
                  Bridgestars community.
                </MKTypography>
                <MKTypography variant='button' fontWeight='bold' color='white'>
                  Theodor Lundqvist -{' '}
                  <MKTypography variant='caption' color='white'>
                    Bridgestars CTO and Founder
                  </MKTypography>
                </MKTypography>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Discord;
