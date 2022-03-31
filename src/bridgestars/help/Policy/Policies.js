import { useState } from 'react';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '@mui/material/Icon';
import MKBox from 'components/MKBox';
import { Card } from '@mui/material';

//bridgestars

//pages
import Terms from 'bridgestars/help/Policy/Terms';
import Privacy from 'bridgestars/help/Policy/Privacy';
import Disclaimer from 'bridgestars/help/Policy/Disclaimer';
import Copyright from 'bridgestars/help/Policy/Copyright';

export default function Policies() {
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

  return (
    <>
      <MKBox component='section' pt={4} pb={1}>
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
      <MKBox component='section' pt={6}>
        <Container>
          <Grid container justifyContent='center'>
            <Grid item xs={12}>
              <Card>{tabs[activeTab]}</Card>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}
