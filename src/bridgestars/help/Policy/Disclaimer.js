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

export default function Disclaimer() {
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
          Disclaimer
        </MKTypography>
        <MKTypography variant='body2' color='white' opacity={0.8}>
          Last modified: 24th of March 2022
        </MKTypography>
      </MKBox>
      <MKBox pb={6} px={6}>
        <MKTypography variant='h5' mt={6} mb={3}>
          Introduction
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          If you require any more information or have any questions about our
          site's disclaimer, please feel free to contact us by email at{' '}
          <a href='mailto: info@bridgestarstechnologies.com'>
            info@bridgestarstechnologies.com
          </a>
          .
          <br />
          <br />
          All the information on this website -{' '}
          <a href='https://bridgestars.se'>https://bridgestars.se</a> - is
          published in good faith and for general information purpose only.
          Bridgestars technologies Sweden AB does not make any warranties about
          the completeness, reliability and accuracy of this information. Any
          action you take upon the information you find on this website, is
          strictly at your own risk. Bridgestars technologies Sweden AB will not
          be liable for any losses and/or damages in connection with the use of
          our website.
          <br />
          <br />
          From our website, you can visit other websites by following hyperlinks
          to such external sites. While we strive to provide only quality links
          to useful and ethical websites, we have no control over the content
          and nature of these sites. These links to other websites do not imply
          a recommendation for all the content found on these sites. Site owners
          and content may change without notice and may occur before we have the
          opportunity to remove a link which may have gone 'bad'.
          <br />
          <br />
          Please be also aware that when you leave our website, other sites may
          have different privacy policies and terms which are beyond our
          control. Please be sure to check the Privacy Policies of these sites
          as well as their "Terms of Service" before engaging in any business or
          uploading any information.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          Consent
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          By using our website, you hereby consent to our disclaimer and agree
          to its terms.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          Update
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          Should we update, amend or make any changes to this document, those
          changes will be prominently posted here.
        </MKTypography>
      </MKBox>
    </>
  );
}
