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
import Information from '../skola/sections/Information';

// Routes
import routes from 'constants/routes';
import footerRoutes from 'constants/footer.routes';

// Images
import bgImage from 'assets/images/bridgestars/home_page.svg';
import BridgestarsFooter from 'bridgestars/components/footer/BridgestarsFooter';
import BridgestarsNavbar from 'bridgestars/navbar';
import * as CARD from '../download/sections/DownloadCard';
import { Typography } from '@mui/material';

/*
  TODO:

if signed in:
show:
  - username
  - profile picture
  - xp
  - other stuff
  - friends (kan inte se vilka som är online, lite wack, dock kan vi se när de var online senast)


sen sen.
 - matchhistory


viktigast:
  - att kunna se sitt abonnemang och att avsluta det.
  hantera abonnemang: 
  Parse.Cloud.run("generateSubscriptionDashboardLink").then(link => {

  })
  länken ska man komma till om man trycker på knappen i settings: "Manage my subscription".


*/

function Profile({ userIdParam }) {
  const platform = navigator.platform;
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const isMac = navigator.platform.includes('Mac');
  const isWindows = navigator.platform.includes('Win');
  const [lang, setLang] = useState(
    navigator.language || navigator.userLanguage
  );
  const sv = lang.includes('sv');

  const [showAllOptions, setShowAllOptions] = useState(false);

  //på start kolla om vi är inloggade och visa isåfall vårt egna username etc
  useEffect(async () => {
    // const user = Parse.User.current()
    // if (!user) {
    //   setShowProfile(false)
    // }
    // if (userIdParam) {
    //   // hämta den användaren
    //   // bridgestars.net/profile/laskdfow23 <- kommer till någons annans
    //   const user = await new Parse.Query("_User").get(userIdParam);
    //   user.get("username")
    //
    //   console.log("user fetched: ", user)
    //
    //   // const avatar = await user.get("avatar").download()
    //   const courseIds = user.get("courses"); //   ["id1", "id2"]
    //   if (courseIds && courseIds.length > 0) {
    //     const courses = await new Parse.Query("Course").containedIn("objectId", courseIds)
    //   }
    //
    // }
    // else {
    //   //show currently signed in user
    //   // bridgestars.net/profile <- kommer till sin egen
    //   const user = Parse.User.current();
    //   if (!user) //not signed in
    // }
  }, []);

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
              mb={4}
              component='img'
              src={bgImage}
              // values: {
              //   xs: 0,
              //   sm: 576,
              //   md: 768,
              //   lg: 992,
              //   xl: 1200,
              //   xxl: 1400,
              // },
              width={{ xs: '75%', sm: '45%', xl: '35%' }}
            ></MKBox>
          </Grid>

          {/* CONTENT HERE */}

          {/* {isMyProfile ? <PrivateProfile /> : <PublicProfile />} */}
          {/**/}
          {/* {showProfile && <Profile />} */}
          <Grid container item alignItems='center' flexDirection='column'>
            <MKTypography variant='h3'>
              Du är inte inloggad, logga in för att se din profil.
            </MKTypography>
          </Grid>
        </Card>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <BridgestarsFooter />
      </MKBox>
    </>
  );
}

export default Profile;
