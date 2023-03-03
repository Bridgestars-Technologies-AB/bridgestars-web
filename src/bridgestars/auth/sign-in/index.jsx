import { useState } from 'react';
import { useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import { Component } from 'react';
import { Grid } from '@mui/material';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import MKInput from 'otis/MKInput';
import MKButton from 'otis/MKButton';
import Breadcrumbs from 'otis/Breadcrumbs';

// Authentication layout components
import IllustrationLayout from '../IllustrationLayout';

// Image
import logo from 'assets/images/bridgestars/logo-trans-512px.png';
import useValidator from 'bridgestars/auth/sign-in/validator';

// Firebase

// import { firebaseApp } from 'firebase-config';
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
// } from 'firebase/auth';
// import Parse from 'src/parse-config';

import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
import BetaSignupForm from 'bridgestars/auth/beta-sign-up';
import ForgotPasswordForm from '../forgot-pass';

import { PulseLoader } from 'react-spinners';

function SigninForm({ modal, header, modalexitcallback, ...rest }) {
  // const auth = getAuth(firebaseApp);
  const [goToSignUp, setGoToSignUp] = useState(false);
  const [goToForgotPass, setGoToForgotPass] = useState(false);

  useEffect(() => {
    onAuthStateChanged();
  }, []);

  function onAuthStateChanged() {
    const user = Parse.User.current();
    if (user) {
      setSignedIn(true);
      setTitle('You are already signed in.');
      setDescription('Press the button to go back');
    } else {
      setSignedIn(false);
      setTitle(firstTitle);
      setDescription('Enter your username and password');
    }
  }

  //Final submit function
  const formSuccess = ({ username, password, setErrors }) => {
    //setTriedToSubmit(true);

    Parse.User.logIn(username, password)
      .then((user) => {
        // Signed in
        setShowLoader(false);
        setSignedIn(true);
        setTitle('You are now signed in');
        if (!modal) setDescription('The button below will take you back.');
        else setDescription('Press to button to continue.');
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(JSON.stringify(error));
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorCode);
        // const errorCodes = {
        //   'auth/email-already-in-use':
        //     'The provided username is already in use.',
        //   'auth/email-already-exists':
        //     'The provided username is already in use.',
        //   'auth/invalid-email': 'The provided username is not valid',
        //   'auth/invalid-password': 'Invalid password',
        // };
        // if (errorCode.includes('password')) {
        //   setErrors({ password: 'Wrong password' });
        // }
        alert(
          error.message
          // errorCodes[errorCode]
          //   ? errorCodes[errorCode]
          //   : errorCode.split('/')[1].replaceAll('-', ' ')
        );
      });
  };

  const formFailure = () => {
    setShowLoader(false);
  };

  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const firstTitle = header ? header : 'Sign in to your Bridgestars account';
  const [title, setTitle] = useState(firstTitle);
  const [description, setDescription] = useState(
    'Enter your username and password'
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateTo = useNavigate();

  const {
    formDenied,
    values,
    errors,
    handleChange,
    validatorHandleSubmit,
    clearForm,
  } = useValidator(formSuccess, formFailure);

  const handleSubmit = () => {
    setShowLoader(true);
    validatorHandleSubmit();
  };

  //TODO
  // onAuthStateChanged(auth, (user) => {
  //   //signOut(auth); //RELOAD WITH THIS TO SIGN OUT

  //   if (user) {
  //     setSignedIn(true);
  //     setTitle('You are now signed in');
  //     setDescription('You can now press the button to go back');
  //   } else {
  //     setSignedIn(false);
  //     setTitle(firstTitle);
  //     setDescription('Enter your username and password');
  //   }
  // });

  const handleSetPolicy = (event) => {
    event.target.value = !policy;
    setPolicy(!policy);
    handleChange(event);
  };

  const handleSignOut = async () => {
    clearForm();
    await Parse.User.logOut();
    onAuthStateChanged();
  };

  const form = (
    <MKBox component='form' role='form'>
      <MKBox mb={2}>
        <MKInput
          name='username'
          label='Username/Email'
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
          {showLoader ? (
            <PulseLoader color='white' speedMultiplier={1} size={8} />
          ) : (
            'sign in'
          )}
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
        <MKBox display='flex' alignItems='center' ml={-1}>
          <MKTypography
            //component='button'
            fontWeight='bold'
            color='info'
            textGradient
            variant={'button'}
            component={'span'}
            // to='/betasignup'
            onClick={(e) => {
              setGoToForgotPass(true);
              // if (modal) {
              // } else navigateTo('/forgotpass');
            }}
            sx={{ cursor: 'pointer' }}
          >
            Forgot your password?
          </MKTypography>
        </MKBox>
      </Grid>
    </MKBox>
  );
  if (goToSignUp)
    return (
      <BetaSignupForm
        modalexitcallback={modal ? modalexitcallback : null}
        modal={modal}
        {...rest}
      />
    );
  else if (goToForgotPass)
    return (
      <ForgotPasswordForm
        modal={modal}
        modalexitcallback={
          modal
            ? modalexitcallback
            : () => {
              setGoToForgotPass(false);
            }
        }
        doneCallback={() => setGoToForgotPass(false)}
        quitCallback={() => setGoToForgotPass(false)}
        {...rest}
      />
    );
  return (
    <>
      <IllustrationLayout
        name='Sign In'
        logo={logo}
        title={title}
        description={description}
        modal={modal}
        modalexitcallback={modal ? modalexitcallback : null}
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
                  if (modal) modalexitcallback();
                  else navigate(-1);
                  // else navigateTo('/');
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
              <MKBox display='flex' alignItems='center' ml={-1}>
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
  modalexitcallback: () => { },
  header: 'Sign in to your Bridgestars account',
};

export default SigninForm;
