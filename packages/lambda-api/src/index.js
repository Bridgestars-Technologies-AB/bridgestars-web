import { get_deals } from "./bsapi.js";
const DEAL_PAYLOAD_EXAMPLE = {
    generate: 10000,            // number of deals that the lambda is allowed to generate (caps workload)
    produce: 1,             // number of deals that the lambda should return at most
    constraints: {          // string constraints
        "1": "15-17 bal"    // direction 1 (North) has 15-17 bal
    }, 
    predeal: {
        north: 1            // north has the 2 of clubs
    }
}
// test
get_deals(DEAL_PAYLOAD_EXAMPLE)
    .then(data => console.log(data[0].bidding))
    .catch((error) => console.error('Error:', error));