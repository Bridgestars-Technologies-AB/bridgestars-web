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

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom'
import footerRoutes from 'constants/footer.routes';

function Information() {
  return (
    <>
      <MKBox component='section' pt={6} mt={6}>
        <Container>
          <Grid container item xs={12} lg={8} mx='auto'>
            <Grid item xs={12} mx={0}>
              <MKTypography
                component='h6'
                variant='button'
                opacity={0.7}
                textTransform='uppercase'
                fontWeight='bold'
              >
                You rock
              </MKTypography>
            </Grid>
            <MKTypography variant='h4' mb={3}>
              Thank you for joining our Technical Preview!
            </MKTypography>
            <MKTypography variant='body2' mr={1}>
              Bridgestars is now available for early access members on Windows and Mac OS. To get
              started, download the software below and enter the email and
              password you registered with. If you forgot your password you can
              apply for a new one{' '}
              <MKTypography
                variant='body2'
                component={Link}
                to='/forgot-pass'
                color='info'
                fontWeight='medium'
                textGradient
                style={{ textDecorationLine: 'underline' }}
                sx={{ cursor: 'pointer' }}
              >
                here.
              </MKTypography>
              <br /> <br />
              We appreciate all your feedback. Please reach out to us via{' '}
              <MKTypography
                variant='body2'
                component='a'
                href={'https://discord.gg/YhwRDgtSX2'}
                color='info'
                fontWeight='medium'
                textGradient
                style={{ textDecorationLine: 'underline' }}
                sx={{ cursor: 'pointer' }}
              >
                Discord
              </MKTypography>{' '}
              or{' '}
              <MKTypography
                variant='body2'
                component='a'
                href={'mailto: info@bridgestars.net'}
                color='info'
                fontWeight='medium'
                textGradient
                style={{ textDecorationLine: 'underline' }}
                sx={{ cursor: 'pointer' }}
              >
                email
              </MKTypography>{' '}
              if you encounter any problems with the app. You are also welcome
              to submit any feature requests.
              <br /> <br />
              The app will require at most 1 GB of disk space. Make sure to have
              some space left on your computer.
              <br /> <br />
              The Windows installer may trigger some antivirus programs, this
              will change when Microsoft acknowledge our application. The same
              goes for the Mac OS Raw version. We recommend the Installer
              version which is already trusted by Apple.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default Information;
