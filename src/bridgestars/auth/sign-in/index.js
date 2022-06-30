import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import { Component } from 'react';
import { Grid } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKInput from 'components/MKInput';
import MKButton from 'components/MKButton';
import Breadcrumbs from 'examples/Breadcrumbs';

// Authentication layout components
import IllustrationLayout from '../IllustrationLayout';

// Image
import bgImage from 'assets/images/illustrations/illustration-reset.jpg';
import logo from 'assets/images/bridgestars/logo-trans-512px.png';
import useValidator from 'bridgestars/auth/sign-in/validator.js';

// Firebase
import { firebaseApp } from 'firebase-config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';

function SigninForm(modal) {
  const auth = getAuth(firebaseApp);

  //Final submit function
  const formLogin = ({ username, password, setErrors }) => {
    //setTriedToSubmit(true);
    console.log(password)
    console.log(username+".account@bridgestars.net");
    signInWithEmailAndPassword(auth, username+".account@bridgestars.net", password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if(searchParams.has('backlink')) navigateTo(searchParams.get('backlink'))
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
          'auth/invalid-password': 'Invalid password',
        };
        if (errorCode.includes('password')) {
          setErrors({ password: 'Wrong password' });
        }
        alert(
          errorCodes[errorCode]
            ? errorCodes[errorCode]
            : errorCode.split('/')[1].replaceAll('-', ' ')
        );
      });
  };

  const [policy, setPolicy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [title, setTitle] = useState('Sign in to your Bridgestars account');
  const [description, setDescription] = useState(
    'Enter your email and password'
  );
  const [searchParams, setSearchParams] = useSearchParams()
  const navigateTo = useNavigate();


  const { formDenied, values, errors, handleChange, handleSubmit, clearForm } =
    useValidator(formLogin);

  onAuthStateChanged(auth, (user) => {
    //signOut(auth); //RELOAD WITH THIS TO SIGN OUT

    if (user) {
      setSignedIn(true);
      setTitle('You are now signed in');
      setDescription(
        'You can now press the button to go back'
      );
    } else {
      setSignedIn(false);
      setTitle('Sign in to your Bridgestars account');
      setDescription('Enter your email and password');
    }
  });

  const handleSetPolicy = (event) => {
    event.target.value = !policy;
    setPolicy(!policy);
    handleChange(event);
  };

  const handleSignOut = () => {
    signOut(auth);
    clearForm();
  };



  const form = (
    <MKBox component='form' role='form'>
      <MKBox mb={2}>
          <MKInput
            name='username'
            label='Username'
            error={errors['username'] || formDenied}
            success={values['username'] && !errors['username']}
            fullWidth
            onChange={handleChange}
          />
        </MKBox>
      {/* <MKBox mb={2}>
        <MKInput
          type='email'
          name='email'
          label='Email'
          error={errors['email'] ? true : false || formDenied}
          success={values['email'] && !errors['email'] ? true : false}
          fullWidth
          onChange={handleChange}
        />
      </MKBox> */}
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

      <MKBox mt={3} mb={1}>
        <MKButton
          onClick={handleSubmit}
          variant='gradient'
          color='info'
          size='large'
          fullWidth
        >
          sign in
        </MKButton>
      </MKBox>
      <MKBox mt={2} mb={1} textAlign='center'>
        <MKTypography variant='button' color='text'>
          Dont have an account?{' '}
          <MKTypography
            component={Link}
            to='/betasignup'
            variant='button'
            color='info'
            fontWeight='medium'
            textGradient
          >
            Sign Up
          </MKTypography>
        </MKTypography>
      </MKBox>
      <Grid container item xs={12} justifyContent='center'>
        <MKBox display='flex' alignItems='center' ml={-1} fullWidth>
          <MKTypography
            //component='button'
            variant='button'
            fontWeight='bold'
            color='info'
            textGradient
            component={Link}
            to={
              '/forgotpass'
            }
            sx={{ cursor: 'pointer' }}
          >
            Forgot your password?
          </MKTypography>
        </MKBox>
      </Grid>
    </MKBox>
  );

  return (
    <>
      <IllustrationLayout
        name='Sign In'
        logo={logo}
        title={title}
        description={description}
        illustration={bgImage}
        modal={modal}
      >
        {/* title='Sign in to your Bridgestars account'
      description='Enter your email and password' */}
        {!signedIn ? (
          form
        ) : (
          <>
            {' '}
            <MKBox mt={0} mb={2}>
              <MKButton
                variant='gradient'
                component={Link}
                to={
                  '/'
                  // '/'
                }
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

export default SigninForm;
