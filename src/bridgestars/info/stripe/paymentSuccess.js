import React from 'react'
import { Box, Button, Container, Grid, Typography, Card } from '@mui/material'
import MKBox from 'otis/MKBox';

import image from 'assets/images/bridgestars/about_us.svg';
import BridgestarsFooter from '../../components/footer/BridgestarsFooter';
import Message from './message'

export default function paymentSuccess() {
    return (
        <Message
                        title='Thank you for choosing Bridgestars!'
                        description='Your payment has been received and processed. 
                        You can now safely return to the Bridgestars App.'
                        image={image}
        />
    )
}