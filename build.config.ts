import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  inlineDependencies: true,
  entries: [{ input: 'src/index.ts', outDir: 'dist', name: 'index' }],
  externals: ['csstype', '@vueuse/shared', 'framesync', 'style-value-types'],
})
