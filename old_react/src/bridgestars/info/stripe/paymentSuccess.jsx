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
            title={sv ? 'Välkommen!' : 'Welcome!'}
            description={
                sv
                    ? 'Din betalning har mottagits och hanterats. Du kan nu stänga denna hemsidan och återvända till Bridgestars Appen.'
                    : 'Your payment has been received and processed. You can now safely close this page and return to the Bridgestars App.'
            }
            image={image}
        />
    );
}
