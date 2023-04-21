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
            //Back from stripe, now go back to game or go to home page
            title={
                sv
                    ? 'Dags att gå tillbaka till spelet?'
                    : 'Time to go back to the game?'
            }
            description={
                sv
                    ? 'Annars kan du besöka vår hemsida genom att trycka på en av länkarna nedan.'
                    : 'Otherwise, head over to the home page by clicking the the link below.'
            }
            image={image}
        />
    );
}
