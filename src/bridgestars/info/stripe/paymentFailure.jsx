import React from 'react'
import { Box, Button, Container, Grid, Typography, Card } from '@mui/material'
import MKBox from 'otis/MKBox';

import image from 'assets/images/bridgestars/about_us.svg';
import BridgestarsFooter from '../../components/footer/BridgestarsFooter';
import Message from './message'

export default function draw() {
    return (
        <Message
                        title='Ops something went wrong!'
                        description='If this issue persists, please contact us via any of the methods in the bottom of the page.'
                        image={image}
        />
    )
}