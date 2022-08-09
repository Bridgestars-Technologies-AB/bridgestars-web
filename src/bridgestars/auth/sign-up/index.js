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
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import MKInput from 'otis/MKInput';
import MKButton from 'otis/MKButton';

// Authentication layout components
import IllustrationLayout from '../IllustrationLayout';

// Image
import logo from 'assets/images/bridgestars/logo-trans-512px.png';
import useValidator from 'bridgestars/auth/sign-up/validator.js';

function SignupForm() {
  //Final submit function
  const formLogin = () => {
    //setTriedToSubmit(true);
    //AUTH SIGNIN
  };
  const success = { username: false };
  const [policy, setPolicy] = useState(false);

  const { formDenied, values, errors, handleChange, handleSubmit } =
    useValidator(formLogin);

  const handleSetPolicy = (event) => {
    event.target.value = !policy;
    setPolicy(!policy);
    handleChange(event);
  };

  return (
    <IllustrationLayout
      logo={logo}
      title="Let's create an account for you"
      description='Enter your email and password to register'
    >
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
            Already have an account?{' '}
            <MKTypography
              component={Link}
              to='/signin'
              variant='button'
              color='info'
              fontWeight='medium'
              textGradient
            >
              Sign In
            </MKTypography>
          </MKTypography>
        </MKBox>
      </MKBox>
    </IllustrationLayout>
  );
}

export default SignupForm;
