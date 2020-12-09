import fs from 'fs'
import path from 'path'

export type PackageInfo = {
  name: string
  version: string
  [k: string]: any
}

const initialPackageInfo: PackageInfo = {
  name: 'Unknown name',
  version: 'unknown version',
}

export default function readPackageJSON(rootDir: string): PackageInfo {
  try {
    const filePath = path.resolve(rootDir, 'package.json')
    const file = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(file)

    return {
      ...initialPackageInfo,
      ...data,
    }
  } catch (e) {
    console.error(`Could not find or parse "package.json" file at the "rootDir"`, e)
    return initialPackageInfo
  }
}
