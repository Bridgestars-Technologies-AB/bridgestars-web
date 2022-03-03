/**
=========================================================
* Otis Kit PRO - v2.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';

// Otis Kit PRO example components
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';

// Otis Kit PRO page layout routes
import routes from 'constants/routes';
import { Button } from '@mui/material';

function IllustrationLayout({
  header,
  title,
  description,
  illustration,
  children,
}) {
  return (
    <MKBox width='100%' height='100%' bgColor='white'>
      <MKBox position='absolute' width='100%' mt={1}>
        {/* <DefaultNavbar
          routes={routes}
          brand='Bridgestars'
          //transparent={{ xs: false, md: true }}
        /> */}
      </MKBox>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: 'none', lg: 'flex' }}
            width='calc(100% - 2rem)'
            height='calc(100vh - 2rem)'
            borderRadius='lg'
            ml={2}
            mt={2}
            sx={{
              backgroundImage: `url(${illustration})`,
            }}
          />
        </Grid>
        <Grid item xs={11} sm={8} md={5} lg={4} xl={3} sx={{ mx: 'auto' }}>
          <MKBox
            display='flex'
            flexDirection='column'
            justifyContent='center'
            height='100vh'
          >
            <MKBox p={3} textAlign='center'>
              {!header ? (
                <>
                  <MKBox mb={1} textAlign='center'>
                    <MKTypography variant='h4' fontWeight='bold'>
                      {title}
                    </MKTypography>
                  </MKBox>
                  <MKTypography variant='body2' color='text'>
                    {description}
                  </MKTypography>
                </>
              ) : (
                header
              )}
            </MKBox>
            <MKBox p={3}>{children}</MKBox>
          </MKBox>
        </Grid>
      </Grid>
    </MKBox>
  );
}

// Setting default values for the props of IllustrationLayout
IllustrationLayout.defaultProps = {
  header: '',
  title: '',
  description: '',
  illustration: '',
};

// Typechecking props for the IllustrationLayout
IllustrationLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.string,
};

export default IllustrationLayout;
