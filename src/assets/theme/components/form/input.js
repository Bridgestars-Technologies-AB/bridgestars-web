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

// Otis Kit PRO Base Styles
import colors from 'assets/theme/base/colors';
import typography from 'assets/theme/base/typography';
import borders from 'assets/theme/base/borders';

const { info, inputBorderColor, dark } = colors;
const { size } = typography;
const { borderWidth } = borders;

export default {
  styleOverrides: {
    root: {
      fontSize: size.sm,
      color: dark.main,

      '&:hover:not(.Mui-disabled):before': {
        borderBottom: `${borderWidth[1]} solid ${inputBorderColor}`,
      },

      '&:before': {
        borderColor: inputBorderColor,
      },

      '&:after': {
        borderColor: info.main,
      },
    },
  },
};
