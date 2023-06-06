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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';

function Breadcrumbs({ routes, bgcolor, textcolor, ...rest }) {
  return (
    <MKBox
      bgColor={bgcolor || 'light'}
      borderRadius='md'
      py={1}
      px={2}
      width='100%'
    >
      <MuiBreadcrumbs
        separator={<MKTypography fontSize='3vmin'>/</MKTypography>}
        {...rest}
      >
        {routes.map(({ label, route }) =>
          route ? (
            <MKTypography
              key={label}
              component={Link}
              to={route}
              variant='button'
              color='info'
              fontWeight='bold'
              fontSize='3vmin'
              opacity={1}
              sx={{
                '&:hover, &:focus': {
                  color: ({ palette: { info } }) => info.main,
                },
              }}
            >
              {label}
            </MKTypography>
          ) : (
            <MKTypography
              key={label}
              variant='button'
              fontWeight='bold'
              fontSize='3vmin'
              color='text'
              opacity={0.8}
            >
              {label}
            </MKTypography>
          )
        )}
      </MuiBreadcrumbs>
    </MKBox>
  );
}

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Breadcrumbs;
