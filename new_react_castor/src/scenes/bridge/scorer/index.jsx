import { Box, ThemeProvider, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import ContractSelector from "../../../components/ContractSelector";
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';

const ContractScorer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modifier, setModifier] = useState("P");
    const [rank, setRank] = useState(1);
    const [suit, setSuit] = useState("C");
    const [vul, setVul] = useState(false);
    const [tricks, setTricks] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        calculateScore();
    }, [modifier, rank, suit, vul, tricks]);

    function calculateScore() {
        let tricksNeeded = rank + 6;
        let overtricks = tricks - tricksNeeded;
        if (overtricks < 0) return undertricks(-overtricks);
        
        let baseScore = 0;
        switch (suit) {
            case "C":
                baseScore = 20 * rank;
                break;
            case "D":
                baseScore = 20 * rank;
                break;
            case "H":
                baseScore = 30 * rank;
                break;
            case "S":
                baseScore = 30 * rank;
                break;
            case "N":
                baseScore = 40 + 30 * (rank - 1);
        }
        if (modifier === "D") baseScore *= 2;
        if (modifier === "R") baseScore *= 4;
        let bonusScore = 50;
        if (modifier === "D") bonusScore *= 2;
        if (modifier === "R") bonusScore *= 3;
        if (baseScore >= 100) bonusScore += vul ? 450 : 250;
        if (rank === 6) bonusScore += vul ? 750 : 500;
        if (rank === 7) bonusScore += vul ? 1500 : 1000;
        
        let overtrickScore = 0;
        if (modifier === "P") {
            overtrickScore = overtricks * (suit === "C" || suit === "D" ? 20 : 30);
        }
        if (modifier === "D") {
            overtrickScore = overtricks * (vul ? 200 : 100);
        }
        if (modifier === "R") {
            overtrickScore = overtricks * (vul ? 400 : 200);
        }
        
        let score = baseScore + bonusScore + overtrickScore;
        setScore(score);
    }

    function undertricks(tricks) {
        switch (modifier) {
            case "P":
                setScore((vul ? -100 : -50) * tricks);
                break;
            case "D":
                setScore(vul ? -200 - 300 * (tricks - 1) : -100 - 200 * (Math.min(2, tricks - 1)) - 300 * (Math.max(0, tricks - 3)));
                break;
            case "R":
                setScore(2 * (vul ? -200 - 300 * (tricks - 1) : -100 - 200 * (Math.min(2, tricks - 1)) - 300 * (Math.max(0, tricks - 3))));
                break;
        }
    }

    function onModifierChanged(event, newModifier) {
        if (newModifier === null) return;
        setModifier(newModifier);
    }
    function onRankChanged(event, newRank) {
        if (newRank === null) return;
        setRank(newRank);
    }
    function onSuitChanged(event, newSuit) {
        if (newSuit === null) return;
        setSuit(newSuit);
    }

    function valuetext(value) {
        let overtricks = value - 6 - rank;
        if (overtricks < 0) return overtricks;
        if (overtricks === 0) return "=";
        if (overtricks > 0) return `+${overtricks}`;
    }

    return (
        <Box borderRadius="20px" backgroundColor={colors.primary[400]} width="400px" height="90vh" display="flex" justifyContent="center">
            <ThemeProvider theme={theme}>
            <Box p="20px">
                <ToggleButtonGroup
                    color="secondary"
                    fullWidth={true}
                    value={rank}
                    exclusive
                    onChange={onRankChanged}
                    aria-label="rank selector"
                >
                    <ToggleButton value={1} aria-label="left aligned">
                        <Typography variant="h3" fontWeight="bold">1</Typography>
                    </ToggleButton>
                    <ToggleButton value={2} aria-label="left aligned">
                        <Typography variant="h3" fontWeight="bold">2</Typography>
                    </ToggleButton>
                    <ToggleButton value={3} aria-label="left aligned">
                        <Typography variant="h3" fontWeight="bold">3</Typography>
                    </ToggleButton>
                        <ToggleButton value={4} aria-label="left aligned">
                    <Typography variant="h3" fontWeight="bold">4</Typography>
                        </ToggleButton>
                    <ToggleButton value={5} aria-label="left aligned">
                        <Typography variant="h3" fontWeight="bold">5</Typography>
                    </ToggleButton>
                    <ToggleButton value={6} aria-label="left aligned">
                        <Typography variant="h3" fontWeight="bold">6</Typography>
                    </ToggleButton>
                    <ToggleButton value={7} aria-label="left aligned">
                        <Typography variant="h3" fontWeight="bold">7</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup
                    color="secondary"
                    fullWidth={true}
                    value={suit}
                    exclusive
                    onChange={onSuitChanged}
                    aria-label="suit selector"
                >
                    <ToggleButton value="C">
                        <img width="27px" src="../assets/Suit Symbols/club.png"></img>
                    </ToggleButton>
                    <ToggleButton value="D">
                        <img width="27px" src="../assets/Suit Symbols/diamond.png"></img>
                    </ToggleButton>
                    <ToggleButton value="H">
                        <img width="27px" src="../assets/Suit Symbols/heart.png"></img>
                    </ToggleButton>
                    <ToggleButton value="S">
                        <img width="27px" src="../assets/Suit Symbols/spade.png"></img>
                    </ToggleButton>
                    <ToggleButton value="N">
                        <Typography variant="h3" fontWeight="bold">NT</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>

                <Divider variant="middle" sx={{my: 2}}/>

                <FormControl sx={{alignItems:"center"}} fullWidth={true} color="secondary">
                    <FormLabel id="demo-row-radio-buttons-group-label">Contract Modifier</FormLabel>
                    <RadioGroup 
                        defaultValue="P"
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={onModifierChanged}
                    >
                        <FormControlLabel value="P" control={<Radio color="secondary" />} label="Pass" />
                        <FormControlLabel value="D" control={<Radio color="secondary" />} label="Double" />
                        <FormControlLabel value="R" control={<Radio color="secondary" />} label="Redouble" />
                        
                    </RadioGroup>
                </FormControl>

                <Divider variant="middle" sx={{my: 2}}/>

                <FormControl sx={{alignItems:"center"}} fullWidth={true} color="secondary">
                    <FormLabel id="demo-row-radio-buttons-group-label">Vulnerability</FormLabel>
                    <RadioGroup 
                        defaultValue="nonvul"
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={event => setVul(event.target.value === "vul")}
                    >
                        <FormControlLabel value="nonvul" control={<Radio color="secondary" />} label="Not Vulnerable" />
                        <FormControlLabel value="vul" control={<Radio color="secondary" />} label="Vulnerable" />
                        
                    </RadioGroup>
                </FormControl>

                <Divider variant="middle" sx={{my: 2}}/>

                <FormControl sx={{alignItems:"center"}} fullWidth={true} color="secondary">
                    <FormLabel id="tricks-label">Tricks</FormLabel>
                    <Slider onChange={event => setTricks(event.target.value)} color="secondary" valueLabelDisplay="auto" defaultValue={0} step={1} marks min={0} max={13} />
                    <FormLabel id="tricks-value-label">{valuetext(tricks)}</FormLabel>
                
                </FormControl>
                <Divider variant="middle" sx={{my: 2}}/>

                <Box padding="20px" backgroundColor={colors.blueAccent[700]} borderRadius="25px">
                    <Typography color={colors.grey[100]} variant="h2" fontWeight="bold" align="center">Score: {score}</Typography>
                </Box>
            </Box>
            </ThemeProvider>


        </Box>
    );
}

export default ContractScorer;