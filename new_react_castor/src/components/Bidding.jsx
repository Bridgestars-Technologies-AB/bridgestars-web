import { Box, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ClubIcon, HeartIcon, DiamondIcon, SpadeIcon } from "../utils/icons";
const Bid = ({bid}) => {
    return (
        <Box display="flex">
            <img src={`../../assets/Bids/${bid.bid}.png`}/>
        </Box>
    )
}

const Bidding = (data) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gridAutoRows="5px"
        gap="5px"
        border="1px solid white"
        borderRadius="20px"
        justifyItems="center"
        p="10px"
        width="200px"
        >
            <Box gridRow="span 1" width="40px" display="flex" justifyContent="center" alignItems="center" colors={colors.grey[100]}>
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                N
                </Typography>
            </Box>
            <Box gridRow="span 1" width="40px" display="flex" justifyContent="center" alignItems="center" colors={colors.grey[100]}>
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                E
                </Typography>
            </Box>
            <Box gridRow="span 1" width="40px" display="flex" justifyContent="center" alignItems="center" colors={colors.grey[100]}>
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                S
                </Typography>
            </Box>
            <Box gridRow="span 1" width="40px" display="flex" justifyContent="center" alignItems="center" colors={colors.grey[100]}>
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                W
                </Typography>
            </Box>
            <Box gridRow="span 1" gridColumn="span 4"  width="100%">
                <Divider color={colors.grey[700]} bottom="10px" variant="middle" sx={{my: 1}}/>
            </Box>
            <Box 
            gridColumn="span 4" 
            gridRow="span 15" 
            overflow="auto"
            display="grid"
            gridTemplateColumns="repeat(4, 1fr)"
            justifyItems="center"
            gridAutoRows="30px"
            gap="5px"
            width="100%"
            pt="10px"
            >
                {data.sequence.map((bid, i) => (
                    <Bid bid={bid}/>
                ))}
            </Box>

        
        </Box>
    )
}

export default Bidding;