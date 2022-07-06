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
import { Stack } from '@mui/material';
import Image from 'mui-image';
import { Box } from '@mui/material';
import { Grow } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import Breadcrumbs from 'examples/Breadcrumbs';

// Otis Kit PRO example components
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';

// Otis Kit PRO page layout routes
import routes from 'constants/routes';
import { Button } from '@mui/material';

import image from 'assets/images/bridgestars/sign_in.svg';
import IllustrationLayoutModal from './modal';

function IllustrationLayout({
  name,
  logo,
  header,
  title,
  description,
  illustration,
  modal,
  children,
  ...rest
}) {
  if (modal)
    return (
      <IllustrationLayoutModal
        name={name}
        logo={logo}
        header={header}
        title={title}
        description={description}
        children={children}
        {...rest}
      />
    );
  return (
    <MKBox width='100%' height='100%' bgColor='white' {...rest}>
      {/* <MKBox position='absolute' width='100%' mt={1}>
        <DefaultNavbar
          routes={routes}
          brand='Bridgestars'
          //transparent={{ xs: false, md: true }}
        />
      </MKBox> */}
      {modal ? (
        ''
      ) : (
        <MKBox position='absolute' component='section' mt={2} ml={2}>
          <Breadcrumbs
            bgcolor='transparent'
            textcolor='text'
            routes={[{ label: 'Home', route: '/' }, { label: name }]}
          />
        </MKBox>
      )}

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
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Grid>
        <Grid
          item
          xs={11}
          sm={8}
          md={5}
          lg={4}
          xl={3}
          sx={{ mx: 'auto' }}
          mt={2}
        >
          <MKBox
            display='flex'
            flexDirection='column'
            justifyContent='center'
            height='100vh'
          >
            {/* <Stack p={3} textAlign='center'> */}
            {!header ? (
              <>
                {logo ? (
                  <MKBox margin='auto' mb={3} mt={0}>
                    <Image
                      src={logo}
                      width='calc(40px + 4vh)'
                      height='calc(40px + 4vh)'
                      shift='bottom'
                      distance='2rem'
                      shiftDuration={750}
                      duration={0}
                    />
                  </MKBox>
                ) : (
                  ''
                )}
                <Grow in timeout={750} style={{ transformOrigin: '0 1 0' }}>
                  <MKBox mb={1} textAlign='center'>
                    <MKTypography
                      variant='h4'
                      fontSize='calc(10px + 1vh)'
                      fontWeight='bold'
                    >
                      {title}
                    </MKTypography>
                  </MKBox>
                </Grow>
                <Grow in timeout={750} style={{ transformOrigin: '0 1 0' }}>
                  <MKBox mb={1} textAlign='center'>
                    <MKTypography
                      variant='body2'
                      fontSize='calc(6px + 1vh)'
                      color='text'
                    >
                      {description}
                    </MKTypography>
                  </MKBox>
                </Grow>
              </>
            ) : (
              header
            )}
            {children ? (
              <MKBox p={3}>
                <Grow in timeout={1000}>
                  {children}
                </Grow>
              </MKBox>
            ) : (
              <></>
            )}
          </MKBox>
        </Grid>
      </Grid>
    </MKBox>
  );
}

// Setting default values for the props of IllustrationLayout
IllustrationLayout.defaultProps = {
  header: '',
  logo: '',
  title: '',
  description: '',
  illustration: '',
  modal:false
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
