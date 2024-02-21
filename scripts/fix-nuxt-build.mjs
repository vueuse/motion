import { readFile, writeFile } from 'node:fs/promises'

async function patchNuxtCJS() {
  const content = await readFile('dist/nuxt.cjs', 'utf-8')
  await writeFile('dist/nuxt.cjs', content.replace('module.exports = module$1;', 'exports.default = module$1;'))
}

patchNuxtCJS()
