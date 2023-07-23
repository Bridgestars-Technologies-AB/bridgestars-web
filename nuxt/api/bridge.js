export const RANKS = "23456789TJQKA";
export const SUITS = "CDHSN";


export function getString(holding) {
    let str = "";
    for (let i = 0; i < 52; i++) {
        if (holding & (1 << i)) {
            str += RANKS[i % 13];
        }
        if (i % 13 === 12 && i < 51) {
            str += ".";
        }
    }
    return str;
}