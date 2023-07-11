import React from 'react';
import { Box, Typography } from '@mui/material';
function translateId(id) {
    id += 1;
    if (id % 13 === 0) id -= 13;
    if (id < 13) return id + 14;
    if (id < 26) return id + 15;
    if (id < 39) return id % 13;
    return id + 3;

}

function getSpritePosition(id) {
    id = translateId(id);
    return `${-16 - 200 * (id % 10)}px ${-16 - 250 * (Math.floor(id / 10))}px`;
}

function getSpriteAtlas(id) {
    return `url(../../assets/Decks/Deck0${id}.png)`;
}

const Card = ({ id, deckId = 1, scale, ddres = [{holding: 0, tricks: 0}], onClick }) => {
    const containerStyle = {
        visibility: id === -1 ? "hidden" : "visible",
        width: `${170 * scale}px`,
        height: `${220 * scale}px`,
        position: 'relative',
    }
    const cardStyle = {
        width: '170px',
        height: '220px',
        transform: `scale(${scale})`,
        backgroundImage: getSpriteAtlas(deckId),
        backgroundPosition: getSpritePosition(id), // Adjust these to select the correct sprite
        backgroundSize: 'auto', // This might need adjusting depending on your image's dimensions
        transformOrigin: "top left"
    };
    let showdd = false;
    for (let res of ddres) {
        let bin = res.holding.toString(2);
        if ((bin.length - id - 1) >= 0 && bin[bin.length - id - 1] === "1") {
            showdd = true;
            var ddtricks = res.tricks;
        }
    }
    const ddStyle = {
        visibility: showdd ? "visible" : "hidden",
        top:"-5px", 
        right: "-5px",
        position:"absolute", 
        backgroundColor: ddtricks >= 0 ? "green" : "red", 
        borderRadius:"20px", 
        width:`${120 * scale}px`, 
        height:`${120 * scale}20px`
    }

    return (
        <div style={containerStyle} onClick={(() => {try {onClick(id)} catch {}})}>
            <div style={cardStyle}></div>
            <div style={ddStyle}>
                <Typography variant="h5" fontWeight="bold" align="center">{ddtricks === 0 ? "=" : ddtricks > 0 ? "+" + ddtricks : ddtricks}</Typography>
            </div>
        </div>
    );
};

export default Card;
