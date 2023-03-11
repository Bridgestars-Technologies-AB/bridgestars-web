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
import Icon from '@mui/material/Icon';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKButton from 'otis/MKButton';
import MKTypography from 'otis/MKTypography';

function DownloadCard({ title, description, link, size, ...rest }) {
  return (
    <Grid container item xs={12} lg={10} xl={8} xxl={8} mx={'auto'} {...rest}>
      <Card sx={{ width: '100%' }}>
        <Grid container alignItems='center'>
          <Grid item xs={12} lg={8}>
            <MKBox py={3} px={4}>
              <MKTypography variant='h3' mb={1}>
                {title}
              </MKTypography>
              <MKTypography variant='body2' color='text' fontWeight='regular'>
                {description}
              </MKTypography>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MKBox p={3} textAlign='center'>
              <MKTypography variant='h6' mt={{ xs: 0, sm: 3 }}></MKTypography>
              <MKTypography variant='h1'>Free</MKTypography>
              <MKButton
                variant='gradient'
                component='a'
                href={link}
                color='error'
                size='large'
                sx={{ my: 2 }}
              >
                Download
              </MKButton>
              <MKTypography
                display='block'
                variant='button'
                color='text'
                fontWeight='regular'
              >
                Download size ({size})
              </MKTypography>
            </MKBox>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default DownloadCard;
