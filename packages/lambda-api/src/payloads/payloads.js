function get_holding_by_binary_index(index) {
    return 1 << index;
}

function bid_from_string(bid) {
    bid = bid.toUpperCase();
    if (bid === "P") return 0;
    if (bid === "D") return 1;
    if (bid === "R") return 2;
    try {
        return (parseInt(bid[0], 10) - 1) * 5 + "CDHSN".indexOf(bid[1]);
    } catch {
        throw new Error("invalid bid input");
    }
}

function holding_from_string(val) {
    const ranks = "23456789TJQKA";
    const parts = val.split('.');
    
    if (parts.length !== 4) {
        return 0;
    }
    
    let holding = 0;
    for (let i = 0; i < 4; i++) {
        for (const c of parts[i]) {
            const index = ranks.indexOf(c);
            
            if (index === -1) {
                continue;
            }
            
            holding |= get_holding_by_binary_index((3 - i) * 13 + index);
        }
    }
    
    return holding;
}

export function get_deal_payload(gen, prod, north, east, south, west, predeal) {
    const [pn, pe, ps, pw] = predeal.split(' ');
    return {
        generate: gen,
        produce: prod,
        constraints: {
            "1": north,
            "2": east,
            "4": south,
            "8": west,
        },
        predeal: {
            north: holding_from_string(pn),
            east: holding_from_string(pe),
            south: holding_from_string(ps),
            west: holding_from_string(pw),
        },
    };
}