const devMode = process.env.NODE_ENV === 'development'

export default {
  buildModules: [
    '@nuxtjs/svg'
  ],
  components: true,
  css: [
    '~/assets/css/styles.css'
  ],
  head: {
    titleTemplate: 'LouiseHermosa.com',
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr'
    },
    bodyAttrs: {
      'data-theme': 'detect'
    },
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'author',
        content: 'Mary Louise Hermosa'
      }, {
        name: 'description',
        content: 'I’m a Web Developer at Arcanys. Previously a Front End Web Developer and Web Designer at ChannelFix.com and BPOSeats.com. I specialize in UI design and templating. Currently exploring new front end technologies.'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }, {
        name: 'msapplication-TileColor',
        content: '#1D2930',
      }, {
        name: 'msapplication-TileImage',
        content: '/icons/mstile-144x144.png',
      }, {
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      }, {
        name: 'theme-color',
        content: '#1D2930'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '194x194',
        href: '/icons/favicon-194x194.png'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/icons/android-chrome-192x192.png'
      }, {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png'
      }, {
        rel: 'manifest',
        href: '/site.webmanifest'
      }, {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#00AAFF'
      }, {
        rel: 'shortcut icon',
        href: '/icons/favicon.ico'
      }
    ]
  },
  modules: [
    '@nuxtjs/gtm',
    '@nuxtjs/axios',
    '~/modules/github'
  ],
  publicRuntimeConfig: {
    functionsURL: process.env.NETLIFY_FUNCTIONS_URL || '',
    rootUrl: process.env.NODE_ENV === 'production'
      ? '' : 'http://localhost:3000',
  },
  privateRuntimeConfig: {
    github: {
      api: process.env.GITHUB_API,
      token: process.env.GITHUB_ACCESS_TOKEN,
      username: process.env.GITHUB_USERNAME
    }
  },
  static: {
    prefix: false
  },
  target: 'static',

  // third party
  gtm: {
    id: 'UA-154592059-1'
  },
}
