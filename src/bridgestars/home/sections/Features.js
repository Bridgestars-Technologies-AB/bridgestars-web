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
import Stack from '@mui/material/Stack';
import CountUp from 'react-countup';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import DefaultCounterCard from 'examples/Cards/CounterCards/DefaultCounterCard';

// Otis Kit PRO examples
import SimpleInfoCard from 'examples/Cards/InfoCards/SimpleInfoCard';
import CounterInfoCard from 'examples/Cards/InfoCards/CounterInfoCard';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import SchoolIcon from '@mui/icons-material/School';
import CenteredBlogCard from 'examples/Cards/BlogCards/CenteredBlogCard';
import unity from 'assets/images/logos/logo-unity.png';

function Features(...rest) {
  return (
    <MKBox {...rest} component='section' py={{ xs: 6, md: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent='space-evenly'>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              ml: { xs: 0, md: 'auto' },
              mr: { xs: 0, md: 6 },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Stack spacing={{ xs: 4, md: 8 }}>
              <SimpleInfoCard
                icon={
                  <MilitaryTechRoundedIcon fontSize='medium'></MilitaryTechRoundedIcon>
                }
                color='primary'
                direction='center'
                title='Competitive Ranking'
                description='With our integrated ranking system you can compete on a global ranking ladder and earn rewards.'
              />
              <SimpleInfoCard
                icon='insights'
                color='primary'
                direction='center'
                title='Extensive Analytics'
                description='Analyze and simulate deals or review your own deals with feedback.'
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              mt: { xs: 0, s: 0 },
              mr: { xs: 4, md: 'auto' },
              ml: { xs: 4, md: 6 },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Stack spacing={{ xs: 5, md: 10 }}>
              <CounterInfoCard
                countUp={{
                  end: 1000,
                  duration: '1.5',
                  useEasing: 'false',
                  formattingFn: (value) =>
                    value === 1000 ? 'UNLIMITED' : value,
                }}
                color='primary'
                icon='payment'
                direction='center'
                title='Free Deals'
                description='Bridge should not be locked behind a paywall, therefore we offer unlimited free deals for everyone.'
              />
              <SimpleInfoCard
                icon='peoplealtroundedicon'
                direction='center'
                title='Agile Multiplayer'
                color='primary'
                description='Practice with your friends in private lobbies or cooperate to conquer global tournaments.'
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              mt: { xs: 0, s: 0 },
              mr: { xs: 4, md: 'auto' },
              ml: { xs: 4, md: 6 },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Stack spacing={{ xs: 4, md: 5, lg: 8 }}>
              <SimpleInfoCard
                icon={<SchoolIcon fontSize='medium'></SchoolIcon>}
                color='primary'
                direction='center'
                title='In-game Tutorials'
                description='Learn Bridge with our comprehensive in-game tutorials or use them to improve your defensive and declarer play.'
              />
              <SimpleInfoCard
                icon={
                  <MKBox
                    component='img'
                    sx={{
                      width: '55%',
                      ml: -0.5,
                    }}
                    src={unity}
                  ></MKBox>
                }
                color='primary'
                direction='center'
                title='Native Application'
                description='The Bridgestars application is built using Unity for maximum native support.'
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Features;
