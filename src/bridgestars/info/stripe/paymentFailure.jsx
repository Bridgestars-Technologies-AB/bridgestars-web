import { React, useState } from 'react';
import { Box, Button, Container, Grid, Typography, Card } from '@mui/material';
import MKBox from 'otis/MKBox';

import image from 'assets/images/bridgestars/about_us.svg';
import BridgestarsFooter from '../../components/footer/BridgestarsFooter';
import Message from './message';

export default function draw() {
    const [lang, setLang] = useState(
        navigator.language || navigator.userLanguage
    );
    const sv = lang.includes('sv');
    return (
        <Message
            title={sv ? 'Oj, något gick fel!' : 'Ops something went wrong!'}
            description={
                sv
                    ? 'Om felet kvarstår, vänligen kontakta oss via någon av metoderna nedan.'
                    : 'If this issue persists, please contact us via any of the methods at the bottom of the page.'
            }
            image={image}
        />
    );
}
