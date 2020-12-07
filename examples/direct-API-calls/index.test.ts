import cuid from 'cuid'
import dotenv from 'dotenv'
import fs from 'fs'

import makeZebrunnerAPI from '../../packages/zebrunner-js'

if (dotenv.config().error) {
  throw Error(
    'You should have ".env" file in the project root, use ".env.example" as guide'
  )
}

const serviceURL = process.env['ZEBRUNNER_SERVICE_URL']
const projectKey = process.env['ZEBRUNNER_PROJECT_KEY']
const accessToken = process.env['ZEBRUNNER_ACCESS_TOKEN']

if (!serviceURL || !projectKey || !accessToken) {
  throw Error('One or many required .env variables missed')
}

const zeb = makeZebrunnerAPI({
  serviceURL,
  projectKey,
  accessToken,
})

describe('Check zebrunner API closure methods', () => {
  const imageSampleBinary = fs.readFileSync(__dirname + '/sample.png')

  let testRunId = 0
  let testId = 0

  it('"testExecutionStart" should return test run id', async () => {
    const response = await zeb.testRunExecutionStart({
      name: 'name_0',
      framework: 'framework_0',
      startedAt: new Date().toISOString(),
      uuid: cuid(),
    })

    expect(typeof response.id).toBe('number')
    testRunId = response.id
  })

  it('"testExecutionStartReporting should return test id', async () => {
    const response = await zeb.testExecutionStartReporting(testRunId, {
      uuid: cuid(),
      name: 'testExecutionStartReporting_0',
      className: 'className_0',
      methodName: 'methodName_0',
      startedAt: new Date().toISOString(),
      maintainer: 'maintainer_0',
      testCase: 'testCase_0',
    })

    expect(typeof response.id).toBe('number')
    testId = response.id
  })

  it('"sendTestExecutionLogs" should return empty object', async () => {
    const response = await zeb.sendTestExecutionLogs(testRunId, [
      { testId, level: 'level_0', timestamp: Date.now(), message: 'message_0' },
    ])

    expect(typeof response).toBe('object')
  })

  it('"sendTestScreenshot" should return key', async () => {
    const response = await zeb.sendTestScreenshot(testRunId, testId, imageSampleBinary)

    expect(typeof response.key).toBe('string')
  })

  // @TODO currently method is not working
  it.skip('"sendTestArtifact" should not fail', async () => {
    const response = await zeb.sendTestArtifact(testRunId, testId, {
      file: imageSampleBinary,
    })
    expect(response).toBeTruthy()
  })

  it('"testExecutionFinishReporting" should return test id', async () => {
    const response = await zeb.testExecutionFinishReporting(testRunId, testId, {
      result: 'PASSED',
      endedAt: new Date().toISOString(),
    })

    expect(response.id).toBe(testId)
  })

  it('"testRunExecutionFinishReporting" should return empty object', async () => {
    const response = await zeb.testRunExecutionFinishReporting(testRunId, {
      endedAt: new Date().toISOString(),
    })

    expect(typeof response).toBe('object')
  })
})
