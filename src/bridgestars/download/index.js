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
import Information from '../download/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/home_page.svg';
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import DownloadCard from './sections/DownloadCard.js';

function DownloadPage() {
  return (
    <>
      
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
            routes={routes.filter((r) => r.name != 'Download')}
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
            //relative
            //transparent
          />
          <Grid container item alignItems='center' flexDirection='column'>
            <MKBox
              mt={10}
              mb={-2}
              component='img'
              src={bgImage}
              width={{ xs: '75%', sm: '45%', xl: '35%' }}
            ></MKBox>
          </Grid>
          <MKBox p={3}>
            <Information />
            <MKBox
              component='section'
              pt={{ xs: 6, lg: 9 }}
              pb={{ xs: 3, xl: 4 }}
            >
              <Container>
                {/* <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  justifyContent='center'
                  sx={{ mx: 'auto', mb: 8, textAlign: 'center' }}
                >
                  <MKTypography variant='h2' mb={1}>
                    Best no-tricks pricing
                  </MKTypography>
                  <MKTypography variant='body1' color='text'>
                    Bridgestars is and always will be free.
                  </MKTypography>
                </Grid> */}
                <DownloadCard
                  mb={2}
                  title={'Windows Installer (.exe)'}
                  size={'47 MB'}
                  link={
                    'https://drive.google.com/u/1/uc?id=10arbRMdKwd8ZDLxr0qsx_umT32RStdW-&export=download&confirm=t'
                  }
                  description={
                    'This is an installer for Windows, it will make sure that everything is installed correctly and add a shortcut to your desktop.'
                  }
                />
                <DownloadCard
                  mb={2}
                  title={'Mac OS Installer (.pkg)'}
                  size={'36 MB'}
                  link={
                    'https://drive.google.com/u/0/uc?id=1oHFbxVL6RGKOkRuChhvDckS_wIZ5s503&export=download&confirm=t'
                  }
                  description={
                    'This is an installer for Mac OS, it will make sure that the application makes it to your application folder and will ask if you want an shortcut on your desktop.'
                  }
                />
                <DownloadCard
                  title={'Mac OS Raw (.app)'}
                  size={'36 MB'}
                  link={
                    'https://drive.google.com/u/0/uc?id=1Sic22mCxGTW6ygcWojL4WZcZ3PANi8Qc&export=download&confirm=t'
                  }
                  description={
                    'This download does only contain the application package, the application will be runnable directly from the downloads folder. We recommend that you put it in the Applications folder.'
                  }
                />
              </Container>
            </MKBox>
          </MKBox>
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default DownloadPage;
