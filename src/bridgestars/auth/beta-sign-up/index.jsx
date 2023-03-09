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
import { useEffect } from 'react';
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
import useValidator from 'bridgestars/auth/beta-sign-up/validator';

import { PulseLoader } from 'react-spinners';

// Firebase
// import { firebaseApp } from 'firebase-config';
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';

import Policies from 'bridgestars/help/Policy/Policies';
import { Button } from '@mui/material';
import SigninForm from '../sign-in';
import { onAuthStateChanged } from 'firebase/auth';

function BetaSignupForm({ modal, modalexitcallback, ...rest }) {
  const [goToSignIn, setGoToSignIn] = useState(false);

  const [confirmed, setConfirmed] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  // const auth = getAuth(firebaseApp);

  const validateSuccessCallback = ({ username, email, password }) => {
    //setTriedToSubmit(true);
    //AUTH SIGNIN
    //TODO
    Parse.User.signUp(username, password, { email: email })
      .then((user) => {
        // Signed in
        setShowLoader(false);
        setFormSuccess(true);
        onAuthStateChanged();
      })
      .catch((error) => {
        setShowLoader(false);
        // const errorCodes = {
        //   'auth/email-already-in-use': 'The provided email is already in use.',
        //   'auth/email-already-exists': 'The provided email is already in use.',
        //   'auth/invalid-email': 'The provided email is not valid',
        //   'auth/invalid-password':
        //     'Password should contains atleast 8 characters and contain uppercase,lowercase and numbers',
        // };
        alert(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged();
  }, []);

  function onAuthStateChanged() {
    if (Parse.User.current()) {
      console.log('SIGNED IN');
      setConfirmed(true);
      setConfirmed(true);
      setTitle('Welcome to Bridgestars!');
      setDescription(
        // 'Check your email for a download link for the Bridgestars App.'
        'We will reach out to your email address once Bridgestars becomes available.'
      );
      // ...
    } else {
      setConfirmed(false);
      setTitle('Join the Bridgestars Waiting List');
      // setTitle('Become a Bridgestars Beta Tester');
      setDescription(
        'Enter your desired email and password below to create an account.'
      );
    }
  }

  const validateFailCallback = () => {
    setShowLoader(false);
  };

  const [policy, setPolicy] = useState(false);

  const { formDenied, values, errors, handleChange, handleSubmit, clearForm } =
    useValidator(validateSuccessCallback, validateFailCallback);

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

  const handleSignOut = async () => {
    clearForm();
    await Parse.User.logOut();
    onAuthStateChanged();
    if (modal) setGoToSignIn(true);
    else navigateTo('/signin');
  };

  const form = () => {
    return (
      <MKBox component='form' role='form'>
        <MKBox mb={2}>
          <MKInput
            type='username'
            name='username'
            label='Username'
            error={errors['username'] ? true : false || formDenied}
            success={values['username'] && !errors['username'] ? true : false}
            fullWidth
            onChange={handleChange}
          />
        </MKBox>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowLoader(true);
                handleSubmit();
              }
            }}
            onChange={handleChange}
          />
        </MKBox>
        <Grid container item xs={12} mb={-1} justifyContent='center'>
          <MKBox display='flex' alignItems='center' ml={-1}>
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
            onClick={() => {
              setShowLoader(true);
              handleSubmit();
            }}
            variant='gradient'
            color='info'
            size='large'
            fullWidth
          >
            {showLoader ? (
              <PulseLoader color='white' speedMultiplier={1} size={8} />
            ) : (
              'join'
            )}
          </MKButton>
          <MKBox mt={3} mb={1} textAlign='center'>
            <MKTypography variant='button' color='text'>
              Already have an account?{' '}
              <MKTypography
                // component={Link}
                // to='/signin'
                variant='button'
                color='info'
                fontWeight='medium'
                textGradient
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (modal) setGoToSignIn(true);
                  else navigateTo('/signin');
                }}
              >
                Sign In
              </MKTypography>
            </MKTypography>
          </MKBox>
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
  if (goToSignIn)
    return (
      <SigninForm
        modal={modal}
        modalexitcallback={modal ? modalexitcallback : null}
        {...rest}
      />
    );

  return (
    <>
      <Modal
        open={showPolicy}
        onClose={handlePolicyClose}
        style={{ overflow: 'scroll' }}
      >
        <MKBox
          style={style}
          mt={0}
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
        name='Register'
        logo={window.innerHeight > 500 || confirmed ? logo : ''}
        title={title}
        description={description}
        illustration={bgImage}
        modal={modal}
        modalexitcallback={modal ? modalexitcallback : null}
        {...rest}
      >
        {!confirmed ? (
          form()
        ) : (
          <>
            <MKBox mt={1} mb={1}>
              <MKButton
                variant='gradient'
                // component={Link}
                // to='/'
                onClick={() => {
                  if (modal) {
                    modalexitcallback();
                  } else navigateTo(-2);
                }}
                size='medium'
                fontSize='2vmin'
                fullWidth
                color='info'
              //sx={{ color: ({ palette: { dark } }) => dark.main }}
              >
                {modal ? 'done' : 'back'}
              </MKButton>
            </MKBox>

            <Grid container item xs={12} justifyContent='center'>
              <MKBox display='flex' alignItems='center' ml={-1} /*fullWidth*/>
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
BetaSignupForm.defaultProps = {
  modal: false,
  modalexitcallback: () => { },
};

export default BetaSignupForm;
