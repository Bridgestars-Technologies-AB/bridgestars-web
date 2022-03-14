// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

// Otis Kit PRO examples
import CenteredFooter from 'examples/Footers/CenteredFooter';
import MKBox from 'components/MKBox';
import DiscordLogo from 'assets/images/logos/discord.png';

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
  const socials = [
    {
      icon: <FacebookIcon fontSize='small' />,
      link: '/404.html',
    },
    // {
    //   icon: <TwitterIcon fontSize='small' />,
    //   link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    // },
    {
      icon: <i className='fab fa-discord' />,
      link: 'https://discord.gg/YhwRDgtSX2',
    },
    {
      icon: <MailRoundedIcon fontSize='small' />,
      link: 'mailto: bridgestarstechnologies@gmail.com',
    },
  ];

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
