/*
=========================================================
* Otis Kit PRO - v2.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKTypography from 'otis/MKTypography';
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom';
import footerRoutes from 'constants/footer.routes';

import '/node_modules/flag-icons/css/flag-icons.min.css';

function Information({ sv, lang, setLang }) {
  const possibleCountries = ['se', 'gb'];
  const possibleLangs = ['sv', 'en'];
  return (
    <>
      <MKBox component='section'>
        {possibleCountries.map((c, i) => {
          return (
            <span
              class={'fi fi-' + c}
              style={{
                width: '40px',
                height: '30px',
                'margin-right': '5px',
                opacity: lang.includes(possibleLangs[i]) ? 1 : 0.3,
                'box-shadow': lang.includes(possibleLangs[i])
                  ? '0 5px 10px rgb(100 100 100)'
                  : '',
              }}
              onClick={() => setLang(possibleLangs[i])}
            />
          );
        })}

        <MKTypography variant='h4' mb={2} mt={1}>
          {sv ? 'Välkommen till Bridgestars!' : 'Welcome to Bridgestars!'}{' '}
        </MKTypography>
        <MKTypography variant='body2' mr={1}>
          {sv
            ? 'Bridgestars finns nu tillgängligt för några utvalda medlemmar. För att komma igång, ladda ner programvaran nedan på din stationära eller bärbara dator så kommer vi guida dig igenom processen att börja använda Bridgestars.'
            : 'Bridgestars is now available for choosen members on Windows and Mac OS. To get started, download the software below and let us guide you through the process of becoming one of our trusted users. If anytime, you forget your password, then just apply for a new one'}{' '}
          {!sv && (
            <MKTypography
              variant='body2'
              component={Link}
              to='/forgot-pass'
              color='info'
              fontWeight='medium'
              textGradient
              style={{ textDecorationLine: 'underline' }}
              sx={{ cursor: 'pointer' }}
            >
              here.
            </MKTypography>
          )}
          <br /> <br />
          {sv
            ? 'Vi uppskattar all positiv och negativ återkoppling om vårt program. Vi tar gärna emot kommentarer på '
            : 'We appreciate all your feedback. Please reach out to us via '}
          <MKTypography
            variant='body2'
            component='a'
            href={'https://discord.gg/YhwRDgtSX2'}
            color='info'
            fontWeight='medium'
            textGradient
            style={{ textDecorationLine: 'underline' }}
            sx={{ cursor: 'pointer' }}
          >
            Discord
          </MKTypography>{' '}
          {sv ? 'eller' : 'or'}{' '}
          <MKTypography
            variant='body2'
            component='a'
            href={'mailto: info@bridgestars.net'}
            color='info'
            fontWeight='medium'
            textGradient
            style={{ textDecorationLine: 'underline' }}
            sx={{ cursor: 'pointer' }}
          >
            email
          </MKTypography>{' '}
          {sv
            ? 'om du stöter på några problem. Du är också välkommen att föreslå nya funktioner.'
            : 'if you encounter any problems with the app. You are also welcome to submit requests for new features.'}
          <br /> <br />
          {sv
            ? 'Programmet kräver som mest 1 GB utrymme.'
            : 'The app will require at most 1 GB of disk space. Make sure to have some space left on your computer.'}
          <br /> <br />
          {sv
            ? ''
            : ' The Windows installer may trigger Windows Smart Screen which may warn you about the application, there is nothing that can be done about this.'}
        </MKTypography>
      </MKBox>
    </>
  );
}

export default Information;
