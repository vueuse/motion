// @ts-check

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'vueuse/motion',
  description: '🤹 A Vue Composable that put your components in motion.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:title', content: '@vueuse/motion' }],
    ['meta', { property: 'og:image', content: '' }], // TODO: Add banner image
    [
      'meta',
      {
        property: 'og:description',
        content: '🤹 A Vue Composable that put your components in motion.',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@yaeeelglx' }],
    [
      'meta',
      { name: 'twitter:image', content: '' }, // TODO: Add banner image
    ],
  ],
  themeConfig: {
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
        ],
      },
      {
        text: 'Features',
        children: [
          {
            text: 'Motion properties',
            link: '/motion-properties',
          },
          {
            text: 'Transition properties',
            link: '/transition-properties',
          },
          {
            text: 'Variants',
            link: '/variants',
          },
          {
            text: 'Composable usage',
            link: '/composable-usage',
          },
          {
            text: 'Directive usage',
            link: '/directive-usage',
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
            text: 'useStyle',
            link: '/api/use-style',
          },
          {
            text: 'useTransform',
            link: '/api/use-transform',
          },
        ],
      },
    ],
  },
}
