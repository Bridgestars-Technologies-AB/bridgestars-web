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
import { Icon } from '@mui/material'
import { IconButton } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKButton from 'otis/MKButton';
import MKTypography from 'otis/MKTypography';
import Breadcrumbs from 'otis/Breadcrumbs';

// Otis Kit PRO example components
import DefaultNavbar from 'otis/Navbars/DefaultNavbar';

// Otis Kit PRO page layout routes
import routes from 'constants/routes';
import { Button } from '@mui/material';


function IllustrationLayoutModal({
  name,
  logo,
  header,
  title,
  description,
  children,
  modalExitCallback,
  ...rest
}) {
  return (
    <MKBox
      minWidth='275px'
      maxWidth='400px'
      width={{ xs: '85%', sm: '100%' }}
      height='min-content'
      bgColor='white'
      py={1}
      borderRadius='5px'
      position='relative'
      {...rest}
    >
      {/* <MKBox position='absolute' width='100%' mt={1}>
        <DefaultNavbar
          routes={routes}
          brand='Bridgestars'
          //transparent={{ xs: false, md: true }}
        />
      </MKBox> */}
      <Box
        position='absolute'
        right='0px'
        mr={1}
        onClick={() => {
          modalExitCallback();
        }}
      >
        <IconButton>
          <Icon sx={{ transform: 'scale(1.3)' }}>close</Icon>
        </IconButton>
      </Box>
      <Grid container>
        <Grid item xs={11} sx={{ mx: 'auto' }}>
          <MKBox
            display='flex'
            flexDirection='column'
            justifyContent='center'
            height='min-content'
          >
            {/* <Stack p={3} textAlign='center'> */}
            {!header ? (
              <>
                {logo ? (
                  <MKBox margin='auto' mb={3} mt={0}>
                    <Image
                      src={logo}
                      width='64px'
                      height='64px'
                      shift='bottom'
                      distance='2em'
                      shiftDuration={750}
                      duration={0}
                    />
                  </MKBox>
                ) : (
                  ''
                )}
                <Grow in timeout={750} style={{ transformOrigin: '0 1 0' }}>
                  <MKBox mb={1} textAlign='center'>
                    <MKTypography variant='h4' fontWeight='bold'>
                      {title}
                    </MKTypography>
                  </MKBox>
                </Grow>
                <Grow in timeout={750} style={{ transformOrigin: '0 1 0' }}>
                  <MKBox mb={1} textAlign='center'>
                    <MKTypography variant='body2' color='text'>
                      {description}
                    </MKTypography>
                  </MKBox>
                </Grow>
              </>
            ) : (
              header
            )}
            {children ? (
              <MKBox py={1}>
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
IllustrationLayoutModal.defaultProps = {
  header: '',
  logo: '',
  title: '',
  description: '',
};

// Typechecking props for the IllustrationLayout
IllustrationLayoutModal.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default IllustrationLayoutModal;
