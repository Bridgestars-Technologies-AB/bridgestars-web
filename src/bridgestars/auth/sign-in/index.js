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
import BetaSignupForm from 'bridgestars/auth/beta-sign-up';
import ForgotPasswordForm from '../forgot-pass';

function SigninForm({ modal, modalExitCallback, header, ...rest }) {
  const auth = getAuth(firebaseApp);
  const [goToSignUp, setGoToSignUp] = useState(false);
  const [goToForgotPass, setGoToForgotPass] = useState(false);

  //Final submit function
  const formLogin = ({ username, password, setErrors }) => {
    //setTriedToSubmit(true);
    console.log(password);
    console.log(username + '.account@bridgestars.net');
    signInWithEmailAndPassword(
      auth,
      username + '.account@bridgestars.net',
      password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        const errorCodes = {
          'auth/email-already-in-use':
            'The provided username is already in use.',
          'auth/email-already-exists':
            'The provided username is already in use.',
          'auth/invalid-email': 'The provided username is not valid',
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
  const firstTitle = header ? header : 'Sign in to your Bridgestars account';
  const [title, setTitle] = useState(firstTitle);
  const [description, setDescription] = useState(
    'Enter your username and password'
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateTo = useNavigate();

  const { formDenied, values, errors, handleChange, handleSubmit, clearForm } =
    useValidator(formLogin);

  onAuthStateChanged(auth, (user) => {
    //signOut(auth); //RELOAD WITH THIS TO SIGN OUT

    if (user) {
      setSignedIn(true);
      setTitle('You are now signed in');
      setDescription('You can now press the button to go back');
    } else {
      setSignedIn(false);
      setTitle(firstTitle);
      setDescription('Enter your username and password');
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
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
            component={'span'}
            // to='/betasignup'
            onClick={(e) => {
              if (modal) {
                e.preventDefault();
                console.log('asdasdasd');
                setGoToSignUp(true);
              } else navigateTo('/betasignup');
            }}
            variant='button'
            color='info'
            fontWeight='medium'
            textGradient
            sx={{ cursor: 'pointer' }}
          >
            Sign Up
          </MKTypography>
        </MKTypography>
      </MKBox>
      <Grid container item xs={12} justifyContent='center'>
        <MKBox display='flex' alignItems='center' ml={-1} fullWidth>
          <MKTypography
            //component='button'
            fontWeight='bold'
            color='info'
            textGradient
            variant={'button'}
            component={'span'}
            // to='/betasignup'
            onClick={(e) => {
              if (modal) {
                setGoToForgotPass(true);
              } else navigateTo('/forgotpass');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Forgot your password?
          </MKTypography>
        </MKBox>
      </Grid>
    </MKBox>
  );
  if (goToSignUp) return <BetaSignupForm modal={modal} />;
  else if (goToForgotPass)
    return (
      <ForgotPasswordForm
        modal={modal}
        doneCallback={() => setGoToForgotPass(false)}
        quitCallback={() => setGoToForgotPass(false)}
      />
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
        {...rest}
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
                // component={Link}
                // to={
                //   '/'
                //   // '/'
                // }
                onClick={() => {
                  if (modal) modalExitCallback()
                  else navigateTo('/')
                }}
                size='medium'
                fontSize='2vmin'
                fullWidth
                color='info'
                //sx={{ color: ({ palette: { dark } }) => dark.main }}
              >
                {modal ? 'done' : 'home'}
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
SigninForm.defaultProps = {
  modal: false,
  modalExitCallback: () => {},
  header: 'Sign in to your Bridgestars account',
};

export default SigninForm;
