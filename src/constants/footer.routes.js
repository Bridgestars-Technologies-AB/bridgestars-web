// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Otis Kit PRO components
import MKTypography from 'otis/MKTypography';

// Images
import logoCT from 'assets/images/bridgestars/logo-trans-256px.png';

import Icon from '@mui/material/Icon';
import MKBox from 'otis/MKBox';

import facebook from 'assets/images/logos/gray-logos/facebook-brands.svg';
import discord from 'assets/images/logos/gray-logos/discord-brands.svg';
import insta from 'assets/images/logos/gray-logos/instagram-brands.svg';

const date = new Date().getFullYear();

const socials = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/BridgestarsTechnologies',
    // icon: <i className='fab fa-facebook' />,
    icon: (
      <MKBox component='img' src={facebook} width='20px' height='20x'></MKBox>
    ),
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/bridgestars/',
    icon: <MKBox component='img' src={insta} width='20px' height='20x'></MKBox>,
  },
  {
    name: 'Discord',
    link: 'https://discord.gg/YhwRDgtSX2',
    icon: (
      <MKBox component='img' src={discord} width='20px' height='20x'></MKBox>
    ),
  },
  {
    name: 'Mail',
    link: 'mailto: info@bridgestars.net',
    icon: <Icon  sx={{color:'#42424a'}}>email</Icon>,
  },
];

export default {
  brand: {
    name: 'Bridgestars Technologies Sweden AB',
    image: logoCT,
    route: '/',
  },
  socials: socials,
  links: [
    // {
    //   href: '/contact',
    //   name: 'Contact',
    // },
    {
      href: '/wip',
      name: 'FAQ',
    },
    {
      href: '/about',
      name: 'About',
    },
    {
      href: '/policy',
      name: 'Policy',
    },
  ],
  copyright: (
    <MKTypography variant='button' fontWeight='regular'>
      Copyright &copy; {date} Bridgestars by Bridgestars Technologies Sweden AB.
      All rights reserved.
    </MKTypography>
  ),
};

/*
export default {
  brand: {
    name: 'Otis Kit PRO',
    image: logoCT,
    route: '/',
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
    {
      icon: <TwitterIcon />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
    {
      icon: <GitHubIcon />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
    {
      icon: <YouTubeIcon />,
      link: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
    },
  ],
  menus: [
    {
      name: 'company',
      items: [
        {
          name: 'about us',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'freebies',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'premium tools',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'blog',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
      ],
    },
    {
      name: 'resources',
      items: [
        {
          name: 'illustrations',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'bits & snippets',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'affiliate program',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
      ],
    },
    {
      name: 'help & support',
      items: [
        {
          name: 'contact us',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'knowledge center',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'custom development',
          href: 'https://services.creative-tim.com/',
        },
        {
          name: 'sponsorships',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
      ],
    },
    {
      name: 'legal',
      items: [
        {
          name: 'terms & conditions',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'privacy policy',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
        {
          name: 'licenses (EULA)',
          href: 'https://material-ui.com/store/items/otis-kit-pro-material-kit-react/',
        },
      ],
    },
  ],
  copyright: (
    <MKTypography variant='button' fontWeight='regular'>
      All rights reserved. Copyright &copy; {date} Otis Kit by{' '}
      <MKTypography
        component='a'
        href='https://material-ui.com/store/items/otis-kit-pro-material-kit-react/'
        target='_blank'
        rel='noreferrer'
        variant='button'
        fontWeight='regular'
      >
        Creative Tim
      </MKTypography>
      .
    </MKTypography>
  ),
};
*/
