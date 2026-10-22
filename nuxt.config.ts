import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  telemetry: false,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Eden Research & Dev — Analyses, Codes & Skills',
      htmlAttrs: {
        lang: 'fr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Département technique de Grow Tech : analyses technologiques approfondies, architectures et compétences pratiques en Intelligence Artificielle pour le Cameroun et l\'Afrique.' },
        { property: 'og:site_name', content: 'Eden Research & Dev — Département technique de Grow Tech' },
        { property: 'og:title', content: 'Eden Research & Dev — Département technique de Grow Tech' },
        { property: 'og:description', content: 'Département technique de Grow Tech : analyses technologiques approfondies, architectures et compétences pratiques en Intelligence Artificielle pour le Cameroun et l\'Afrique.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/ai-education.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Eden Research & Dev — Département technique de Grow Tech' },
        { name: 'twitter:description', content: 'Département technique de Grow Tech : analyses technologiques approfondies, architectures et compétences pratiques en Intelligence Artificielle.' },
        { name: 'twitter:image', content: '/images/ai-education.jpg' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
})
