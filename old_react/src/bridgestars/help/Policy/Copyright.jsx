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
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';

// Otis Kit PRO examples
import DefaultNavbar from 'otis/Navbars/DefaultNavbar';
import DefaultFooter from 'otis/Footers/DefaultFooter';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import Policy from 'bridgestars/help/Policy/index';

export default function Copyright() {
  return (
    <>
      <MKBox
        variant='gradient'
        bgColor='dark'
        borderRadius='lg'
        coloredShadow='dark'
        p={3}
        mt={1}
        mx={2}
      >
        <MKTypography variant='h3' color='white'>
          Copyright Policy
        </MKTypography>
        <MKTypography variant='body2' color='white' opacity={0.8}>
          Last modified: 25th of March 2022
        </MKTypography>
      </MKBox>
      <MKBox pb={6} px={6}>
        <MKTypography variant='body2' color='text'>
          <br />
          <br />
          Copyright © Bridgestars technologies Sweden AB. All Rights Reserved.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          Introduction
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          This is the Copyright Policy governing the use of{' '}
          <a href='https://bridgestars.net'>https://bridgestars.net</a> and the
          Bridgestars application (collectively referred to as the Platform) and
          the agreement that operates between us and you (the Policy). The
          Platform is owned and operated by{' '}
          <b>Bridgestars Technologies Sweden AB</b> (us/our/we) and these
          Policies set out the rights and obligations of all users (you/your) in
          relation to your use of the Platform.
          <br />
          <br />
          All files and information contained on the Platform are copyrighted by
          Bridgestars Technologies Sweden AB. and may not be duplicated, copied,
          modified or adapted, in any way without our written permission. The
          Platform may contain our service marks or trademarks as well as those
          of our affiliates or other companies, in the form of words, graphics,
          and logos.
          <br />
          <br />
          Your use of the Platform, Blog or Services does not constitute any
          right or license for you to use our service marks or trademarks,
          without the prior written permission of Bridgestars Technologies
          Sweden AB.
          <br />
          <br />
          Our Content, as found on the Platform, Blog and Services, is protected
          under copyrights. The copying, redistribution, use or publication by
          you of any such Content, is strictly prohibited. Your use of the
          Platform and Services does not grant you any ownership rights to our
          Content.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          ACCEPTABLE USE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          <b>You must not:</b>
          <br />
          <br />
          <ol style={{ 'margin-left': 15 }} type='a'>
            <li>
              use the Platform in any way or take any action that causes, or may
              cause, damage to the Platform or impairment of the performance,
              availability or accessibility of the Platform;
              <br />
              <br />
            </li>
            <li>
              use the Platform in any way that is unlawful, illegal, fraudulent
              or harmful, or in connection with any unlawful, illegal,
              fraudulent or harmful purpose or activity;
              <br />
              <br />
            </li>
            <li>
              use the Platform to copy, store, host, transmit, send, use,
              publish or distribute any material which consists of (or is linked
              to) any spyware, computer virus, Trojan horse, worm, keystroke
              logger, rootkit or other malicious computer software; or
              <br />
              <br />
            </li>
            <li>
              conduct any systematic or automated data collection activities
              (including without limitation scraping, data mining, data
              extraction and data harvesting) on or in relation to the Platform
              without our express written consent.
              <br />
              <br />
            </li>
          </ol>
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          REPORT ABUSE
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          If you found any unlawful material or activity on the Platform, or any
          material or activity that breaches this notice, please let us know.
          <br />
          <br />
          You can let us know about any such material or activity by emailing us
          at <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          ENFORCEMENT OF COPYRIGHT
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          We take the protection of our copyright very seriously.
          <br />
          <br />
          If we discover that you have used our copyright materials in
          contravention of the license set out in this notice, we may bring
          legal proceedings against you, seeking monetary damages and/or an
          injunction to stop you using those materials. You could also be
          ordered to pay legal costs.
        </MKTypography>
        <MKTypography variant='h5' mt={6} mb={3}>
          PERMISSIONS
        </MKTypography>
        <MKTypography variant='body2' color='text'>
          {' '}
          You may request permission to use the copyright materials on the
          Platform by emailing us at{' '}
          <a href='mailto: info@bridgestars.net'>info@bridgestars.net</a>.
        </MKTypography>
      </MKBox>
    </>
  );
}
