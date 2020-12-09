import fs from 'fs'
import path from 'path'

export default function readDotEnv(rootDir: string): { [k: string]: string | undefined } {
  try {
    const probableDotEnvFilePath = path.resolve(rootDir, '.env')
    const dotEnvFile = fs.readFileSync(probableDotEnvFilePath, 'utf-8')

    return dotEnvFile
      .split('\n')
      .filter((x: string) => !!x)
      .map((x: string) => x.split('=').map((x: string) => x.trim()))
      .reduce((obj: any, [key, val]: any) => ({ ...obj, [key]: val }), {}) as any
  } catch (_) {
    return {}
  }
}
