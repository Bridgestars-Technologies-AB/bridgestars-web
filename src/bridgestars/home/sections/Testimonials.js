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
import image from 'assets/images/bridgestars/black-gold-large.jpg';

function Testimonials() {
  return (
    <MKBox component='section' position='relative' py={6} mt={15}>
      <Container
        sx={{
          maxWidth: { xl: '90% !important', xxl: '1300px !important' },
        }}
      >
        <Grid container item xs={10} sx={{ mx: 'auto' }}>
          <MKBox
            variant='gradient'
            bgColor='dark'
            borderRadius='lg'
            width='100%'
            py={6}
          >
            <Grid container flex justifyContent='left'>
              <Grid
                item
                xs={12}
                xl={6}
                alignItems='center'
                textAlign='center'
                sx={{ position: 'relative', px: 6 }}
              >
                <MKBox
                  component='img'
                  src={image}
                  alt='image'
                  borderRadius='lg'
                  maxWidth='450px'
                  width='100%'
                  position='relative'
                  sx={{
                    mt: { xxl: 5, xl: 10, lg: -12, xs: -12 },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={11}
                xl={5}
                mr={0.5}
                sx={{
                  position: 'relative',
                  py: { xs: 3 },
                  px: { xs: 6, xl: 1 },
                  mt: { xs: 10, xl: 0 },
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
                  In a world of rapid technological advancements, the Bridge
                  world has not been able to keep up. There is a lack of a clean
                  and modern solution for playing Bridge online that is fun,
                  easy, and engaging. Our vision for the future contains a
                  unified platform for Bridge players on which they are able to
                  play and watch Bridge as well as catch up with the latest news
                  about Bridge. Bridgestars is an attempt of bringing that
                  vision to life, in a way that is free and accessible for
                  everyone.
                </MKTypography>
                <MKTypography variant='button' fontWeight='bold' color='white'>
                  Castor Mann -{' '}
                  <MKTypography variant='caption' color='white'>
                    Bridgestars CEO and Junior World Champion 2019
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

export default Testimonials;
