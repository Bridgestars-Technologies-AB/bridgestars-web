# bridgestars-web

`apps/frontend` - the new website built with vue3 and nuxt3

`apps/backend` - the new server built on Parse

`packages/bridgestars-db-client` - a client database wrapper using [parse-sdk-ts](https://github.com/theolundqvist/Parse-SDK-TS)


## Getting started
requirements: `pnpm, git`
1. Install dependencies `pnpm install`
2. Run frontend `cd apps/frontend && pnpm start`
3. Run backend `cd apps/backend && pnpm start`
4. Go to `localhost:3000`
5. Further instructions can be found at frontend/README and backend/README


## Deploy scheme
### Frontend servers

All pushes to `demo` are automatically deployed to 

- [bridgestars-web-demo.vercel.app](https://bridgestars-web-demo.vercel.app)

All pushes to `main` are automatically deployed to 

- [bridgestars-web-test.vercel.app](https://bridgestars-web-test.vercel.app)

All pushes to `release` are automatically deployed to 

- [bridgestars.net](https://bridgestars.net)

- [bridgestars-web-release.vercel.app](https://bridgestars-web-release.vercel.app)

### Backend servers
The `demo` branch connects to the server at

  - [bridgestars-demo-backend.fly.dev](https://bridgestars-demo-backend.fly.dev/dash/login) (dashboard)

The `release` branch connects to the server at

  - [bridgestars-legacy.fly.dev](https://bridgestars-legacy.fly.dev/dash/login) (dashboard)

The `main` branch does not yet have a server.

## Development stack
### Frameworks
- Frontend: `Vue3`
- SSR and convenience: `Nuxt`
- client-server library: `bridgestars-db-client` (built on Parse-SDK-TS)
- Server: `Parse`
- Database: `MongoDB`

### Hosts
- Frontend: `Vercel`
- Backend: `Fly.io`
- Database: `Mongo Atlas`
