import { Box, ThemeProvider, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import Hand from "../../../components/Hand";
import Card from "../../../components/Card";
import Grid from '@mui/material/Grid';
import ContractSelector from "../../../components/ContractSelector";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useEffect, useState, useReducer } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import ClearIcon from '@mui/icons-material/Clear';
import { post, mockData, get } from "../../../utils/ddsapi";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BiddingBox from "../../../components/BiddingBox";
import Bidding from "../../../components/Bidding";

function holdingToCards(holding) {
    const result = [];
    const bin = holding.toString(2);
    for (let i = 0; i < bin.length; i++) {
        if (bin[i] === "1") {
            result.push(bin.length - i - 1);
        }
    }
    return result;
}

function cardsToHolding(cards) {
    let sum = 0;
    for (let card of cards) {
        sum += 2 ** card;
    }
    return sum;
}

function createCardsFromString(input) {
    const cards = "23456789TJQKA";
    let result = [];
    const sections = input.split('.');
    
    for(let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        for(let j = 0; j < section.length; j++) {
            const cardIndex = cards.indexOf(section[j]);
            
            if(cardIndex !== -1) {
                const cardId = cardIndex + 13 * (3 - i);
                // if (cardId in result) continue;
                result.push(cardId);
            }
        }
    }
    
    return result;
}

function createStringFromCards(cards) {
    cards.sort((a, b) => b - a);
    const cardsString = "23456789TJQKA";
    let result = "";
    const sections = [[], [], [], []];
    
    for(let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const section = Math.floor(card / 13);
        const cardIndex = card % 13;
        sections[section].push(cardsString[cardIndex]);
    }
    
    for(let i = 3; i >= 0; i--) {
        const section = sections[i];
        result += section.join('');
        if (i > 0) result += '.';
    }
    
    return result;
}

const initialState = {
    north: [],
    east: [],
    south: [],
    west: [],
    play: [],
    declarer: 0,
    rank: 1,
    suit: 0,
    ddres: [{holding: 0, tricks: 0}],
    mode: "edit",
};

function reducer(state, action) {
    switch(action.type) {
        case 'UNDO':
            if (state.play.length === 0) return state;
            let newState2 = {...state, play: state.play.slice(0, state.play.length - 1)};
            return newState2;
        case 'RESET':
            return initialState;
        case 'SET_MODE':
            return {...state, mode: action.payload};
        case 'SET_NORTH':
            return {...state, north: action.payload};
        case 'SET_EAST':
            return {...state, east: action.payload};
        case 'SET_SOUTH':
            return {...state, south: action.payload};
        case 'SET_WEST':
            return {...state, west: action.payload};
        case 'SET_DDS':
            return {...state, ddres: action.payload};
        case 'SET_RANK':
            return {...state, rank: action.payload};
        case 'SET_SUIT':
            return {...state, suit: action.payload};
        case 'SET_DECLARER':
            return {...state, declarer: action.payload};
        case 'PLAY_CARD':
            return {...state, play: [...state.play, action.payload.card]};
        default:
            throw new Error();
    }
}

const BridgeEditor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [state, dispatch] = useReducer(reducer, initialState);

    const [northCard, setNorthCard] = useState(-1);
    const [eastCard, setEastCard] = useState(-1);
    const [southCard, setSouthCard] = useState(-1);
    const [westCard, setWestCard] = useState(-1);

    const [playerOnTurn, setPlayerOnTurn] = useState(0);

    const [nstricks, setNStricks] = useState(0);
    const [ewtricks, setEWTricks] = useState(0);

    useEffect(() => {
        setPlayerOnTurn((state.declarer + 1) % 4);
    }, [state.declarer])

    useEffect(() => {
        clearTrick();
        updateTricksWon();
        let numCards = state.play.length % 4;
        numCards = numCards === 0 && state.play.length > 0 ? 4 : numCards;
        let listOfLastCards = state.play.slice(-numCards);
        for (let card of listOfLastCards) {
            // set card to be displayed based on who has the card in the state
            if (state.north.includes(card)) setNorthCard(card);
            else if (state.east.includes(card)) setEastCard(card);
            else if (state.south.includes(card)) setSouthCard(card);
            else if (state.west.includes(card)) setWestCard(card);
        }
        if (state.play.length % 4 !== 0) {
            let last = state.play[state.play.length - 1];
            if (state.north.includes(last)) setPlayerOnTurn(1);
            else if (state.east.includes(last)) setPlayerOnTurn(2);
            else if (state.south.includes(last)) setPlayerOnTurn(3);
            else if (state.west.includes(last)) setPlayerOnTurn(0);
        }
        else {
            if (state.play.length === 0) setPlayerOnTurn((state.declarer + 1) % 4);
            else {
                let winner = evalTrick(state.play.slice(-4));
                if (playerOnTurn !== winner) {
                    setPlayerOnTurn(winner);
                }
            } 
        }
    }, [state.play]);

    useEffect(() => {
        if (state.mode === 'edit') {
            dispatch({type: 'SET_DDS', payload: [{holding: 0, tricks: 0}]});
        } else if (state.mode === 'play') {
            dds();
        }
    }, [playerOnTurn, state.mode, nstricks, ewtricks]);

    function updateTricksWon() {
        let ns = 0;
        let ew = 0;
        for (let trick = 0; trick < Math.floor(state.play.length / 4); trick++) {
            let winner = evalTrick(state.play.slice(trick * 4, trick * 4 + 4));
            if (winner === 0 || winner === 2) {
                ns++;
            } else {
                ew++;
            }
        }
        setNStricks(ns);
        setEWTricks(ew);
    }

    function evalTrick(trick) {
        let first = trick[0];
        let winner = first;
        for (let card of trick) {
            if (Math.floor(card / 13) === state.suit) {
                if (Math.floor(winner / 13) !== state.suit) winner = card;
                else if (card > winner) winner = card;
            }
            else if (Math.floor(card / 13) === Math.floor(winner / 13) && card > winner) winner = card;
        }
        if (state.north.includes(winner)) {
            return 0;
        }
        else if (state.east.includes(winner)) {
            return 1;
        }
        else if (state.south.includes(winner)) {
            return 2;
        }
        else if (state.west.includes(winner)) {
            return 3;
        }
        return -1;
    }

    function onClick(cardId, player) {
        if (state.mode === "edit") return;
        if (player !== "NESW"[playerOnTurn]) return;
        dispatch({type: 'PLAY_CARD', payload: {card: cardId, player: player}});
    }

    function randomDeal() {
        clearDeal();
        const cards = [];
        for(let i = 0; i < 52; i++) {
            cards.push(i);
        }
        cards.sort(() => Math.random() - 0.5);
        dispatch({type: 'SET_NORTH', payload: cards.slice(0, 13)});
        dispatch({type: 'SET_EAST', payload: cards.slice(13, 26)});
        dispatch({type: 'SET_SOUTH', payload: cards.slice(26, 39)});
        dispatch({type: 'SET_WEST', payload: cards.slice(39, 52)});
    }

    function clearDeal() {
        dispatch({type: 'RESET'});
        setNorthCard(-1);
        setEastCard(-1);
        setSouthCard(-1);
        setWestCard(-1);
        setNStricks(0);
        setEWTricks(0);
    }

    function clearTrick() {
        setNorthCard(-1);
        setEastCard(-1);
        setSouthCard(-1);
        setWestCard(-1);
    }

    function undo() {
        dispatch({type: 'UNDO'});
    }

    function dds() {
        if (state.mode === "edit") return;
        let payload = getPayload();
        console.log(payload);
        post("dds/deal", payload)
        .then((data) => 
        { 
            data.results = data.results.map((res) => {
                let newTricks = res.tricks;
                let declarerTricks = state.declarer % 2 === 0 ? nstricks : ewtricks;
                let tricksLeft = 13 - nstricks - ewtricks;
                if (state.declarer % 2 === playerOnTurn % 2) newTricks = declarerTricks - state.rank - 6 + newTricks;
                else newTricks = tricksLeft + declarerTricks - newTricks - (state.rank + 6);
                return {
                    holding: res.holding,
                    tricks: newTricks,
                }
            });
            
            dispatch({type: 'SET_DDS', payload: data.results});
        })
        .catch((error) => { console.log(error) });

    }

    function getPayload() {
        
        return {
            deal: {
                "north": cardsToHolding(state.north),
                "east": cardsToHolding(state.east),
                "south": cardsToHolding(state.south),
                "west": cardsToHolding(state.west),
                "play": state.play.map((card) => cardsToHolding([card])),
            },
            "strain": state.suit,
            "leader": (state.declarer + 1) % 4,
        }
    }

    const onModeChange = (event, newMode) => {
        if (newMode === null) return;
        dispatch({type: 'SET_MODE', payload: newMode});
    };

    const onContractSelected = (rank, suit, declarer) => {
        dispatch({type: 'SET_RANK', payload: rank});
        dispatch({type: 'SET_SUIT', payload: "CDHSN".indexOf(suit)});
        dispatch({type: 'SET_DECLARER', payload: "NESW".indexOf(declarer)});
    };
    return (
        <Box display="flex" width="1400px">
            <Box 
                m="20px"
                backgroundColor={colors.greenAccent[700]}
                borderRadius="50px"
                width="700px"
                height="700px"
            >
                    <Grid container spacing={1}>
                        <Grid item xs={4}> 
                            <Box>
                                <IconButton disabled={state.mode === "play"} sx={{top:"20px", left:"20px"}} onClick={randomDeal}>
                                    <CachedIcon />
                                </IconButton>
                                <IconButton disabled={state.mode === "play"} sx={{top:"20px", left:"20px"}} onClick={clearDeal}>
                                    <ClearIcon />
                                </IconButton>
                                <IconButton disabled={state.mode === "edit"} sx={{top:"20px", left:"20px"}} onClick={dds}>
                                    <AccountTreeIcon />
                                </IconButton>
                                <IconButton disabled={state.mode === "edit"} sx={{top:"20px", left:"20px"}} onClick={undo}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Hand ddres={state.ddres} onClick={(id) => onClick(id, "N")} cards={state.north} except={state.play} height="48" vertical={true}/>
                        </Grid>
                        <Grid item xs={4}> 
                            <Box p="20px">
                                <Bidding sequence={[]}/>
                            </Box>
                        </Grid> 
                        <Grid item xs={4}>
                            <Hand ddres={state.ddres} onClick={(id) => onClick(id, "W")} cards={state.west} except={state.play} height="48" vertical={true}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Box border="1px solid white" width="60%" height="60%" m="20%" position="relative">
                                <Typography sx={{position:"absolute", top: 0, left: "50%", transform: `translateX(-50%)`}} variant="h3" fontWeight="bold" align="center" gutterBottom={true}>N</Typography>
                                <Typography sx={{position:"absolute", bottom: "-5%", left: "50%", transform: `translateX(-50%)`}} variant="h3" fontWeight="bold" align="center" gutterBottom={true}>S</Typography>
                                <Typography sx={{position:"absolute", top: "50%", left: "5%", transform: `translateY(-50%)`}}  variant="h3" fontWeight="bold" align="center" gutterBottom={true}>W</Typography>
                                <Typography sx={{position:"absolute", top: "50%", right: "5%", transform: `translateY(-50%)`}}  variant="h3" fontWeight="bold" align="center" gutterBottom={true}>E</Typography>
                                <Box sx={{position:"absolute", top: 0, left: "50%", transform: `translate(-50%, -50%)`}}><Card id={northCard} scale={`${60/220}`} /></Box>
                                <Box sx={{position:"absolute", bottom: "-5%", left: "50%", transform: `translate(-50%, 50%)`}}><Card id={southCard} scale={`${60/220}`} /></Box>
                                <Box sx={{position:"absolute", top: "50%", left: "5%", transform: `translate(-50%, -50%)`}}><Card id={westCard} scale={`${60/220}`} /></Box>
                                <Box sx={{position:"absolute", top: "50%", right: "5%", transform: `translate(50%, -50%)`}}><Card id={eastCard} scale={`${60/220}`} /></Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Hand ddres={state.ddres} onClick={(id) => onClick(id, "E")}  cards={state.east} except={state.play} height="48" vertical={true}/>
                        </Grid>
                        <Grid item xs={4}> 
                            <Box display="flex" justifyContent="center" alignItems="center" mt="150px">
                                <Typography variant="h4" fontWeight="bold" align="center">NS Tricks: {nstricks}</Typography>
                                <Typography variant="h4" fontWeight="bold" align="center">EW Tricks: {ewtricks}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Hand ddres={state.ddres} onClick={(id) => onClick(id, "S")}  cards={state.south} except={state.play} height="48" vertical={true}/>
                        </Grid>
                        <Grid item xs={4} />
                    </Grid>
            </Box>
            <Box
                mt="20px"
                mb="20px"
                mr="20px"
                p="20px"
                backgroundColor={colors.primary[400]}
                width="300px"
                borderRadius="20px"
                alignItems="center"
            >
                <Typography variant="h3" fontWeight="bold" align="center" gutterBottom={true}>Contract Selector</Typography>
                <ContractSelector includeDeclarer={true} disabled={state.mode === "play"} onButtonClicked={onContractSelected}/>
                <Box height="20px"></Box>
                <Divider variant="middle"/>
                <Box>
                    <ThemeProvider theme={theme}>
                        <Box height="10px"></Box>
                        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom={true}>Cards</Typography>
                        <TextField disabled={state.mode === "play"} value={createStringFromCards(state.north)} color="secondary" id="outlined-basic" label="North" variant="outlined" fullWidth={true} onChange={(event) => dispatch({type: 'SET_NORTH', payload: createCardsFromString(event.target.value.toUpperCase())})} />
                        <Box height="10px"></Box>
                        <TextField disabled={state.mode === "play"} value={createStringFromCards(state.east)} color="secondary" id="outlined-basic" label="East" variant="outlined" fullWidth={true}  onChange={(event) => dispatch({type: 'SET_EAST', payload: createCardsFromString(event.target.value.toUpperCase())})} />
                        <Box height="10px"></Box>
                        <TextField disabled={state.mode === "play"} value={createStringFromCards(state.south)} color="secondary" id="outlined-basic" label="South" variant="outlined" fullWidth={true}  onChange={(event) => dispatch({type: 'SET_SOUTH', payload: createCardsFromString(event.target.value.toUpperCase())})} />
                        <Box height="10px"></Box>
                        <TextField disabled={state.mode === "play"} value={createStringFromCards(state.west)} color="secondary" id="outlined-basic" label="West" variant="outlined" fullWidth={true}  onChange={(event) => dispatch({type: 'SET_WEST', payload: createCardsFromString(event.target.value.toUpperCase())})} />
                        <Box height="20px"></Box>
                    </ThemeProvider>
                </Box>
                <Divider variant="middle"/>
                <Box height="20px"></Box>
                <ToggleButtonGroup
                    fullWidth={true}
                    value={state.mode}
                    exclusive
                    onChange={onModeChange}
                    aria-label="mode selector"
                >
                    <ToggleButton value="edit" aria-label="edit mote">
                        <Typography variant="h3" fontWeight="bold">Edit</Typography>
                    </ToggleButton>
                    <ToggleButton value="play" aria-label="edit mode">
                        <Typography variant="h3" fontWeight="bold">Play</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
                
            </Box>
            
        </Box>
        
        
    )
}

export default BridgeEditor;    