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
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import MKInput from 'otis/MKInput';
import MKButton from 'otis/MKButton';
import Breadcrumbs from 'otis/Breadcrumbs';

// Authentication layout components
import IllustrationLayout from '../IllustrationLayout';

// Image
import bgImage from 'assets/images/bridgestars/sign_in.svg';
import logo from 'assets/images/bridgestars/logo-trans-512px.png';
import useValidator from 'bridgestars/auth/sign-in/validator.js';

// Firebase
import { firebaseApp, sendPasswordResetEmailLink } from 'firebase-config';
import { LineAxisOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPasswordForm({ modal, doneCallback, quitCallback, ...rest}) {
  const [emailSent, setEmailSent] = useState(false);
  const [title, setTitle] = useState('Forgot your password?');
  const [description, setDescription] = useState(
    'Enter your email and we will send you a one time link to replace it.'
  );
  const navigateTo = useNavigate()

  const { formDenied, values, errors, handleChange, handleSubmit, clearForm } =
    useValidator();

  // onAuthStateChanged(auth, (user) => {
  //   //signOut(auth); //RELOAD WITH THIS TO SIGN OUT

  //   if (user) {
  //     setSignedIn(true);
  //     setTitle('You are registered for the closed beta');
  //     setDescription(
  //       'You will be notified at\n(' + user.email + ')\nwhen the beta is ready'
  //     );
  //   } else {
  //     setSignedIn(false);
  //     setTitle('Sign in to your Bridgestars account');
  //     setDescription('Enter your email and password');
  //   }
  // });

  // const handleSetPolicy = (event) => {
  //   event.target.value = !policy;
  //   setPolicy(!policy);
  //   handleChange(event);
  // };

  // const handleSignOut = () => {
  //   signOut(auth);
  //   clearForm();
  // };

  const handleForgot = () => {
    if (!values['email']) {
      alert('Please enter your email and try again');
    } else if (errors['email']) {
      alert(errors['email']);
    } else {
      console.log('sending password reset email');
      console.log(sendPasswordResetEmailLink + 'email=' + values['email']);
      fetch(sendPasswordResetEmailLink + 'email=' + values['email'])
        .then((e) => {
          console.log('no error?');
          throw 'create eror';
        })
        .catch((response) => {
          throw 'OK';
        });
      //this will always reject due to cors but will work anyways.
      setEmailSent(true);
      setTitle('Email has been sent');
      setDescription('Please check your inbox at ' + values['email']);
    }
  };

  const form = (
    <MKBox>
      {/* <MKBox mb={2}>
          <MKInput
            name='username'
            label='Username'
            error={errors['username'] || formDenied}
            success={values['username'] && !errors['username']}
            fullWidth
            onChange={handleChange}
          />
        </MKBox> */}
      <MKBox mb={2}>
        <MKInput
          type='email'
          name='email'
          label='Email'
          error={errors['email'] ? true : false || formDenied}
          success={values['email'] && !errors['email'] ? true : false}
          fullWidth
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleForgot();
          }}
        />
      </MKBox>

      <MKBox mt={3} mb={1}>
        <MKButton
          onClick={handleForgot}
          variant='gradient'
          color='info'
          size='large'
          fullWidth
        >
          reset password
        </MKButton>
      </MKBox>
      <MKBox mt={2} mb={1} textAlign='center'>
        <MKTypography variant='button' color='text'>
          Don't want to reset your password?{' '}
          <MKTypography
            component={'span'}
            // to='/betasignup'
            onClick={(e) => {
              if (modal) {
                quitCallback();
              } else navigateTo('/');
            }}
            variant='button'
            color='info'
            fontWeight='medium'
            textGradient
            sx={{ cursor: 'pointer' }}
          >
            Go Back
          </MKTypography>
        </MKTypography>
      </MKBox>
    </MKBox>
  );

  return (
    <>
      <IllustrationLayout
        name='Password Reset'
        logo={logo}
        title={title}
        description={description}
        illustration={bgImage}
        modal={modal}
        {...rest}
      >
        {/* title='Sign in to your Bridgestars account'
      description='Enter your email and password' */}
        {!emailSent ? (
          form
        ) : (
          <>
            {' '}
            <MKBox mt={0} mb={2}>
              <MKButton
                variant='gradient'
                // component={Link}
                // to='/'
                onClick={() => {
                  if (modal) {
                    doneCallback();
                  } else navigateTo('/');
                }}
                size='medium'
                fontSize='2vmin'
                fullWidth
                color='info'
                //sx={{ color: ({ palette: { dark } }) => dark.main }}
              >
                {modal ? 'back' : 'home'}
              </MKButton>
            </MKBox>
          </>
        )}
      </IllustrationLayout>
    </>
  );
}

ForgotPasswordForm.defaultProps = {
  modal: false,
};

export default ForgotPasswordForm;
