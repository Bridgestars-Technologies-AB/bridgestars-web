import React from 'react'
import { Box, Button, Container, Grid, Typography, Card } from '@mui/material'
import MKBox from 'otis/MKBox';

import image from 'assets/images/bridgestars/about_us.svg';
import BridgestarsFooter from '../../components/footer/BridgestarsFooter';
import Message from './message'

export default function paymentSuccess() {
    return (
        <Message
                        //Back from stripe, now go back to game or go to home page
                        title='Time to go back to the game?'
                        description='Otherwise, head over to the home page by clicking the button below.'
                        image={image}
        />
    )
}