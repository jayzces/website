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

# API Netlify Functions
yarn functions
```

# Environment Variables
Create new `.env` file with the following variables

```
GITHUB_ACCESS_TOKEN=0
```

# Sources
- [Assistant Fonts](https://fonts.google.com/specimen/Assistant)
- [Cattieshine Font](https://befonts.com/cattieshine-script-font.html)

# Notes
- Installed `@babel/plugin-proposal-private-property-in-object` to fix errors for `yarn generate`
