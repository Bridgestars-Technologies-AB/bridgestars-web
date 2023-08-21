// 1NT openings
const _1N_P = {
    generate: "1000000", 
    produce: "10", 
    constraints: {
        "1": "15-17 bal", 
        "4": "3- spades 3- hearts 8- hcp"
    }
}

const _1N_2N = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "15-17 bal",
        "4": "3- spades 3- hearts 9 hcp",
    }
}

const _1N_3N = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "15-17 bal",
        "4": "3- spades 3- hearts 10-15 hcp",
    }
}

const _1N_6N = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "15-17 bal",
        "4": "3- spades 3- hearts 18-19 hcp",
    }
}

// 1 suit openings with raises
const _1C_2C = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 4- hearts 4- spades 3- diamonds 3+ clubs or longest clubs",
        "4": "3- spades 3- hearts 5+ clubs 4- diamonds 6-10 hcp",
    }
}

const _1C_3C = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 4- hearts 4- spades 3- diamonds 3+ clubs or longest clubs",
        "4": "3- spades 3- hearts 5+ clubs 4- diamonds 11-12 hcp",
    }
}

const _1D_2D = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 4- hearts 4- spades 4+ diamonds 4- clubs or longest diamonds",
        "4": "3- spades 3- hearts 5+ diamonds 4- clubs 6-10 hcp",
    }
}

const _1D_3D = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 4- hearts 4- spades 4+ diamonds 4- clubs or longest diamonds",
        "4": "3- spades 3- hearts 5+ diamonds 4- clubs 11-12 hcp",
    }
}

const _1H_2H = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 5+ hearts 3- spades 4- diamonds 4- clubs",
        "4": "3- spades 3+ hearts 5- clubs 5- diamonds 6-10 sph",
    }
}

const _1H_3H = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 5+ hearts 3- spades 4- diamonds 4- clubs",
        "4": "3- spades 3+ hearts 5- clubs 5- diamonds 11-12 sph",
    }
}

const _1S_2S = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 5+ spades 3- hearts 4- diamonds 4- clubs",
        "4": "3+ spades 3- hearts 5- clubs 5- diamonds 6-10 sps",
    }
}

const _1S_3S = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 5+ spades 3- hearts 4- diamonds 4- clubs",
        "4": "3+ spades 3- hearts 5- clubs 5- diamonds 11-12 sps",
    }
}

// 1 suit openings with new suit
const _1C_1D = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 4- hearts 4- spades 3- diamonds 3+ clubs or longest clubs",
        "4": "3- spades 3- hearts 4- clubs 4+ diamonds 6+ hcp",
    }
}

const _1C_1H = {
    generate: "1000000",
    produce: "10",
    constraints: {
        "1": "12-21 hcp and 4- hearts 4- spades 3- diamonds 3+ clubs or longest clubs",
        "4": "3- spades 4+ hearts 4- clubs 4- diamonds 6+ hcp",
    }
}