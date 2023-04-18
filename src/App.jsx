/**
=========================================================

* Otis Kit PRO - v2.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from 'react';

// react-router components
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Otis Kit PRO themes
import theme from './assets/theme';
// import Presentation from 'layouts/pages/presentation';
// import SignupForm from 'bridgestars/auth/sign-up';
import SigninForm from './bridgestars/auth/sign-in';
import BetaSignupForm from './bridgestars/auth/beta-sign-up';

// Otis Kit PRO routes
import routes from 'constants/routes';

import BridgestarsHomeOld from 'bridgestars/home_old';
import BridgestarsHome from 'bridgestars/home';
import About from 'bridgestars/about';
import WIP from 'bridgestars/wip/wip';
import Policy from 'bridgestars/help/Policy/index';
import Download from 'bridgestars/download/index';
import Skola from 'bridgestars/skola/index';
import ForgotPass from 'bridgestars/auth/forgot-pass/index';
import ResetPasswordForm from 'bridgestars/auth/reset-pass/index';
import CookieConsent from 'react-cookie-consent';
import VotingPage from 'bridgestars/voting';
import Success from 'bridgestars/info/stripe/paymentSuccess';
import Failure from 'bridgestars/info/stripe/paymentFailure';
import Back from 'bridgestars/info/stripe/back';

import './style.css';
import './parse-config';

export default function App() {
  const { pathname } = useLocation();
  const [firstTime, setFirstTime] = useState(true);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  // useEffect(() => {
  //   const ele = document.getElementById('ipl-progress-indicator');
  //   if (ele) {
  //     // fade out
  //     ele.classList.add('available');
  //     ele.outerHTML = '';
  //   }
  // }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route, i) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route exact path={route.route} element={route.component} key={i} />
        );
      }

      return null;
    });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path='*'
          element={
            <BridgestarsHome
              firstTime={firstTime}
              setFirstTime={setFirstTime}
            />
          }
        />

        {/* <Route path='/home_old' element={<BridgestarsHomeOld />} /> */}
        {/* <Route path='/signup' element={<SignupForm />} /> */}
        <Route path='/about' element={<About />} />
        {/* <Route path='/signin' element={<SigninForm />} /> */}
        <Route path='/download' element={<Download />} />
        <Route path='/skola' element={<Skola />} />
        <Route path='/vote' element={<VotingPage />} />
        <Route path='/betasignup' element={<BetaSignupForm />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/signin/*' element={<SigninForm />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/404.html' exact />
        <Route path='/forgot-pass' element={<ForgotPass />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/wip' element={<WIP />} />
        <Route path='/success' element={<Success />} />
        <Route path='/failure' element={<Failure />} />
        <Route path='/back' element={<Back />} />
        {/* <Route path='/reset-pass' element={<ResetPasswordForm />} /> */}
        {/* {getRoutes(routes)} */}
      </Routes>
      {/* <CookieConsent
        location='bottom'
        buttonText='Sure man!!'
        cookieName='myAwesomeCookieName2'
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{' '}
        <span style={{ fontSize: '10px' }}>This bit of text is smaller :O</span>
      </CookieConsent> */}
    </ThemeProvider>
  );
}
