// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

// Otis Kit PRO examples
import CenteredFooter from './CenteredFooter';
import MKBox from 'components/MKBox';
import DiscordLogo from 'assets/images/logos/discord.png';
import footerRoutes from 'constants/footer.routes';

function BridgestarsFooter(props) {
  const company = {
    href: '/404.html',
    name: 'Bridgestars Technologies AB',
  };
  const links = [
    {
      href: '/contact',
      name: 'Contact',
    },
    {
      href: '/faq',
      name: 'FAQ',
    },
    // {
    //   href: '/404.html',
    //   name: 'Download',
    // },
    {
      href: '/policy',
      name: 'Policy',
    },
  ];
  const socials = footerRoutes.socials;

  return (
    <CenteredFooter
      company={company}
      links={links}
      socials={socials}
      {...props}
    />
  );
}

export default BridgestarsFooter;
