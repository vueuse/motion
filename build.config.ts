import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    { input: 'src/index.ts', outDir: 'dist', name: 'index' },
    {
      input: 'src/ssr/index.ts',
      outDir: 'dist',
      name: 'ssr',
    },
  ],
  externals: [
    'csstype',
    '@vueuse/shared',
    'framesync',
    'style-value-types',
    '@vue/compiler-core',
    '@babel/parser',
    '@vue/shared',
  ],
})
