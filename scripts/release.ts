import { execSync } from 'child_process'
import { readJSONSync } from 'fs-extra'

const { version: oldVersion } = readJSONSync('package.json')

execSync('npx bumpp', { stdio: 'inherit' })

const { version } = readJSONSync('package.json')

if (oldVersion === version) {
  console.log('Canceled! Same version!')
  process.exit()
}

execSync('yarn build', { stdio: 'inherit' })
execSync('yarn update', { stdio: 'inherit' })
execSync('git add .', { stdio: 'inherit' })

execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
