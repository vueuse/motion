// @ts-check

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: '@vueuse/motion',
  description: '🤹 Vue Composables putting your components in motion',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Yaël GUILLOUX' }],
    ['meta', { property: 'og:title', content: '@vueuse/motion' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '🤹 Vue Composables putting your components in motion',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://motion.vueuse.org/logo.svg',
      },
    ],
    ['meta', { name: 'twitter:creator', content: '@yaeeelglx' }],
    [
      'meta',
      { name: 'twitter:image', content: 'https://motion.vueuse.org/logo.svg' },
    ],
  ],
  themeConfig: {
    repo: 'vueuse/motion',
    sidebar: [
      {
        text: 'Getting Started',
        children: [
          {
            text: 'Introduction',
            link: '/introduction',
          },
          {
            text: 'Installation',
            link: '/installation',
          },
          {
            text: 'Quick Start',
            link: '/quick-start',
          },
          {
            text: 'Roadmap',
            link: '/roadmap',
          },
          {
            text: 'Demo',
            link: '/demo',
          },
        ],
      },
      {
        text: 'Features',
        children: [
          {
            text: 'Presets',
            link: '/presets',
          },
          {
            text: 'Directive Usage',
            link: '/directive-usage',
          },
          {
            text: 'Composable Usage',
            link: '/composable-usage',
          },
          {
            text: 'Motion Properties',
            link: '/motion-properties',
          },
          {
            text: 'Transition Properties',
            link: '/transition-properties',
          },
          {
            text: 'Variants',
            link: '/variants',
          },
          {
            text: 'Motion Instance',
            link: '/motion-instance',
          },
        ],
      },
      {
        text: 'API',
        children: [
          {
            text: 'useMotion',
            link: '/api/use-motion',
          },
          {
            text: 'useMotions',
            link: '/api/use-motions',
          },
          {
            text: 'useMotionProperties',
            link: '/api/use-motion-properties',
          },
          {
            text: 'useMotionVariants',
            link: '/api/use-motion-variants',
          },
          {
            text: 'useMotionTransitions',
            link: '/api/use-motion-transitions',
          },
          {
            text: 'useMotionControls',
            link: '/api/use-motion-controls',
          },
          {
            text: 'useMotionFeatures',
            link: '/api/use-motion-features',
          },
          {
            text: 'useElementStyle',
            link: '/api/use-element-style',
          },
          {
            text: 'useElementTransform',
            link: '/api/use-element-transform',
          },
        ],
      },
    ],
  },
}
