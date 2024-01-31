import axios from 'axios';

const API_URL = 'https://3k2kxikcqokkqc2trgxketmnda0dfhpj.lambda-url.eu-north-1.on.aws/';

export async function get_random_deals(count) {
    const response = await axios.get(`${API_URL}deal/random/${count}`);
    return response.data;
}

export async function get_deals(payload, verbose = false) {
    const response = await axios.post(`${API_URL}deal/bidding?verbose=${verbose}`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}

export async function get_next_bid(payload, system) {
    const response = await axios.post(`${API_URL}bidding/${system}`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response;
}

export async function get_sequence(sequence, system) {
    const response = await axios.get(`${API_URL}bidding/sequence/${sequence}`);
    console.log(response.url);
    return response;
}
