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

// React
import React from 'react';
import ReactDOM from 'react-dom';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';

// Otis Kit PRO examples
import DefaultNavbar from 'bridgestars/navbar';
import DefaultFooter from 'examples/Footers/DefaultFooter';

// Coworking page sections
import Features from 'bridgestars/home/sections/Features';
import Testimonials from 'bridgestars/home/sections/Testimonials';
import Upcoming from 'bridgestars/home/sections/Upcoming';
import Places from 'bridgestars/home/sections/Places';
import BridgestarsFooter from 'bridgestars/footer/BridgestarsFooter';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';
import { Link } from 'react-router-dom';

// Images
import bgImage from 'assets/images/bridgestars/mockup-1_1-smoke.jpg';
import linearHomepageGradient from 'assets/theme/functions/linearHomepageGradient';
//import Zoom from '@mui/material/Zoom';
import { Grow, Fade, Collapse, Slide } from '@mui/material';

import CountUp from 'react-countup';
import { HashLink } from 'react-router-hash-link';

//TODO bridgestars titel centered

const mapToAlphabets = (num) => {
  const numStr = '' + num;
  let res = '';

  for (let i = 0; i < numStr.length; i++) {
    const element = numStr[i];
    const finalStr = 'ABRIDGESTP';
    res += finalStr[Number(element)];
  }

  return res;
};

export default function BridgestarsHome() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: 'internal',
          route: '/betasignup',
          label: 'sign up',
          color: 'primary',

          /* "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",*/
        }}
        sticky
        brand='Bridgestars'
      />
      <MKBox
        minHeight='75vh'
        width='100%'
        sx={{
          backgroundImage: ({
            functions: { linearHomepageGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearHomepageGradient(
              [
                { color: `rgba(0, 0, 0, 0.6)`, percentage: 15 },
                { color: `rgba(0, 0, 0, 0.6)`, percentage: 80 },
                //{color: `rgba(255, 0, 0, 0.5)`, percentage: 0},
                // {color: `rgba(0, 0, 0, 0.15)`, percentage: 35}
              ],
              90
            )}
            , url(${bgImage})`,
          backgroundSize: 'contain',
          backgroundColor: '#000000',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          placeItems: 'center',
        }}
      >
        <Container justifyContent='space-between'>
          <Stack justifyContent='center'>
            <MKTypography
              variant='h1'
              color='primary'
              align='center'
              textGradient='true'
              fontSize='10vmin'
            >
              <CountUp
                duration={1.5}
                //'ABRIDGEST'
                end={12345678027}
                formattingFn={mapToAlphabets}
              />
            </MKTypography>
            <FadeInSection
              in
              appear={true}
              timeout={1600}
              style={{ transformOrigin: '0 0 0', transitionDelay: 500 }}
            >
              <MKTypography
                variant='body1'
                color='white'
                align='center'
                fontSize='4vmin'
                mt={1}
                mx={1}
                //pr={{ md: 12, lg: 24, xl: 32 }}
                opacity={0.8}
              >
                The time is now. We are taking Bridge to the next level.
              </MKTypography>
            </FadeInSection>
            <Grow
              in='true'
              style={{ transformOrigin: '50 0 0' }}
              timeout={1500}
            >
              <Stack
                direction='row'
                justifyContent='center'
                spacing={1}
                mt={6}
                mb={3}
                mx={3}
              >
                <MKButton
                  variant='gradient'
                  component={Link}
                  to='/betasignup'
                  size='medium'
                  fontSize='2vmin'
                  color='primary'
                >
                  sign up for closed beta
                </MKButton>
                <HashLink to='#read-more' smooth>
                  <MKButton variant='text' size='large' color='white'>
                    read more
                  </MKButton>
                </HashLink>
              </Stack>
            </Grow>
          </Stack>
        </Container>
      </MKBox>
      <Fade in timeout={1000}>
        <Card
          id='read-more'
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
              rgba(white.main, 0.8),
            backdropFilter: 'saturate(200%) blur(30px)',
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Features />
        </Card>
      </Fade>

      <Testimonials />
      <Upcoming />

      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}
