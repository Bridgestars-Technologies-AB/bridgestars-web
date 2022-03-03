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

// Otis Kit PRO components
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKInput from 'components/MKInput';
import MKButton from 'components/MKButton';

// Authentication layout components
import IllustrationLayout from './IllustrationLayout';

// Image
import bgImage from 'assets/images/illustrations/illustration-reset.jpg';

function SignUp() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title='Sign up to Bridgestars'
      description='Enter your email and password to register'
      illustration={bgImage}
    >
      <MKBox component='form' role='form'>
        <MKBox mb={2}>
          <MKInput type='name' label='Name' fullWidth />
        </MKBox>
        <MKBox mb={2}>
          <MKInput type='email' label='Email' fullWidth />
        </MKBox>
        <MKBox mb={2}>
          <MKInput type='password' label='Password' fullWidth />
        </MKBox>
        <MKBox display='flex' alignItems='center' ml={-1}>
          <Checkbox />
          <MKTypography
            variant='button'
            fontWeight='regular'
            color='text'
            sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
          >
            &nbsp;&nbsp;I agree the&nbsp;
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
          <MKButton variant='gradient' color='info' size='large' fullWidth>
            sign in
          </MKButton>
        </MKBox>
        <MKBox mt={3} mb={1} textAlign='center'>
          <MKTypography variant='button' color='text'>
            Already have an account?{' '}
            <MKTypography
              component={Link}
              to='/authentication/sign-in/cover'
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

export default SignUp;
