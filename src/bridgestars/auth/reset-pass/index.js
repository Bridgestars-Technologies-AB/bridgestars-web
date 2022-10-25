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

import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

// react-router-dom components
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// @mui material components
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import { Component } from 'react';
import Modal from '@mui/material/Modal';
import { Icon } from '@mui/material';
import { Grid } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import MKInput from 'otis/MKInput';
import MKButton from 'otis/MKButton';

// Authentication layout components
import IllustrationLayout from '../IllustrationLayout';

// Image
import bgImage from 'assets/images/bridgestars/sign_in.svg';
import logo from 'assets/images/bridgestars/logo-trans-512px.png';
import useValidator from 'bridgestars/auth/beta-sign-up/validator.js';

// Firebase
// import { firebaseApp } from 'firebase-config';

// import {
//   getAuth,
//   verifyPasswordResetCode,
//   confirmPasswordReset,
// } from 'firebase/auth';

import Policies from 'bridgestars/help/Policy/Policies';
import { Button } from '@mui/material';

function ResetPasswordForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [title, setTitle] = useState('Enter your new password');
  const [description, setDescription] = useState('');

  const [policy, setPolicy] = useState(false);

  const { formDenied, values, errors, handleChange, handleSubmit, clearForm } =
    useValidator(submit);

  //Final submit function
  function submit() {
    ResetPassword(auth, this.props.location.query.oobCode, '', '');
  }

  function ResetPassword(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Verify the password reset code is valid.
    //TODO
    // verifyPasswordResetCode(auth, actionCode)
    //   .then((email) => {
    //     const accountEmail = email;

    //     // TODO: Show the reset screen with the user's email and ask the user for
    //     // the new password.
    //     const newPassword = values['password'];

    //     // Save the new password.
    //     confirmPasswordReset(auth, actionCode, newPassword)
    //       .then((resp) => {
    //         // Password reset has been confirmed and new password updated.
    //         // TODO: Display a link back to the app, or sign-in the user directly
    //         // if the page belongs to the same domain as the app:
    //         // auth.signInWithEmailAndPassword(accountEmail, newPassword);
    //         // TODO: If a continue URL is available, display a button which on
    //         // click redirects the user back to the app via continueUrl with
    //         // additional state determined from that URL's parameters.
    //       })
    //       .catch((error) => {
    //         // Error occurred during confirmation. The code might have expired or the
    //         // password is too weak.
    //       });
    //   })
    //   .catch((error) => {
    //     // Invalid or expired action code. Ask user to try to reset the password
    //     // again.
    //   });
  }

  const handleSetPolicy = (event) => {
    event.target.value = !policy;
    setPolicy(!policy);
    handleChange(event);
  };

  const [showPolicy, setShowPolicy] = useState(false);
  const handlePolicyClick = () => {
    setShowPolicy(true);
  };
  const handlePolicyClose = () => {
    setShowPolicy(false);
  };

  const navigateTo = useNavigate();

  const handleSignOut = () => {
    signOut(auth);
    clearForm();
    navigateTo('/signin');
  };

  const form = () => {
    return (
      <MKBox>
        <MKBox mb={2}>
          <MKInput
            type='password'
            name='password'
            label='Password'
            error={errors['password'] ? true : false || formDenied}
            success={values['password'] && !errors['password'] ? true : false}
            fullWidth
            onChange={handleChange}
            onKeyPressed={(e) => e.key === 'Enter' && handleSubmit}
          />
        </MKBox>
        <MKBox mb={2}>
          <MKInput
            type='password'
            name='password-check'
            error={errors['password-check'] ? true : false || formDenied}
            success={
              values['password-check'] && !errors['password-check']
                ? true
                : false
            }
            label='Confirm Password'
            fullWidth
            onChange={handleChange}
            onKeyPressed={(e) => e.key === 'Enter' && handleSubmit}
          />
        </MKBox>
        <MKBox mt={4} mb={1}>
          <MKButton
            onClick={handleSubmit}
            variant='gradient'
            color='info'
            size='large'
            fullWidth
          >
            register
          </MKButton>
        </MKBox>
        {/* <MKBox mt={2} mb={1} textAlign='center'>
          <MKTypography
            variant='button'
            color='text'
            sx={{ cursor: 'default' }}
          >
            Already registered?{' '}
            <MKTypography
              component={Link}
              to='/signin'
              variant='button'
              color='info'
              fontWeight='medium'
              textGradient
              sx={{ cursor: 'pointer' }}
            >
              See your status
            </MKTypography>
          </MKTypography>
        </MKBox> */}
      </MKBox>
    );
  };
  const style = {
    position: 'absolute',
    //top: '20%',
    //left: '50%',
    //transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '50%',
    bgcolor: 'white',
    border: '0px',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={showPolicy}
        onClose={handlePolicyClose}
        style={{ overflow: 'scroll' }}
      >
        <MKBox
          style={style}
          mt={3}
          //textAlign='center'
          width={{ xs: '100%', sm: '100%', md: '70%' }}
        >
          <Button
            mx='auto'
            mb={-1}
            width={{ xs: '100%', sm: '100%', md: '70%' }}
            variant='contained'
            fullWidth
            size='large'
            color='error'
            onClick={handlePolicyClose}
          >
            Close <Icon>close</Icon>
          </Button>
          <Policies />
          <Button
            fullWidth
            variant='contained'
            size='large'
            color='error'
            onClick={handlePolicyClose}
          >
            Close <Icon>close</Icon>
          </Button>
        </MKBox>
      </Modal>
      <IllustrationLayout
        name='Reset Password'
        logo={window.innerHeight > 500 || confirmed ? logo : ''}
        title={title}
        description={description}
        illustration={bgImage}
      >
        {!confirmed ? (
          form()
        ) : (
          <>
            <MKBox mt={1} mb={1}>
              <MKButton
                variant='gradient'
                component={Link}
                to='/'
                size='medium'
                fontSize='2vmin'
                fullWidth
                color='info'
                //sx={{ color: ({ palette: { dark } }) => dark.main }}
              >
                home
              </MKButton>
            </MKBox>
            <Grid container item xs={12} justifyContent='center'>
              <MKBox display='flex' alignItems='center' ml={-1} fullWidth>
                <MKTypography
                  variant='button'
                  fontWeight='regular'
                  color='text'
                  sx={{ cursor: 'default', userSelect: 'none', ml: -1 }}
                >
                  Don't want to stay signed in?&nbsp;
                </MKTypography>
                <MKTypography
                  //component='button'
                  variant='button'
                  fontWeight='bold'
                  color='info'
                  textGradient
                  onClick={handleSignOut}
                  sx={{ cursor: 'pointer' }}
                >
                  Sign Out
                </MKTypography>
              </MKBox>
            </Grid>
          </>
        )}
      </IllustrationLayout>
    </>
  );
}

export default ResetPasswordForm;
