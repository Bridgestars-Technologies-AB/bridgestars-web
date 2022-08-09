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
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import MKBadge from 'otis/MKBadge';
import {
  RadioButtonUncheckedIcon,
  CheckBoxOutlineBlankRounded,
} from '@mui/icons-material';

function Upcoming() {
  const data = [
    {
      icon: 'smart_toy',
      title: 'Intelligent Computer Player',
      items: [
        'Knowledge of multiple bidding systems',
        'Capable of advanced play',
      ],
      implemented: [false, false],
    },
    {
      icon: 'credit_card',
      title: 'Play with Real Money',
      items: ['Tournament with prize pools', 'Versus with stakes'],
      implemented: false,
    },
    {
      icon: 'extension',
      title: 'Puzzles & Problems',
      items: [
        'Suit combination puzzles and double dummy problems',
        'Puzzles that challenge bidding and declaring skills',
      ],
      implemented: [false, false],
    },
    {
      icon: 'videocamera',
      title: 'Delayed Kibitzing',
      items: [
        'Set delay to specific number of minutes',
        'Set delay to specific number of deals',
      ],
      implemented: [false, false],
    },
    {
      icon: 'devices',
      title: 'Native Device Support',
      items: ['MacOS, Windows, Linux', 'Web and Mobile'],
      implemented: [true, false],
    },
    {
      icon: 'emoji_events',
      title: 'Global Tournaments',
      items: [
        'Competitive tournaments spanning days or weeks',
        'Let organizations host tournaments',
      ],
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
          <MKTypography variant='body1' color='text'>
            These are features that are still work in progress. You can
            contribute with ideas and vote for your favorites on our discord
            server.
          </MKTypography>
        </Grid>
        <MKBox sx={{ ml: { xs: 0, sm: 0, md: 10, xl: 20 }, mr: { xl: 10 } }}>
          <Grid container sx={{ mt: 6 }}>
            {data.map(({ icon, title, items, implemented }) => (
              <Grid
                key={icon}
                item
                xs={12}
                md={6}
                lg={4}
                sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}
              >
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
                      mx='auto'
                      //sx={{ justifyContent: 'center' }}
                      //textAlign='left'
                      //textAlign='left'
                    >
                      <MKBox
                        //textAlign='left'
                        sx={{
                          justifyContent: {
                            xs: 'center',
                            sm: 'center',
                            md: 'left',
                          },
                          // ml: { xs: 0, sm: 0, md: 0 },
                        }}
                        display='flex'
                        lineHeight={1.25}
                        //mx='auto'
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
                    </MKBox>
                  ))}
                </MKBox>
              </Grid>
            ))}
          </Grid>
        </MKBox>
      </Container>
    </MKBox>
  );
}

export default Upcoming;
