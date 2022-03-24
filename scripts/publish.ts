import { execSync } from 'child_process'
import consola from 'consola'
import { name, version } from '../package.json'

execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta')) command += ' --tag beta'

execSync(command, { stdio: 'inherit' })

consola.success(`Published @vueuse/${name}`)
