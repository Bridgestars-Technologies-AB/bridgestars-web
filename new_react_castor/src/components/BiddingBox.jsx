import ContractSelector from "./ContractSelector";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { ThemeProvider } from "@mui/system";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Bidding from "./Bidding";

const BiddingBox = ({ onButtonClicked, visible = true}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rank, setRank] = useState(1);
    const [suit, setSuit] = useState("C");



    return ( !visible ? <div></div> :
        <ThemeProvider theme={theme}>
        <Box padding="20px" position="fixed" top="50%" left="50%" sx={{transform:"translate(-50%, -50%)"}}>
            <Box backgroundColor={colors.primary[400]} borderRadius="20px" p="20px">
                <ContractSelector sx={{width:"400px"}} onButtonClicked={(r, s, d) => {setRank(r); setSuit(s);}} includeDeclarer={false}/>
                <Divider variant="middle" sx={{my: 2}}/>
                <Button onClick={() => {try {onButtonClicked()} catch{}}} sx={{width:"100px", height:"40px", fontSize:"16px", fontWeight:"bold"}} color="secondary" variant="outlined">Bid</Button>
            </Box>
            <Bidding></Bidding>
        </Box>
        </ThemeProvider>
    );
}

export default BiddingBox;