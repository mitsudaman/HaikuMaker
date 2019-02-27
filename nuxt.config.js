module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '俳句メーカー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { property: 'og:title', content: '俳句メーカー' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: '俳句メーカー。俳句メーカー。あなたの日常を俳句にして周りとシェアしましょう。' },
      { property: 'og:url', content: 'https://www.haiku-maker.site/' },
      { property: 'og:site_name', content: '俳句メーカー' },
      { property: 'og:image', content: 'https://www.haiku-maker.site/OGP.png' },
      { name: 'twitter:site', content: '@mitudama' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  modules: [
    'bootstrap-vue/nuxt',

    // Or if you have custom bootstrap CSS...
    // ['bootstrap-vue/nuxt', { css: false }],
    // // google analytics 
    // ['@nuxtjs/google-analytics', {
    //   id: ''
    // }]
  ],
}

