// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

// Otis Kit PRO examples
import CenteredFooter from 'examples/Footers/CenteredFooter';

function BridgestarsFooter() {
  const company = {
    href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    name: 'Bridgestars Technologies AB',
  };
  const links = [
    {
      href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
      name: 'Contact',
    },
    {
      href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
      name: 'FAQ',
    },
    {
      href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
      name: 'Download',
    },
    {
      href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
      name: 'Policy',
    },
  ];
  const socials = [
    {
      icon: <FacebookIcon fontSize='small' />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
    // {
    //   icon: <TwitterIcon fontSize='small' />,
    //   link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    // },
    // {
    //   icon: <InstagramIcon fontSize='small' />,
    //   link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    // },
    {
      icon: <MailRoundedIcon fontSize='small' />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
    {
      icon: <GitHubIcon fontSize='small' />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
  ];

  return <CenteredFooter company={company} links={links} socials={socials} />;
}

export default BridgestarsFooter;
