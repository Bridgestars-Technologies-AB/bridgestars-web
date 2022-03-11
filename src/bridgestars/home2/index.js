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

import { useEffect, useRef } from 'react';

// rellax
import Rellax from 'rellax';

// typed-js
import * as Typed from 'typed.js';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';

// Otis Kit PRO examples
import DefaultNavbar from 'bridgestars/navbar';
import DefaultFooter from 'examples/Footers/DefaultFooter';

// About Us page sections
import Information from 'pages/Company/AboutUs/sections/Information';
import Testimonials from './sections/Team.js';
import Featuring from 'pages/Company/AboutUs/sections/Featuring';
import Newsletter from 'pages/Company/AboutUs/sections/Newsletter';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
// React

// @mui material components
import Stack from '@mui/material/Stack';

// Otis Kit PRO examples

// Coworking page sections
import Features from 'bridgestars/home/sections/Features';
import Upcoming from 'bridgestars/home/sections/Upcoming';
import Places from 'bridgestars/home/sections/Places';
import BridgestarsFooter from 'bridgestars/footer/BridgestarsFooter';

// Routes
import { Link } from 'react-router-dom';

// Images
import bgImage from 'assets/images/bridgestars/mockup-1_1-smoke.jpg';
import linearHomepageGradient from 'assets/theme/functions/linearHomepageGradient';
//import Zoom from '@mui/material/Zoom';
import { Grow, Fade, Collapse, Slide } from '@mui/material';

import CountUp from 'react-countup';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';
import { TramRounded } from '@mui/icons-material';
import { Icon } from '@mui/material';

function BridgestarsHome2() {
  const [typeNext, setTypeNext] = useState(0);
  const headerRef = useRef(null);
  const typedHeaderRef = useRef(null);
  const typedSubHeaderRef = useRef(null);

  // Setting up rellax
  useEffect(() => {
    const parallax = new Rellax(headerRef.current, {
      speed: -6,
    });

    return () => parallax.destroy();
  }, []);

  // Setting up typedJS
  useEffect(() => {
    if (typeNext == 0) {
      const typedJS = new Typed(typedHeaderRef.current, {
        strings: ['BRIDGESTARS'],
        typeSpeed: 90,
        startDelay: 0,
        loop: false,
        showCursor: false,
        onComplete: (self) => {
          setTypeNext(1);
        },
      });
    }
    //return () => typedJS.destroy();
  }, []);

  useEffect(() => {
    if (typeNext == 1) {
      const typedJS2 = new Typed(typedSubHeaderRef.current, {
        strings: [
          'Online Bridge platforms have become outdated. We are constantly working our hardest to',
        ],
        typeSpeed: 45,
        backSpeed: 90,
        backDelay: 200,
        startDelay: 500,
        loop: false,
        showCursor: true,
        onStart: () => {
          setTypeNext(2);
        },
      });
    }
    //return () => typedJS.destroy();
  }, [typeNext]);

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: 'internal',
          route: '/signup',
          label: 'sign up',
          color: 'primary',
        }}
        transparent
        light
        brand='Bridgestars'
      />
      <MKBox
        ref={headerRef}
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
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            sx={{ mx: 'auto', textAlign: 'center' }}
          >
            <MKTypography
              variant='h1'
              color='primary'
              align='center'
              textGradient='true'
              fontSize='10vmin'
            >
              <span ref={typedHeaderRef} />
            </MKTypography>
            <MKTypography
              variant='body1'
              color='white'
              opacity={0.8}
              mt={1}
              mb={3}
            >
              <span ref={typedSubHeaderRef} />
            </MKTypography>
            <MKButton
              color='default'
              sx={{ color: ({ palette: { dark } }) => dark.main }}
            >
              create account
            </MKButton>
            <MKTypography variant='h6' color='white' mt={10} mb={1}>
              Find us on
            </MKTypography>
            <MKBox display='flex' justifyContent='center' alignItems='center'>
              <MKTypography
                component='a'
                variant='body1'
                color='white'
                href='#'
                mr={3}
              >
                <i className='fab fa-facebook' />
              </MKTypography>
              <MKTypography
                component='a'
                variant='body1'
                color='white'
                href='#'
                mr={3}
              >
                <i className='fab fa-discord' />
              </MKTypography>
              <MKTypography
                component='a'
                variant='h4'
                color='white'
                href='#'
                mr={0}
                mt={1}
              >
                <Icon>email</Icon>
              </MKTypography>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <Grid container width='100%' justifyContent='center'>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            width: { xxl: 1600, xl: '100%' },
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Features />
          <Testimonials />
          <Upcoming />
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default BridgestarsHome2;
