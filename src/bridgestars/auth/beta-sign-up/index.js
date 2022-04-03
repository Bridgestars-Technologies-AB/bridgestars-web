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
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKInput from 'components/MKInput';
import MKButton from 'components/MKButton';

// Authentication layout components
import IllustrationLayout from '../IllustrationLayout';

// Image
import bgImage from 'assets/images/illustrations/illustration-reset.jpg';
import logo from 'assets/images/bridgestars/logo-trans-512px.png';
import useValidator from 'bridgestars/auth/beta-sign-up/validator.js';

// Firebase
import { firebaseApp } from 'firebase-config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import Policies from 'bridgestars/help/Policy/Policies';
import { Button } from '@mui/material';

function BetaSignupForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [title, setTitle] = useState('Gain access to the closed beta');
  const [description, setDescription] = useState(
    'Lets register by creating an account'
  );

  const auth = getAuth(firebaseApp);

  const formLogin = ({ email, password }) => {
    //setTriedToSubmit(true);
    //AUTH SIGNIN
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        const errorCodes = {
          'auth/email-already-in-use': 'The provided email is already in use.',
          'auth/email-already-exists': 'The provided email is already in use.',
          'auth/invalid-email': 'The provided email is not valid',
          'auth/invalid-password':
            'Password should contains atleast 8 characters and contain uppercase,lowercase and numbers',
        };
        alert(
          errorCodes[errorCode]
            ? errorCodes[errorCode]
            : errorCode.split('/')[1].replaceAll('-', ' ')
        );
      });
  };

  onAuthStateChanged(auth, (user) => {
    // Check for user status
    // console.log(user);
    //signOut(auth); //RELOAD WITH THIS TO SIGN OUT
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log('SIGNED IN');
      setConfirmed(true);
      setTitle('You are now registered for the closed beta');
      setDescription(
        'You will be notified at\n(' + user.email + ')\nwhen the beta is ready'
      );
      // ...
    } else {
      console.log('SIGNED OUT');
      setConfirmed(false);
      setTitle('Gain access to the closed beta');
      setDescription('Lets register by creating an account');
    }
  });

  const [policy, setPolicy] = useState(false);

  const { formDenied, values, errors, handleChange, handleSubmit, clearForm } =
    useValidator(formLogin);

  //Final submit function

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
      <MKBox component='form' role='form'>
        <MKBox mb={2}>
          <MKInput
            type='email'
            name='email'
            label='Email'
            error={errors['email'] ? true : false || formDenied}
            success={values['email'] && !errors['email'] ? true : false}
            fullWidth
            onChange={handleChange}
          />
        </MKBox>
        <MKBox mb={2}>
          <MKInput
            type='password'
            name='password'
            label='Password'
            error={errors['password'] ? true : false || formDenied}
            success={values['password'] && !errors['password'] ? true : false}
            fullWidth
            onChange={handleChange}
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
          />
        </MKBox>
        <Grid container item xs={12} mb={-1} justifyContent='center'>
          <MKBox display='flex' alignItems='center' ml={-1} fullWidth>
            <Checkbox
              checked={policy}
              name='policy'
              onChange={handleSetPolicy}
            />
            <MKTypography
              variant='button'
              fontWeight='regular'
              color='text'
              sx={{ cursor: 'default', userSelect: 'none', ml: -1 }}
            >
              &nbsp;&nbsp;I agree with the&nbsp;
              <MKTypography
                //component='button'
                variant='button'
                fontWeight='bold'
                color='info'
                textGradient
                onClick={handlePolicyClick}
                ml={window.innerWidth < 340 ? 1 : 0}
                sx={{ cursor: 'pointer' }}
              >
                Terms and Conditions
              </MKTypography>
            </MKTypography>
          </MKBox>
        </Grid>
        <MKBox mt={4} mb={1}>
          <MKButton
            onClick={handleSubmit}
            variant='gradient'
            color='info'
            size='large'
            fullWidth
          >
            sign up
          </MKButton>
        </MKBox>
        <MKBox mt={2} mb={1} textAlign='center'>
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
        </MKBox>
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
        name='Sign Up'
        logo={window.innerHeight > 600 || confirmed ? logo : ''}
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

export default BetaSignupForm;
