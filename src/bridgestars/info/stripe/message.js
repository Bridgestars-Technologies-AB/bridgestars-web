import React from 'react'
import { Box, Container, Grid, Typography, Card } from '@mui/material'
import MKBox from 'otis/MKBox';
import Button from 'otis/MKButton';
import { Link } from 'react-router-dom';

import BridgestarsFooter from '../../components/footer/BridgestarsFooter';

export default function drawMessage({ title, description, description2, image }) {
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: { xs: '0px', sm: '20px' },
                //Center horizontally and vertically
                height: { xs: '60%', sm: '60%', xl: '60%' },
                width: { xs: '100%', sm: '80%', xl: '50%' },
                margin: 'auto',
                textAlign: 'center',
                justifyContent: 'center',

            }}>
                <Card sx={{ p: '30px' }}>
                    <Grid container item alignItems='center' flexDirection='column'>
                        <MKBox
                            my={3}
                            component='img'
                            src={image}
                            width={{ xs: '70%', sm: '60%', xl: '50%' }}
                            // height='20%'
                        ></MKBox>
                    </Grid>
                    <Box>
                        <Typography variant="h1">{title}</Typography>
                    </Box>
                    <Box pt='20px'>
                        <Typography variant="text">{description}</Typography>
                        <br />
                        {/* <br /> */}
                        <Typography variant="text">{description2}</Typography>
                    </Box>
                    <Button 
                    
                component={Link}
                to='/'
                    variant='gradient' color='info' size='large' sx={{ width: 'wrap-content', mx: 'auto', mt: '15px' }}>Return to bridgestars.net</Button>
                </Card>
            </Box>
            <Box px='5px'>
                <BridgestarsFooter />
            </Box>
        </>
    )
}