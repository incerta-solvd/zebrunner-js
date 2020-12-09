const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/** 
 * Try to read the `.env` file at directory from where entry js file was invoked 
 * for example if we at `/` and invoking script like this `node foo/bar.js`
 * we expect `.env` to be at `/.env`
 **/

function readDotEnv() {
  try {
    const executedFromPath = execSync('pwd').toString().trim()
    const probableDotEnvFilePath = path.resolve(executedFromPath, '.env')

    const dotEnvFile = fs.readFileSync(probableDotEnvFilePath, 'utf-8')
    const envs = dotEnvFile
      .split('\n')
      .filter((x) => !!x)
      .map((x) => x.split('=').map((x) => x.trim()))
      .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})

    return envs
  } catch (_) {
    return {}
  }
}

module.exports = readDotEnv