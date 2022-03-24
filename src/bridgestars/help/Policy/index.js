import { useState } from 'react';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '@mui/material/Icon';
import MKBox from 'components/MKBox';
import footerRoutes from 'constants/footer.routes';
import { Button, Card } from '@mui/material';
import { IconButton } from '@mui/material';
import { Stack } from '@mui/material';

//bridgestars
import BridgestarsFooter from '../../footer/BridgestarsFooter';
import BridgestarsNavbar from '../../navbar/index';
import routes from 'constants/routes';

//pages
import Terms from 'bridgestars/help/Policy/Terms';
import Privacy from 'bridgestars/help/Policy/Privacy';
import Disclaimer from 'bridgestars/help/Policy/Disclaimer';
import Copyright from 'bridgestars/help/Policy/Copyright';
import MKTypography from 'components/MKTypography';

export default function Policy() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    <Terms key={0} />,
    <Privacy key={1} />,
    <Disclaimer key={2} />,
    <Copyright key={3} />,
  ];
  const handleTabType = (event, newValue) => {
    //console.log(newValue);
    setActiveTab(newValue);
  };

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <MKBox mt={3}>
        <BridgestarsNavbar
          routes={routes.filter((r) => r.name != 'Policy')}
          action={{
            type: 'internal',
            route: '/signin',
            label: 'sign in',
            color: 'primary',
          }}
          relative
          floating
        />
      </MKBox>
      <MKBox component='section' pt={4} pb={0}>
        <Container>
          <Grid container item justifyContent='center' xs={12} mx='auto'>
            <AppBar position='static'>
              <Tabs value={activeTab} onChange={handleTabType}>
                <Tab label='Terms' icon={<Icon>gavel</Icon>} />
                <Tab label='Privacy' icon={<Icon>health_and_safety</Icon>} />
                <Tab label='Disclaimer' icon={<Icon>report_problem</Icon>} />
                <Tab label='Copyright' icon={<Icon>copyright</Icon>} />
              </Tabs>
            </AppBar>
          </Grid>
        </Container>
      </MKBox>
      <MKBox component='section' pt={5}>
        <Container>
          <Grid container justifyContent='center'>
            <Grid item xs={12}>
              <Card>{tabs[activeTab]}</Card>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      <Grid container xs={12} mt={6} justifyContent='center'>
        <IconButton variant='outlined' color='dark' onClick={ScrollTop}>
          <MKTypography fontSize={24}>
            {
              <Icon sx={{ transform: 'scale(2)', width: '100%' }}>
                arrow_upward
              </Icon>
            }
            <br />
            to top
          </MKTypography>
        </IconButton>
      </Grid>
      <MKBox pt={2} px={1} mt={2}>
        <BridgestarsFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
