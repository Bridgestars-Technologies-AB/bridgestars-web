import Card from "./Card";
import { Box } from "@mui/material";

const Hand = ({ cards, except, height=110, vertical=false, onClick, ddres }) => {
    const style = {
        display: "flex",
        justifyContent: "left",
        height: `${height}px`,
    }
    cards.sort((a, b) => b - a);
    return (
        <Box
            p="20px">
            {
                vertical ? 
                (
                    <div>
                        <div className="hand" style={style}>
                        {cards.filter(num => num > 38 && !except.includes(num)).map((card, index) => (
                            <Card ddres={ddres} onClick={onClick} key={index} id={card} scale={height/220} />
                        ))}
                        </div>
                        <div className="hand" style={style}>
                        {cards.filter(num => num > 25 && num < 39 && !except.includes(num)).map((card, index) => (
                            <Card ddres={ddres} onClick={onClick} key={index} id={card} scale={height/220} />
                        ))}
                        </div>
                        <div className="hand" style={style}>
                        {cards.filter(num => num > 12 && num < 26 && !except.includes(num)).map((card, index) => (
                            <Card ddres={ddres} onClick={onClick} key={index} id={card} scale={height/220} />
                        ))}
                        </div>
                        <div className="hand" style={style}>
                        {cards.filter(num => num < 13 && !except.includes(num)).map((card, index) => (
                            <Card ddres={ddres} onClick={onClick} key={index} id={card} scale={height/220} />
                        ))}
                        </div>
                    </div>
                    )
                    :
                    (
                    <div className="hand" style={style}>
                        {cards.filter(num => !except.includes(num)).map((card, index) => (
                            <Card ddres={ddres} onClick={onClick} key={index} id={card} scale={height/220} />
                        ))}
                    </div>
                )
            }
        </Box>
    );
}

export default Hand;