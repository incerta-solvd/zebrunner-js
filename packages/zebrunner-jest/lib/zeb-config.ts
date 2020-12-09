import makeZebrunnerAPI from 'zebrunner-js'
import readDotEnv from './read-dot-env'

export default function initZebConfig(rootDir: string): Parameters<typeof makeZebrunnerAPI>[0] {
  const dotenv = readDotEnv(rootDir)

  const serviceURL =
    process.env['ZEBRUNNER_SERVICE_URL'] || dotenv['ZEBRUNNER_SERVICE_URL']
  const projectKey =
    process.env['ZEBRUNNER_PROJECT_KEY'] || dotenv['ZEBRUNNER_PROJECT_KEY']
  const accessToken =
    process.env['ZEBRUNNER_ACCESS_TOKEN'] || dotenv['ZEBRUNNER_ACCESS_TOKEN']

  if (!serviceURL || !projectKey || !accessToken) {
    throw Error('One or many required .env variables missed')
  }

  return { serviceURL, projectKey, accessToken }
}
