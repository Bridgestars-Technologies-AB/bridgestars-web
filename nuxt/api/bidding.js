
const api_url = 'https://3k2kxikcqokkqc2trgxketmnda0dfhpj.lambda-url.eu-north-1.on.aws/'

const getRandomDeals = async (count) => {
    return fetch('https://3k2kxikcqokkqc2trgxketmnda0dfhpj.lambda-url.eu-north-1.on.aws/deal/random/' + count + "?verbose=true");
} 

const getDeals = async (payload) => {
    return fetch('https://3k2kxikcqokkqc2trgxketmnda0dfhpj.lambda-url.eu-north-1.on.aws/deal?verbose=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
}

const payload = {
    generate: "1000000", 
    produce: "10", 
    constraints: {
        "1": "15-17 bal", 
        "4": "10+ hcp"
    }
}

const _1N_P_2N = {
  generate: "1000000",
  produce: "10",
  constraints: {
      "1": "15-17 bal",
      "4": "3- spades 3- hearts 9 hcp",
  }
}
  

getDeals(_1N_P_2N)
  .then(response => response.json()) // assuming that the response is JSON
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));



