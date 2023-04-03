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

import { useEffect, useRef, useState } from 'react';

// rellax
import Rellax from 'rellax';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';

import MKButton from 'otis/MKButton';
// Otis Kit PRO examples

// About Us page sections
import Information from '../download/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/home_page.svg';
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import * as CARD from './sections/DownloadCard';

function DownloadPage() {
  console.log(navigator.userAgent);
  const platform = navigator.platform;
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const isMac = navigator.platform.includes('Mac');
  const isWindows = navigator.platform.includes('Win');
  const [lang, setLang] = useState(
    (navigator.language || navigator.userLanguage).includes('sv') ? 'sv' : 'en'
  );
  const sv = lang.includes('sv');

  const [showAllOptions, setShowAllOptions] = useState(false);

  return (
    <>
      <Grid container width='100%' justifyContent='center'>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: 4,
            mb: 4,
            width: { xxl: 1600, xl: '100%' },
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <BridgestarsNavbar
            routes={routes.filter((r) => r.name != 'Download')}
            // action={
            //   window.innerWidth > 370
            //     ? {
            //         type: 'internal',
            //         route: '/home',
            //         label: 'back',
            //         color: 'primary',
            //       }
            //     : false
            // }
            sticky
            dark
            fullWidth
          //relative
          //transparent
          />
          <Grid container item alignItems='center' flexDirection='column'>
            <MKBox
              mt={10}
              mb={-2}
              component='img'
              src={bgImage}
              width={{ xs: '75%', sm: '45%', xl: '35%' }}
            ></MKBox>
          </Grid>
          <MKBox px={3} pt={6} mt={6}>
            <Tabs
              value={lang}
              orientation={window.innerWidth < 450 ? 'vertical' : 'horizontal'}
              onChange={(e, val) => setLang(val)}
            >
              <Tab label='sv_test' value={'sv'} icon={<Icon>gavel</Icon>} />
              <Tab
                label='eng_test'
                value={'en'}
                icon={<Icon>health_and_safety</Icon>}
              />
            </Tabs>
            <Information sv={sv} />
            <MKBox
              component='section'
              pt={{ xs: 6, lg: 9 }}
              pb={{ xs: 3, xl: 4 }}
            >
              <Container>
                {!showAllOptions && (
                  <>
                    {isWindows && <CARD.DownloadCardWindows sv={sv} />}
                    {isMac && <CARD.DownloadCardMacInstaller sv={sv} />}
                    {isMobile && (
                      <MKTypography variant='h4'>
                        {sv
                          ? 'Bridgestars fungerar inte ännu på telefonen utan kräver en dator, vänligen öppna denna hemsidan på din dator för att installera Bridgestars.'
                          : 'Bridgestars is not yet available on mobile, please return to this page on your computer to install Bridgestars.'}
                      </MKTypography>
                    )}
                    {!isMac && !isWindows && !isMobile && (
                      <MKTypography variant='h4'>
                        {sv
                          ? 'Bridgestars fungerar inte ännu på denna platform utan kräver en dator med Windows eller MacOS, hör gärna av dig till oss om detta.'
                          : 'Bridgestars is not yet available on this platform. Windows or MacOS is required.'}
                      </MKTypography>
                    )}
                    <MKButton
                      variant=''
                      onClick={(e) => {
                        setShowAllOptions(true);
                      }}
                      color='info'
                      size='large'
                      sx={{ my: 2 }}
                    >
                      {sv ? 'Visa Andra alternativ' : 'Show All Alternatives'}
                    </MKButton>
                  </>
                )}
              </Container>
              {showAllOptions && (
                <Container>
                  <CARD.DownloadCardWindows sv={sv} />
                  <CARD.DownloadCardMacInstaller sv={sv} />
                  <CARD.DownloadCardMacRaw sv={sv} />
                </Container>
              )}
            </MKBox>
          </MKBox>
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default DownloadPage;
