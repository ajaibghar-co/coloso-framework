# Coloso
An interactive monument generator to create a one-of-a-kind “monument” in memory of an LGBTQ space that was important to you and/or a loved one. 

## TRY IT HERE: 
[https://coloso.site/](https://coloso.site/)

### Credits
- Directed by Regner Ramos and Kleanthis Kyriakou, [Wet-Hard Agency](http://www.wet-hard.agency/index2.html). 
- Web experience is designed & produced by [Ajaibghar](https://www.ajaibghar.com/) (Ambika Joshi, Nanditi Khilnani, Anushka Trivedi, Denny George)
- Funded by the Graham Foundation 2021-2023

# Tech stack used
- UI and backend framework developed in vite and grommet
- Frontend and backend hosted on fly.io
- Fly.io and domain owner is Kleanthis Kyriakou (all credentials are with you)

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

- `npm run build` : creates a `dist` directory with the static assets for your webpage
- `npm run server` : starts the server which serves the assets too
- visit `localhost:3000/` to access the app

# Testing

## Selection Logic

- uncomment `testSampling();` in `src/selection.js`
- `node src/selection.js`

# MAINTENANCE AND HANDOVER

Please keep a regular check on the billing to note if any additional cost is incurred.
   fly sign in > dashboard > select organisation (coloso) > billing (left side menu)
As payment is set to auto debit to Kleanthis' card. 

# Backup for the database

We recommend taking a database backup after every workshop that you do, this will ensure that your monument data is saved for long term. It will not affect the project in anyway but for any unforeseen scenario or in the event that you move the technology infrastructure, your monument data can be saved safely. 

- Sign up for fly.io
- Link your local machine to flyctl (fly's command line tool): https://fly.io/docs/hands-on/install-flyctl/
- Sign in on fly through the terminal: https://fly.io/docs/hands-on/sign-in/
- Use `fly apps list` to check if the project is available. The project name is `coloso-node`
- Open https://coloso.site in browser
- Use `flyctl sftp —app coloso-node get /volume/monument.db monument-TODAYS-DATE.db`
- this will give you an update database on your local machine. 
- We recommend this process after every workshop/event where the project is showcased. 
- FOR DEVELOPER: if you want to test the update database in your local repository, you can replace the file in `server` folder as `monument.db`. 

### KNOWN ERROR

In case you encounter this error:
  `Error: app coloso-node has no started VMs` on running the command line tools, please refresh the website "https://coloso.site" and you it should work. 
