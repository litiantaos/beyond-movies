export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-simple-robots', '@nuxtjs/sitemap'],
  css: ['remixicon/fonts/remixicon.css', '~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      tmdbUrl: '',
      siteUrl: ''
    },
    tmdbToken: ''
  },
  robots: {
    sitemap: ['/sitemap.xml']
  },
  sitemap: {
    sources: ['/api/sitemap/movies', '/api/sitemap/tvs'],
    sitemaps: true,
    defaultSitemapsChunkSize: 2000
  }
})
