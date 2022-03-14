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

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
// import Stack from "@mui/material/Stack";

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import image from 'assets/images/bridgestars/black-gold-large.jpg';

export default function Testimonial() {
  return (
    <MKBox
      component='section'
      variant='gradient'
      bgColor='dark'
      position='relative'
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={6} xl={4} sx={{ position: 'relative', px: 3 }}>
            <MKBox
              component='img'
              src={image}
              alt='image'
              borderRadius='lg'
              maxWidth='450px'
              width='100%'
              position='relative'
              sx={{
                mt: { xxl: 5, xl: 10, lg: 12, md: 12, xs: -12 },
                mb: { xs: 5 },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            xl={4}
            sx={{
              position: 'relative',
              pl: { xs: 3, md: 1, xxl: 3 },
              pr: { xs: -1, md: -1 },
              mt: { xs: 3, md: 0 },
              my: { xs: 0, md: 'auto' },
              color: ({ palette: { white } }) => white.main,
            }}
          >
            <Icon fontSize='large'>format_quote</Icon>
            <MKTypography
              variant='body2'
              color='white'
              fontWeight='light'
              mb={2}
              sx={{ fontSize: '1.125rem' }}
            >
              In a world of rapid technological advancements, the Bridge world
              has not been able to keep up. There is a lack of a clean and
              modern solution for playing Bridge online that is fun, easy, and
              engaging. Our vision for the future contains a unified platform
              for Bridge players on which they are able to play and watch Bridge
              as well as catch up with the latest news about Bridge. Bridgestars
              is an attempt of bringing that vision to life, in a way that is
              free and accessible for everyone.
            </MKTypography>
            <MKTypography variant='button' fontWeight='bold' color='white'>
              Castor Mann -{' '}
              <MKTypography variant='caption' color='white'>
                Bridgestars CEO, Founder and Junior World Champion 2018
              </MKTypography>
            </MKTypography>
          </Grid>
          <Grid item xs={1} />
          <Grid
            item
            xs={12}
            xl={2}
            sx={{
              px: { xs: 6, xl: 0 },
              my: { xs: 0, xl: 'auto' },
              lineHeight: 1,
            }}
          >
            <MKTypography
              variant='h3'
              color='white'
              mt={{ xs: 6, xl: 0 }}
              mb={1}
            >
              Learn more
            </MKTypography>
            <MKTypography
              component='p'
              variant='button'
              color='white'
              opacity={0.8}
              mb={2}
            >
              Take part of the full story behind Bridgestars and the vision we
              strive to achieve.
            </MKTypography>
            <MKTypography
              component='a'
              href='#'
              variant='button'
              color='white'
              fontWeight='regular'
              sx={{
                width: 'max-content',
                display: 'flex',
                alignItems: 'center',

                '& .material-icons-round': {
                  fontSize: '1.125rem',
                  transform: `translateX(3px)`,
                  transition:
                    'transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)',
                },

                '&:hover .material-icons-round, &:focus .material-icons-round':
                  {
                    transform: `translateX(6px)`,
                  },
              }}
            >
              Click here to continue reading
              <Icon sx={{ fontWeight: 'bold' }}>arrow_forward</Icon>
            </MKTypography>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}
