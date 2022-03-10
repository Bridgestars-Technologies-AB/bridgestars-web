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
import useValidator from 'bridgestars/auth/sign-in/validator.js';

function SigninForm() {
  //Final submit function
  const formLogin = () => {
    //setTriedToSubmit(true);
    //AUTH SIGNIN
  };
  const [policy, setPolicy] = useState(false);

  const { formDenied, values, errors, handleChange, handleSubmit } =
    useValidator(formLogin);

  const handleSetPolicy = (event) => {
    event.target.value = !policy;
    setPolicy(!policy);
    handleChange(event);
  };

  const handleForget = () => {};

  return (
    <IllustrationLayout
      logo={logo}
      title='Sign in to your Bridgestars account'
      description='Enter your email and password'
      illustration={bgImage}
    >
      <MKBox component='form' role='form'>
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
              to='/signup'
              variant='button'
              color='info'
              fontWeight='medium'
              textGradient
            >
              Sign Up
            </MKTypography>
          </MKTypography>
        </MKBox>
        <MKBox mt={1} mb={0} textAlign='center'>
          <MKTypography variant='button' color='text'>
            <MKTypography
              component={Link}
              to='/signin'
              variant='button'
              color='info'
              fontWeight='medium'
              textGradient
              onClick={handleForget}
            >
              Forgot your password?{' '}
            </MKTypography>
          </MKTypography>
        </MKBox>
      </MKBox>
    </IllustrationLayout>
  );
}

export default SigninForm;
