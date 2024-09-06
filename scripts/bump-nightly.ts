import process from 'node:process'
import { promises as fsp } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve } from 'pathe'

async function main() {
  const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()
  const date = Math.round(Date.now() / (1000 * 60))

  const pkgPath = resolve(process.cwd(), 'package.json')

  const pkg = JSON.parse(await fsp.readFile(pkgPath, 'utf-8').catch(() => '{}'))

  pkg.version = `${pkg.version}-${date}.${commit}`

  pkg.name = `${pkg.name}-nightly`
  await fsp.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
