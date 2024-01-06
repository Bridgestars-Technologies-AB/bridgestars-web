# Backend server 
## Dashboard
Running the server will print instructions for connecting to the dashboard. 
The production dashboard is available at https://bridgestars-demo-backend.fly.dev/dash/login. Ask me for credentials (theolundqvist).


## How to use

### install
```bash
pnpm install
```


### Run server
```bash
# Locally
pnpm start 

# Locally in docker container
pnpm docker
```

### Run tests
1. start local server
2. `pnpm test`




## deploy server to production (needs fly.io credentials)
```bash
pnpm deploy:prod
```


