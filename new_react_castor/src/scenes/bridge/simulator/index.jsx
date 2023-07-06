import { Box, Icon, ThemeProvider } from "@mui/material"
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DealDiagram from "../../../components/DealDiagram";
import Bidding from "../../../components/Bidding";
import { mockBiddingData } from "../../../data/mockData";

const Constraint = ({borderColor = "white"}) => {
    return (
        <Box border={`1px solid ${borderColor}`} borderRadius="10px" padding="5px 20px 5px 20px" margin="10px">
            <FormGroup row={true}>
                <FormControlLabel control={<Checkbox color="secondary" />} label="North" />
                <FormControlLabel control={<Checkbox color="secondary" />} label="East" />
                <FormControlLabel control={<Checkbox color="secondary" />} label="South" />
                <FormControlLabel control={<Checkbox color="secondary" />} label="West" />
                <TextField variant="standard" color="secondary" placeholder="Constraints..."></TextField>
                
            </FormGroup>
        </Box>
    )
}


const Simulator = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [constraints, setConstraints] = useState([]);
    const deal = {
        north: {
            spades: "AKQJ",
            hearts: "AKQJ",
            diamonds: "AKQJ",
            clubs: "AKQJ"
        }, 
        east: {
            spades: "AKQJ",
            hearts: "AKQJ",
            diamonds: "AKQJ",
            clubs: "AKQJ"
        },
        south: {
            spades: "AKQJ",
            hearts: "AKQJ",
            diamonds: "AKQJ",
            clubs: "AKQJ"
        },
        west: {
            spades: "AKQJ",
            hearts: "AKQJ",
            diamonds: "AKQJ",
            clubs: "AKQJ"
        }
    }
    return (
        <Box display="flex" flexDirection="column">
            <ThemeProvider theme={theme}>
                {
                    constraints
                }
                <FormGroup row={true} sx={{direction:"rtl", pr:"10px"}}>
                    <IconButton onClick={() => setConstraints([...constraints, <Constraint></Constraint>])}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => setConstraints(constraints.slice(0, constraints.length - 1))}>
                        <CloseIcon />
                    </IconButton>
                </FormGroup>
                <DealDiagram data={deal}>
                    
                </DealDiagram>
                <Bidding sequence={mockBiddingData}></Bidding>
            </ThemeProvider>
        </Box>
    )
}

export default Simulator;