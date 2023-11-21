# Backend server 
## Dashboard
Running the server will print instructions for connecting to the dashboard. 
The production dashboard is available at https://bridgestars-backend.fly.dev/dash/login. Ask me for credentials (theolundqvist).


## How to use

### install
```
pnpm install
```


### run server locally (connects to test db)
```
pnpm start 
```
or
```
pnpm docker
```

### run tests
1. start local server
2. `pnpm test`




## deploy server to production (needs fly.io credentials)
```
pnpm deploy:prod
```


