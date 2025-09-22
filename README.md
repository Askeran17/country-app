# Country App

Browse countries from around the world, search by name, filter by region, and sort alphabetically. The app uses the REST Countries v3.1 API and is built with React + Vite.

## Live demo

Deployed on Netlify: https://country-app-mikhail.netlify.app/

## Features

- Fetches countries from REST Countries (v3.1) with a lean `fields` query
- Client‑side search by country name
- Filter by region: Africa, Americas, Asia, Europe, Oceania, Antarctic
- Sort A→Z or Z→A by name
- Country cards show flag, name, capital, region, and population
- Custom‑styled dropdowns for a consistent look across browsers
- Simple, responsive layout

## Sorting controls

The app supports ascending (A→Z) and descending (Z→A) sorting by country name.

![Ascending](src/assets/ascending.png "Ascending")
![Descending](src/assets/descending.png "Descending")

## Tech stack

- React 19
- Vite 7
- Vanilla CSS
- REST Countries API (v3.1)
- ESLint 9

## Getting started

Prerequisites:

- Node.js 18 or newer
- npm (bundled with Node)

Install and run in development:

```bash
npm install
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`).

Build for production and preview:

```bash
npm run build
npm run preview
```

Lint the project:

```bash
npm run lint
```

## API notes (REST Countries v3.1)

- Base: `https://restcountries.com/v3.1`
- Endpoints used:
  - `GET /all?fields=name,cca2,capital,region,flags,population`
  - `GET /region/{region}?fields=name,cca2,capital,region,flags,population`
- Regions (slugs) expected by the API: `africa`, `americas`, `asia`, `europe`, `oceania`, `antarctic`.
  - Note: Antarctic is `antarctic` (not `antarctica`).
- The app requests specific fields to reduce payload size and avoid 400 errors that can occur when omitting `fields`.

## Acknowledgements

- Data from REST Countries: https://restcountries.com

## License

This project is open‑sourced under the MIT license.

