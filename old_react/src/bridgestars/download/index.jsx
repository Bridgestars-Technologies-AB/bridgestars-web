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
  const platform = navigator.platform;
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const isMac = navigator.platform.includes('Mac');
  const isWindows = navigator.platform.includes('Win');
  const [lang, setLang] = useState(
    navigator.language || navigator.userLanguage
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
          {/* IMAGE */}
          <Grid container item alignItems='center' flexDirection='column'>
            <MKBox
              mt={10}
              mb={-2}
              component='img'
              src={bgImage}
              width={{ xs: '75%', sm: '45%', xl: '35%' }}
            ></MKBox>
          </Grid>

          <Grid container item xs={12} lg={8} xl={7} xxl={6} mx='auto'>
            {/* LANGUAGE TEST */}
            <MKBox px={3} pt={6} mt={6}>
              {/*  TEXT  */}
              <Information sv={sv} lang={lang} setLang={setLang} />
              {/* DOWNLOAD CARDS AND INFO */}
              <MKBox
                component='section'
                pt={{ xs: 2, lg: 2 }}
                pb={{ xs: 2, xl: 2 }}
                justifyContent='center'
              >
                {/* <Container mb={4}> */}
                {isMobile && (
                  <MKTypography variant='h4'>
                    {sv
                      ? 'Bridgestars har ännu inte släppts till telefon utan kräver en dator. Vänligen öppna denna hemsida på din dator för att installera Bridgestars.'
                      : 'Bridgestars is not yet available on mobile. Please return to this page on your computer to install Bridgestars.'}
                  </MKTypography>
                )}
                {!isMac && !isWindows && !isMobile && (
                  <MKTypography variant='h4'>
                    {sv
                      ? 'Bridgestars har ännu inte släppts till denna platform utan kräver en dator med Windows eller MacOS, hör gärna av dig till oss om detta.'
                      : 'Bridgestars is not yet available on this platform. Windows or MacOS is required.'}
                  </MKTypography>
                )}
                {/* </Container> */}
                {!showAllOptions && (
                  <>
                    {isWindows && <CARD.DownloadCardWindows sv={sv} free />}
                    {isMac && <CARD.DownloadCardMacInstaller sv={sv} free />}
                    <Grid
                      container
                      item
                      alignItems='center'
                      flexDirection='column'
                    >
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
                    </Grid>
                  </>
                )}
                {showAllOptions && (
                  <>
                    {isMac ? (
                      <CARD.DownloadCardMacInstaller sv={sv} free />
                    ) : (
                      <CARD.DownloadCardWindows sv={sv} free />
                    )}

                    {!isMac ? (
                      <CARD.DownloadCardMacInstaller sv={sv} free />
                    ) : (
                      <CARD.DownloadCardWindows sv={sv} free />
                    )}
                  </>
                )}
                <Grid container item alignItems='center' flexDirection='column'>
                  <MKTypography variant='body2'>
                    {sv
                      ? '*Gratis att ladda ner, innehåller unikt innehåll som går att köpa från appen.'
                      : '*Free to download, contains in app purchases to access unique content.'}
                  </MKTypography>
                </Grid>
              </MKBox>
            </MKBox>
          </Grid>
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default DownloadPage;
