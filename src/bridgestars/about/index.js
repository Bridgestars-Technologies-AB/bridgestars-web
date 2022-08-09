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

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';

// Otis Kit PRO examples

// About Us page sections
import Information from '../about/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/about_us.svg';
import BridgestarsFooter from 'bridgestars/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';

function About() {
  const headerRef = useRef(null);

  // Setting up rellax
  // useEffect(() => {
  //   const parallax = new Rellax(headerRef.current, {
  //     speed: -6,
  //   });

  //   return () => parallax.destroy();
  // }, []);

  return (
    <>
      {/* <BridgestarsNavbar
        routes={routes.filter((r) => r.name != 'About us')}
        action={
          window.innerWidth > 370
            ? {
                type: 'internal',
                route: '/signin',
                label: 'sign in',
                color: 'primary',
              }
            : false
        }
        transparent
        light
      />
      <MKBox
        ref={headerRef}
        minHeight='85vh'
        width='100%'
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${bgImage})`,
          backgroundSize: 'cover',
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
            lg={7}
            ml={1}
            justifyContent='center'
            flexDirection='column'
          >
            <MKTypography
              variant='h1'
              color='white'
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down('md')]: {
                  fontSize: size['3xl'],
                },
              })}
            >
              Bridgestars - About us
            </MKTypography>
            <MKTypography
              variant='body1'
              color='white'
              opacity={0.8}
              mb={2}
              mr={{ xs: 0, sm: 6 }}
              pr={{ xs: 0, sm: 6 }}
            >
              Read more about Bridgestars
            </MKTypography>
            <MKTypography variant='h5' color='white' mt={2} mb={1}>
              Connect with us on
            </MKTypography>
            <MKBox display='flex' alignItems='center'>
              {footerRoutes.socials.map((social) => (
                <MKTypography
                  key={social.name}
                  component='a'
                  href={social.link}
                  variant={social.name === 'Mail' ? 'h4' : 'body1'}
                  color={'white'}
                  fontWeight='regular'
                  mr={3}
                  mt={social.name === 'Mail' ? 0.8 : 0}
                >
                  {social.icon}
                </MKTypography>
              ))}
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
          <Information />

        </Card>
      </Grid> */}
      <Grid container width='100%' justifyContent='center'>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: 4,
            mb: 4,
            width: { xxl: 1600, xl: '100%' },
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <BridgestarsNavbar
            routes={routes.filter((r) => r.name != 'About us')}
            // action={
            //   window.innerWidth > 370
            //     ? {
            //         type: 'internal',
            //         route: '/home',
            //         label: 'back',
            //         color: 'primary',
            //       }
            //     : false
            // }
            sticky
            dark
            fullWidth
            //transparent
          />
          <Grid container item alignItems='center' flexDirection='column'>
            <MKBox
              mt={10}
              mb={-2}
              component='img'
              src={bgImage}
              width={{ xs: '100%', sm: '80%', xl: '50%' }}
            ></MKBox>
          </Grid>
          <Information />
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default About;
