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

// @mui material components
import Switch from '@mui/material/Switch';
import LinearProgress from '@mui/material/LinearProgress';
import { Component } from 'react';

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
import firebaseApp from 'firebase-config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

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
    console.log(user);
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

  const { formDenied, values, errors, handleChange, handleSubmit } =
    useValidator(formLogin);

  //Final submit function

  const handleSetPolicy = (event) => {
    event.target.value = !policy;
    setPolicy(!policy);
    handleChange(event);
  };

  const form = () => {
    return (
      <MKBox component='form' role='form'>
        <MKBox mb={2}>
          <MKInput
            type='email'
            name='email'
            label='Email'
            error={errors['email'] || formDenied}
            success={values['email'] && !errors['email']}
            fullWidth
            onChange={handleChange}
          />
        </MKBox>
        <MKBox mb={2}>
          <MKInput
            type='password'
            name='password'
            label='Password'
            error={errors['password'] || formDenied}
            success={values['password'] && !errors['password']}
            fullWidth
            onChange={handleChange}
          />
        </MKBox>
        <MKBox mb={2}>
          <MKInput
            type='password'
            name='password-check'
            error={errors['password-check'] || formDenied}
            success={values['password-check'] && !errors['password-check']}
            label='Confirm Password'
            fullWidth
            onChange={handleChange}
          />
        </MKBox>
        <MKBox display='flex' alignItems='center' ml={-1}>
          <Checkbox checked={policy} name='policy' onChange={handleSetPolicy} />
          <MKTypography
            variant='button'
            fontWeight='regular'
            color='text'
            sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
          >
            &nbsp;&nbsp;I agree with the&nbsp;
          </MKTypography>
          <MKTypography
            component='a'
            href='#'
            variant='button'
            fontWeight='bold'
            color='info'
            textGradient
          >
            Terms and Conditions
          </MKTypography>
        </MKBox>
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
        <MKBox mt={3} mb={1} textAlign='center'>
          <MKTypography variant='button' color='text'>
            Already registered?{' '}
            <MKTypography
              component={Link}
              to='/signin'
              variant='button'
              color='info'
              fontWeight='medium'
              textGradient
            >
              See your status
            </MKTypography>
          </MKTypography>
        </MKBox>
      </MKBox>
    );
  };

  return (
    <IllustrationLayout
      logo={logo}
      title={title}
      description={description}
      illustration={bgImage}
    >
      {!confirmed ? (
        form()
      ) : (
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
      )}
    </IllustrationLayout>
  );
}

export default BetaSignupForm;
