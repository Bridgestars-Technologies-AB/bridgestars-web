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
// import Rellax from 'rellax';

// typed-js
import * as Typed from 'typed.js';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import MKButton from 'otis/MKButton';

// Otis Kit PRO examples
import BridgestarsNavbar from 'bridgestars/navbar';
// import DefaultFooter from 'otis/Footers/DefaultFooter';

// About Us page sections
// import Information from 'pages/Company/AboutUs/sections/Information';
import Testimonials from './sections/Testimonial.js';
// import Featuring from 'pages/Company/AboutUs/sections/Featuring';
// import Newsletter from 'pages/Company/AboutUs/sections/Newsletter';

// Routes
import routes from 'constants/routes';

// Images
// React

// @mui material components
import Stack from '@mui/material/Stack';
import { positions } from '@mui/system';

// Otis Kit PRO examples

// Coworking page sections
import Features from 'bridgestars/home/sections/Features';
import Upcoming from 'bridgestars/home/sections/Upcoming';
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import Discord from './sections/Discord.js';

// Routes
import { Link } from 'react-router-dom';

// Images
import bgImage from 'assets/images/bridgestars/mockup-1_1-smoke.jpg';
import bgVideo from 'assets/images/bridgestars/shortIntro-compressed.mp4';
import linearHomepageGradient from 'assets/theme/functions/linearHomepageGradient';
//import Zoom from '@mui/material/Zoom';
import { Grow, Fade, Collapse, Slide, Zoom } from '@mui/material';

import CountUp from 'react-countup';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';
import { TramRounded } from '@mui/icons-material';
import { Icon } from '@mui/material';
import footerRoutes from 'constants/footer.routes';

//COOKIES
import CookieConsent from 'react-cookie-consent';


//style
import './style.css';

function BridgestarsHome() {
  const [typeNext, setTypeNext] = useState(0);
  const headerRef = useRef(null);
  const typedHeaderRef = useRef(null);
  const [showUI, setShowUI] = useState(false);
  // const typedSubHeaderRef = useRef(null);

  // Setting up rellax
  // useEffect(() => {
  //   const parallax = new Rellax(headerRef.current, {
  //     speed: -6,
  //   });

  //   return () => parallax.destroy();
  // }, []);

  // Setting up typedJS
  // useEffect(() => {
  //   if (typeNext == 0) {
  //     const typedJS = new Typed(typedHeaderRef.current, {
  //       strings: ['BRIDGESTARS'],
  //       typeSpeed: 70,
  //       startDelay: 150,
  //       loop: false,
  //       showCursor: false,
  //       onComplete: (self) => {
  //         setTypeNext(1);
  //       },
  //     });
  //   }
  //   return () => {
  //     const typedJS = 'BRIDGESTARS';
  //   };
  // }, []);

  // useEffect(() => {
  //   if (typeNext == 1) {
  //     const typedJS2 = new Typed(typedSubHeaderRef.current, {
  //       strings: [
  //         'Online Bridge platforms have become outdated. ^300\nWe developed a modern platform for Bridge players all around the world to play unlimited Bridge ^300for free.',
  //       ],
  //       typeSpeed: 15,
  //       backSpeed: 90,
  //       backDelay: 200,
  //       startDelay: 300,
  //       loop: false,
  //       showCursor: false,
  //       onStart: () => {
  //         setTypeNext(2);
  //       },
  //     });
  //   }
  //   return () => {
  //     const typedJS2 =
  //       'Online Bridge platforms have become outdated.\nWe developed a modern platform for Bridge players all around the world to play unlimited Bridge ^300for free.';
  //   };
  // }, [typeNext]);

  useEffect(() => {
    const element = document.getElementsByClassName('background')[0];
    const col = element.style.backgroundColor;
    if(!showUI) element.style.backgroundColor = 'rgba(20,0,20,1)';
    setTimeout(() => {
      setShowUI(true)
      
    }, 1000)
    setTimeout(() => {
      element.style.backgroundColor = col;
    }, 2000)
  });

  return (
    <div className='background'>
      <BridgestarsNavbar
        routes={routes.filter((r) => r.name != 'Home')}
        // action={
        //   window.innerWidth > 370
        //     ? {
        //         type: 'internal',
        //         route: '/signin',
        //         label: 'sign in',
        //         color: 'primary',
        //       }
        //     : false
        // }
        transparent
        light
        // shadow
        fullWidth
      />

      <video src={bgVideo} autoPlay muted></video>
      <div className='bg-video-overlay'>
        {/* <Grid
          container
          item
          width='100%'
          xs={12}
          lg={12}
          justifyContent='center'
          alignItems='end'
          // flexDirection='column'
          sx={{ mx: 'auto', textAlign: 'center' }}
        > */}
        {/* <Zoom in={true} style={{ transitionDelay: `250ms` }} timeout={500}>
            <MKTypography
              variant='h1'
              color='primary'
              align='center'
              width='100%'
              textGradient={true}
              fontSize='min(82px, calc(10px + 8vmin))'
              mt={3}
            >
              <span ref={typedHeaderRef} />
            </MKTypography>
          </Zoom> */}
        {/* <Zoom in={true} style={{ transitionDelay: `500ms` }} timeout={500}>
            <MKTypography
              variant='body1'
              color='white'
              fontSize='min(24px, calc(12px + 1.5vmin))'
              opacity={0.8}
              width={{ xs: '90%', md: '60%' }}
              mt={1}
              mb={0}
            >
              Online Bridge platforms have become outdated. We developed a
              modern platform for Bridge players all around the world to play
              unlimited Bridge for free.
            </MKTypography>
          </Zoom> */}
        <Zoom in={showUI} timeout={1000}>
          <Container>
            <Button
              component={Link}
              to='/betasignup'
              style={{
                // maxWidth: 'calc(150px + 8vmin)',
                // maxHeight: 'calc(40px + 3vmin)',
                // minWidth: 'calc(150px + 8vmin)',
                // minHeight: 'calc(40px + 3vmin)',
                fontSize: 'calc(12px + 2vmin)',
                borderRadius: '50px',
                backgroundColor: '#ee6065',
              }}
              sx={{
                color: '#ffffffee',
                py: 'min(10px, 5vmin)',
                px: 'min(20px, 7vmin)',
                //when hover
                '&:hover': {
                  color: '#ffffffee',
                  backgroundColor: 'rgba(255,255,255,1)',
                },
              }}
            >
              {'try it now'}
            </Button>
            <MKTypography
              variant='h5'
              fontSize='calc(11px + 2vmin)'
              sx={{ mb: 1, mt:1, color: '#ffffffdd' }}
            >
              Technical Preview available
            </MKTypography>
          </Container>
        </Zoom>
        {/* </Grid> */}
      </div>

      <Grid container width='100%' justifyContent='center'>
        <Zoom in={showUI} timeout={1000}>
          <Card
            sx={{
              p: { xs: 0.5, sm: 2 },
              mx: { xs: 0, sm: 2, lg: 3 },
              mt: { xs: 0, sm: -3, md: -4, lg: -6 },
              mb: 4,
              width: { xxl: 1600, xl: '100%' },
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Features />
            <Testimonials />
            <Upcoming />
          </Card>
        </Zoom>
        <Discord />
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </div>
  );
}

export default BridgestarsHome;
