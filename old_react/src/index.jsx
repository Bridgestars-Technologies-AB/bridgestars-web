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

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
