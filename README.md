# Developing Locally

The project uses vite to start a dev server.
```bash
npm install
npm run dev
```

You should be able to access the webpage at http://localhost:5173.

Any changes you make to your scripts will cause the server to reload when you save the file



# Production build
While The software has a frontend and backend components, for the sake
of easy deployment, we combine it into just one. In production we run an express server that acts as the API server and also serves the UI for the project

## Steps
- `npm run build` : creates a `build` directory with the static assets for your webpage
- `npm run server` : starts the server which serves the assets too
- visit `localhost:3000/` to access the app 