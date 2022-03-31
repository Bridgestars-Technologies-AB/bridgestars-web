// @mui material components
import MKBox from 'components/MKBox';
import footerRoutes from 'constants/footer.routes';
import { Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import MKTypography from 'components/MKTypography';
import { Icon } from '@mui/material';
//bridgestars
import BridgestarsFooter from '../../footer/BridgestarsFooter';
import BridgestarsNavbar from '../../navbar/index';
import routes from 'constants/routes';

//pages
import Policies from './Policies';

export default function Policy() {
  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <MKBox mt={3}>
        <BridgestarsNavbar
          routes={routes.filter((r) => r.name != 'Policy')}
          action={{
            type: 'internal',
            route: '/signin',
            label: 'sign in',
            color: 'primary',
          }}
          relative
          floating
        />
      </MKBox>
      <Policies />
      <Grid container xs={12} mt={6} justifyContent='center'>
        <IconButton variant='outlined' color='dark' onClick={ScrollTop}>
          <MKTypography fontSize={24}>
            {
              <Icon sx={{ transform: 'scale(2)', width: '100%' }}>
                arrow_upward
              </Icon>
            }
            <br />
            to top
          </MKTypography>
        </IconButton>
      </Grid>
      <MKBox pt={2} px={1} mt={2}>
        <BridgestarsFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}
