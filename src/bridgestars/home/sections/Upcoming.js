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
import Icon from '@mui/material/Icon';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKBadge from 'components/MKBadge';
import {
  RadioButtonUncheckedIcon,
  CheckBoxOutlineBlankRounded,
} from '@mui/icons-material';

function Upcoming() {
  const data = [
    {
      icon: 'videocamera',
      title: 'Delayed Kibitzing',
      items: ['', ''],
      implemented: [false, false],
    },
    {
      icon: 'devices',
      title: 'Native device support',
      items: ['MacOS, Windows, Linux', 'Web and Mobile'],
      implemented: [true, false],
    },
    {
      icon: 'smart_toy',
      title: 'Play with bots',
      items: ['', ''],
      implemented: [false, false],
    },
    {
      icon: 'block',
      title: 'Automatic cheat and  detection',
      items: ['', ''],
      implemented: false,
    },
    {
      icon: 'credit_card',
      title: 'Financial reconciliation and reporting',
      items: ['', ''],
      implemented: false,
    },
    {
      icon: 'emoji_events',
      title: 'Global tournaments',
      items: ['', ''],
      implemented: false,
    },
  ];

  return (
    <MKBox component='section' py={12} px={1}>
      <Container>
        <Grid
          container
          item
          flexDirection='column'
          alignItems='center'
          textAlign={'center'}
          xs={12}
          lg={8}
          sx={{ textAlign: 'center', mx: 'auto' }}
        >
          <MKBadge
            variant='contained'
            color='primary'
            badgeContent='Work In Progress'
            container
            circular
            sx={{ mb: 1 }}
          />
          <MKTypography variant='h2' mb={1}>
            Explore our upcoming features{' '}
          </MKTypography>
          <MKTypography variant='body2' color='text'>
            These are features that are still work in progress. You can
            contribute with ideas in our discord server.
          </MKTypography>
        </Grid>

        <Grid container sx={{ mt: 6 }} textAlign='center'>
          {data.map(({ icon, title, items, implemented }) => (
            <Grid key={icon} item xs={12} lg={4} textAlign='center'>
              <MKBox py={2} pr={2} mb={2}>
                <MKTypography variant='h3' color='primary'>
                  <Icon>{icon}</Icon>
                </MKTypography>
                <MKTypography variant='h5' mt={2} mb={2}>
                  {title}
                </MKTypography>
                {items.map((item, index) => (
                  <MKBox
                    key={item}
                    display='flex'
                    lineHeight={1.25}
                    sx={{ justifyContent: 'center' }}
                  >
                    <MKTypography variant='body1' color='primary'>
                      <Icon sx={{ fontWeight: 'bold' }}>
                        {implemented[index]
                          ? 'task_alt'
                          : 'radio_button_unchecked'}
                      </Icon>
                    </MKTypography>
                    <MKBox pl={2}>
                      <MKTypography
                        variant='button'
                        color='text'
                        fontWeight='bold'
                      >
                        {item}
                      </MKTypography>
                    </MKBox>
                  </MKBox>
                ))}
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Upcoming;
