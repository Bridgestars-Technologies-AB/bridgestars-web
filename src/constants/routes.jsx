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

// @mui material components
import Icon from '@mui/material/Icon';

// Account
import SigninForm from 'bridgestars/auth/sign-in';
import SigninModal from 'bridgestars/components/modal';

import BridgestarsHome from 'bridgestars/home/index';

const routes = [
  // {
  //   name: 'download',
  //   icon: <Icon>download</Icon>,
  //   route: '/download',
  //   component: <SignupForm />,
  // },
  // {
  //   name: 'account',
  //   icon: <Icon>contacts</Icon>,
  //   route: '/signin',
  //   component: <SigninForm />,
  // },
  {
    name: 'Home',
    icon: <Icon>home</Icon>,
    route: '/',
  },
  {
    name: 'About us',
    icon: <Icon>info</Icon>,
    route: '/about',
    //component: <About />,
  },
  // {
  //   name: 'FAQ',
  //   icon: <Icon>help</Icon>,
  //   route: '/wip',
  //   //component: <SigninForm />,
  // },
  // {
  //   name: 'Policy',
  //   icon: <Icon>policy</Icon>,
  //   route: '/policy',
  //   //component: <SigninForm />,
  // },
  // {
  //   name: 'Vote',
  //   icon: <Icon>gavel</Icon>,
  //   route: '/vote',
  //   //component: <SigninForm />,
  // },
  {
    name: 'Sign In',
    icon: <Icon>account_circle</Icon>,
    route: '/signin',
    //component: <SigninForm modal />,
  },
];

export default routes;
