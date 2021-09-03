import { watch } from 'chokidar'
import { build } from 'unbuild'
import { resolve } from 'upath'
import consola from 'consola'

// Package root
const rootDir = resolve(__dirname, '..')
// Package src
const src = resolve(__dirname, '../src')

// Package build promise
const tryBuild = async () => {
  try {
    await build(rootDir, false)
  } catch (e) {
    consola.log(e)
  } finally {
    consola.info('Waiting for changes...')
  }
}

// Watch src, rebuild on any change
watch(src).on('change', tryBuild)
watch(src).on('add', tryBuild)
watch(src).on('unlink', tryBuild)
