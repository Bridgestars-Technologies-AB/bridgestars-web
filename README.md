# About the project
This repository consists of a teaching platform for the card game Bridge, implemented as a responsive web application in nuxt.js. It is a mono repo, with a backend written in Laravel.
The web application supports user authentication and has a dashboard environment for learning Bridge. The dashboard environment mainly contains playable exercises divided into different courses. 

## Viewing courses and doing exercises
<p float="left">
  <img src="https://github.com/user-attachments/assets/3086e129-8623-4890-849e-ef3d43edb059" width="45%" height="auto" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/adb5c826-3e17-4dc0-9e4c-213782b12e43" width="45%" height="auto" />
</p>

## Lightmode and smaller screens
<p float="left">
   <img src="https://github.com/user-attachments/assets/05512eca-0e14-4b1c-a987-8db8caab2be9" width="45%" height="auto" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/2f8ca126-8ebf-4199-a40e-14ed3d0eb63a" width="45% height="auto"/>
</p>


## Creating and logging in to your account, Analyzing results
<p float="left">
    <img src="https://github.com/user-attachments/assets/b43ea2d3-0e50-40b5-a5a6-5ffb50ba5d5f" width="45%" height="auto" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/e3344adf-e5db-4f54-83c7-f71981802cb2" width="45%" height="auto"/>
</p>

## Terms and conditions page
<p float="left">
  <img src="https://github.com/user-attachments/assets/5c3a7a88-49af-4fbb-8998-31c20c83600d" width="45%" height="auto" />
</p>

# bridgestars-web

`apps/frontend` - the new website built with vue3 and nuxt3

`apps/bridgestars-api` - the new backend built on laravel

`apps/backend-old` - the old server built on js + Parse

`packages/bridgestars-db-client` - a client database wrapper using [parse-sdk-ts](https://github.com/theolundqvist/Parse-SDK-TS)

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

## Getting started
requirements: `pnpm, git`
1. Install dependencies `pnpm install`
2. Run frontend `cd apps/frontend && pnpm start`
3. Run backend `cd apps/bridgestars-api && sail up -d`, more may be needed, consult laravel documentation
4. Go to `localhost:3000`
5. Further instructions can be found at [frontend/README](https://github.com/Bridgestars-Technologies-AB/bridgestars-web/blob/demo/apps/frontend/README.md) and [backend/README](https://github.com/Bridgestars-Technologies-AB/bridgestars-web/blob/demo/apps/backend/README.md)


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
These are no longer maintained, run locally to test the project.

The `demo` branch connects to the server at

  - [bridgestars-demo-backend.fly.dev](https://bridgestars-demo-backend.fly.dev/dash/login) (dashboard)

The `release` branch connects to the server at

  - [bridgestars-legacy.fly.dev](https://bridgestars-legacy.fly.dev/dash/login) (dashboard)

The `main` branch does not yet have a server.


