export default defineAppConfig({
  ui: {
    primary: 'cyan',
    gray: 'neutral',
  },
  header: {
    search: true,
    colorMode: true,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/vueuse/motion',
        'target': '_blank',
        'aria-label': 'VueUse Motion',
      },
    ],
  },
  seo: { siteName: '@vueuse/motion' },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/vueuse/motion',
        'target': '_blank',
        'aria-label': 'VueUse Motion',
      },
    ],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      edit: 'https://github.com/vueuse/motion/docs/edit/main/content',
    },
  },
})
