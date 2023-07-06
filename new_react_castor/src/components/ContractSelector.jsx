import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const SuitSymbols = ({suit, setSuit, disabled}) => {

  const onChange = (event, newSuit) => {
    if (newSuit === null) return;
    setSuit(newSuit);
  };

  return (
    <ToggleButtonGroup disabled={disabled}
        fullWidth={true}
        value={suit}
        exclusive
        onChange={onChange}
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
  );
}

const Ranks = ({rank, setRank, disabled}) => {
    const onChange = (event, newRank) => {
        if (newRank === null) return;
        setRank(newRank);
    };
  
    return (
      <ToggleButtonGroup disabled={disabled}
        fullWidth={true}
        value={rank}
        exclusive
        onChange={onChange}
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
    );
  }

const Declarer = ({ declarer, setDeclarer, disabled, visible = true }) => {
    const onChange = (event, newDeclarer) => {
        if (newDeclarer === null) return;
        setDeclarer(newDeclarer);
    };
  
    return (
      !visible ? <div></div> :
      <ToggleButtonGroup disabled={disabled}
        fullWidth={true}
        value={declarer}
        exclusive
        onChange={onChange}
        aria-label="declarer selector"
      >
        <ToggleButton value="N" aria-label="left aligned">
          <Typography width="41px" variant="h3" fontWeight="bold">N</Typography>
        </ToggleButton>
        <ToggleButton value="E" aria-label="left aligned">
          <Typography width="41px" variant="h3" fontWeight="bold">E</Typography>
        </ToggleButton>
        <ToggleButton value="S" aria-label="left aligned">
          <Typography width="41px" variant="h3" fontWeight="bold">S</Typography>
        </ToggleButton>
        <ToggleButton value="W" aria-label="left aligned">
          <Typography width="41px" variant="h3" fontWeight="bold">W</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    );
}

const ContractSelector = ({ onButtonClicked, disabled, includeDeclarer = true, sx }) => {
    const [rank, setRank] = useState(1);
    const [suit, setSuit] = useState('C');
    const [declarer, setDeclarer] = useState('N');

    useEffect(() => {
        try {
          onButtonClicked(rank, suit, declarer);
        }
        catch {}
    }, [rank, suit, declarer])
    return (
        <Box sx={sx}>
            <Ranks disabled={disabled} rank={rank} setRank={setRank}/>
            <SuitSymbols disabled={disabled} suit={suit} setSuit={setSuit}/>
            <Declarer visible={includeDeclarer} disabled={disabled} declarer={declarer} setDeclarer={setDeclarer}/>
        </Box>
    )
}

export default ContractSelector;