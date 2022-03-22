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

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';

// Otis Kit PRO examples
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import DefaultFooter from 'examples/Footers/DefaultFooter';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';
import BridgestarsFooter from 'bridgestars/footer/BridgestarsFooter.js';
import BridgestarsNavbar from 'bridgestars/navbar';

export default function Copyright() {
  return (
    <>
      <MKBox
        variant='gradient'
        bgColor='dark'
        borderRadius='lg'
        coloredShadow='dark'
        p={3}
        mt={-3}
        mx={2}
      >
        <MKTypography variant='h3' color='white'>
          Privacy & Policy
        </MKTypography>
        <MKTypography variant='body2' color='white' opacity={0.8}>
          Last modified: Sept 07 2021
        </MKTypography>
      </MKBox>
      <MKBox pb={6} px={6}>
        <MKTypography variant='h5' mt={6} mb={3}>
          Introduction
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          At Creative Tim, accessible{' '}
          <MKTypography
            variant='body2'
            color='dark'
            component='a'
            href='https://www.creative-tim.com'
            target='_blank'
            rel='noreferrer'
            sx={{
              '&:hover': {
                color: ({ palette: { info } }) => info.main,
              },
            }}
          >
            here
          </MKTypography>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by Website Name and how we use it.
          <br />
          <br />
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us through email at
          hello@creative-tim.com
          <br />
          <br />
          This privacy policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in{' '}
        </MKTypography>
      </MKBox>
    </>
  );
}
