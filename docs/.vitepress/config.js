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
}
