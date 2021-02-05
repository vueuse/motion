// @ts-check

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: '@vueuse/motion',
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
          {
            text: 'Quick Start',
            link: '/quick-start',
          },
          {
            text: 'Roadmap',
            link: '/roadmap',
          },
        ],
      },
      {
        text: 'Features',
        children: [
          {
            text: 'Composable Usage',
            link: '/composable-usage',
          },
          {
            text: 'Directive Usage',
            link: '/directive-usage',
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
            text: 'Motion Controls',
            link: '/motion-controls',
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
