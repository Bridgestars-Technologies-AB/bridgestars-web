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

import { useEffect } from 'react';

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
import theme from 'assets/theme';
import Presentation from 'layouts/pages/presentation';
import SignupForm from 'bridgestars/auth/sign-up';
import SigninForm from 'bridgestars/auth/sign-in';
import BetaSignupForm from 'bridgestars/auth/beta-sign-up';

// Otis Kit PRO routes
import routes from 'constants/routes';

import BridgestarsHomeOld from 'bridgestars/home_old';
import BridgestarsHome from 'bridgestars/home';
import About from 'bridgestars/about';

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path='*' element={<BridgestarsHome />} />
        <Route path='/home_old' element={<BridgestarsHomeOld />} />
        {/* <Route path='/signup' element={<SignupForm />} /> */}
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/betasignup' element={<BetaSignupForm />} />
        <Route path='/404.html' exact />
        <Route path='/wip.html' exact />
      </Routes>
    </ThemeProvider>
  );
}
