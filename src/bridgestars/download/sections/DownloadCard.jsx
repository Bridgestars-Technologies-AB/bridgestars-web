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
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
// Otis Kit PRO components
import MKBox from 'otis/MKBox';
import MKButton from 'otis/MKButton';
import MKTypography from 'otis/MKTypography';
import { useSnackbar } from 'notistack';

function DownloadCard({ sv, title, description, link, size, ...rest }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <Grid container item xs={12} lg={10} xl={8} xxl={8} mx={'auto'} {...rest}>
      <Card sx={{ width: '100%' }}>
        <Grid container alignItems='center'>
          <Grid item xs={12} lg={8}>
            <MKBox pt={1.5} px={4}>
              <MKTypography variant='h3' mb={1}>
                {title}
              </MKTypography>
              <MKTypography variant='body2' color='text' fontWeight='regular'>
                {description}
              </MKTypography>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MKBox pb={3} textAlign='center'>
              <MKTypography variant='h6' mt={{ xs: 0, sm: 3 }}></MKTypography>
              <MKTypography variant='h2'>{sv ? 'Gratis' : 'Free'}</MKTypography>
              <MKButton
                variant='gradient'
                component='a'
                href={link}
                onClick={() => {
                  enqueueSnackbar(
                    sv
                      ? 'Nedladdningen har påbörjats. Alldeles strax ska Bridgestars dyka upp bland dina nedladdningar.'
                      : 'Download has started, give us a minute to download Bridgestars.',
                    { variant: 'success' }
                  );
                }}
                color='error'
                size='large'
                sx={{ my: 1 }}
              >
                {sv ? 'Ladda Ner' : 'Download'}
              </MKButton>
              <MKTypography
                display='block'
                variant='button'
                color='text'
                fontWeight='regular'
              >
                {sv ? 'Storlek' : 'Download size'} ({size})
              </MKTypography>
            </MKBox>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

function DownloadCardWindows({ sv }) {
  return (
    <DownloadCard
      sv={sv}
      mb={2}
      title={
        sv ? 'Installerare till Windows (.exe)' : 'Windows Installer (.exe)'
      }
      size={'47 MB'}
      link={
        'https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/Bridgestars_installer.exe'
        // 'https://drive.google.com/u/1/uc?id=10arbRMdKwd8ZDLxr0qsx_umT32RStdW-&export=download&confirm=t'
      }
      description={
        sv
          ? 'Detta är en installerare till Windows, den hjälper dig att installera allt på ett korrekt sätt.'
          : 'This is an installer for Windows, it will make sure that everything is installed correctly and add a shortcut to your desktop.'
      }
    />
  );
}
function DownloadCardMacInstaller({ sv }) {
  return (
    <DownloadCard
      sv={sv}
      mb={2}
      title={sv ? 'Installerare till Mac OS (.pkg)' : 'Mac OS Installer (.pkg)'}
      size={'36 MB'}
      link={
        'https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/Bridgestars+Installer.pkg'
        // 'https://drive.google.com/u/0/uc?id=1oHFbxVL6RGKOkRuChhvDckS_wIZ5s503&export=download&confirm=t'
      }
      description={
        sv
          ? 'Detta är en installerare till Mac OS (Apple), den hjälper dig att installera allt på ett korrekt sätt.'
          : 'This is an installer for Mac OS, it will make sure that the application makes it to your application folder and will ask if you want an shortcut on your desktop.'
      }
    />
  );
}
function DownloadCardMacRaw({ sv }) {
  return (
    <DownloadCard
      sv={sv}
      title={sv ? 'Fristående app till Mac OS (.app)' : 'Mac OS Raw (.app)'}
      size={'36 MB'}
      link={
        'https://bridgestars-static-host.s3.eu-north-1.amazonaws.com/Bridgestars+For+Mac.zip'
        // 'https://drive.google.com/u/0/uc?id=1Sic22mCxGTW6ygcWojL4WZcZ3PANi8Qc&export=download&confirm=t'
      }
      description={
        sv
          ? 'Detta är den fristående appen, den kommer inte att installera sig själv men går att starta direkt från dina nedladdningar.'
          : 'This download does only contain the application package, the application will be runnable directly from the downloads folder. We recommend that you put it in the Applications folder.'
      }
    />
  );
}

export {
  DownloadCard,
  DownloadCardWindows,
  DownloadCardMacRaw,
  DownloadCardMacInstaller,
};
