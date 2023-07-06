import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../utils/icons";

const HandDiagram = ({ data, sx }) => {
    return (
        <Box sx={sx}>
            <Typography variant="h4" fontWeight="bold"> <SpadeIcon sx={{width:"20px"}}/> {data.spades} </Typography>
            <Typography variant="h4" fontWeight="bold"> <HeartIcon sx={{width:"20px"}}/> {data.hearts} </Typography>
            <Typography variant="h4" fontWeight="bold"> <DiamondIcon sx={{width:"20px"}}/> {data.diamonds} </Typography>
            <Typography variant="h4" fontWeight="bold"> <ClubIcon sx={{width:"20px"}}/> {data.clubs} </Typography>
        </Box>
    )
};

const DealDiagram = ({ data, gridSize="100px" }) => {
    return (
        <Box 
        border="1px solid white"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gridTemplateRows="1fr 1fr 1fr"
        gap="10px 10px"
        width="350px"
        height="350px"
        margin="20px"
        padding="20px"
        >
            <Box width={gridSize} height={gridSize} border="1px solid white"/>
            <Box width={gridSize} height={gridSize}><HandDiagram sx={{border:"1px solid white"}} data={data.north}></HandDiagram></Box>
            <Box width={gridSize} height={gridSize}/>
            <Box width={gridSize} height={gridSize}><HandDiagram data={data.east}></HandDiagram></Box>
            <Box width={gridSize} height={gridSize}/>
            <Box width={gridSize} height={gridSize}><HandDiagram data={data.south}></HandDiagram></Box>
            <Box width={gridSize} height={gridSize}/>
            <Box width={gridSize} height={gridSize}><HandDiagram data={data.west}></HandDiagram></Box>
            <Box width={gridSize} height={gridSize}/>
        </Box>
    )
};

export default DealDiagram;
