const api_url = 'https://3k2kxikcqokkqc2trgxketmnda0dfhpj.lambda-url.eu-north-1.on.aws/'

export const mockData = {
    deal: {
        dealNumber: 1, 
        north: 1, 
        east: 2, 
        south: 4, 
        west: 8,
    },
    strain: 4, 
    leader: 0,
}

export const post = async (endpoint, data) =>  {
    try {
        const response = await fetch(api_url + endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.type === 'opaque') {
            // We can't read the response data or status
            console.log('Received an opaque response. Cannot read data or status.');
            return;
        }

        return response.json();
    } catch (err) {
        console.error('Fetch failed:', err);
    }
};

export const get = async (endpoint) =>  {
    try {
        const response = await fetch(api_url + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.type === 'opaque') {
            // We can't read the response data or status
            console.log('Received an opaque response. Cannot read data or status.');
            return;
        }

        return response.json();
    } catch (err) {
        console.error('Fetch failed:', err);
    }
};
