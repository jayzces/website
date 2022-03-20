[![Netlify Status](https://api.netlify.com/api/v1/badges/f9fdc646-6a8e-4ba5-85ee-18a7f3126784/deploy-status)](https://app.netlify.com/sites/clever-pike-f48452/deploys)

website
========
Source code for LouiseHermosa.com

![preview](preview.png)

# Dependencies
- [Yarn](https://yarnpkg.com/)

# Scripts
```
# install project dependencies
yarn install

# Local Server
yarn dev

# Production Build for static hosting
yarn generate

# Serve Production Build
yarn start

# Build Files and Serve Production Build
yarn prod

# Netlify Functions API
yarn functions
```

# Environment Variables
`.env` file used for Netlify functions. File has to be created on new cloned project.

`.env.dev` and `.env.prod` used for Nuxt builds.

```
# .env
GITHUB_ACCESS_TOKEN=0

# .env.dev, .env.prod
NETLIFY_FUNCTIONS_URL=http://localhost:9000
```

# Sources
- [Assistant Fonts](https://fonts.google.com/specimen/Assistant)
- [Cattieshine Font](https://befonts.com/cattieshine-script-font.html)
