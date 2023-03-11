// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

// Otis Kit PRO examples
import CenteredFooter from './CenteredFooter';
import MKBox from 'otis/MKBox';
import DiscordLogo from 'assets/images/logos/discord.png';
import footerRoutes from 'constants/footer.routes';

function BridgestarsFooter(props) {
  const company = footerRoutes.company;
  const links = footerRoutes.links;
  const socials = footerRoutes.socials;

  return (
    <CenteredFooter
      company={company}
      links={links}
      socials={socials}
      copyright={footerRoutes.copyright}
      {...props}
    />
  );
}

export default BridgestarsFooter;
