import cuid from 'cuid'
import dotenv from 'dotenv'
import fs from 'fs'

import makeZebrunnerAPI from '../src'

const CONFIG = {
  shouldSendScreenshot: false,
  shouldSendArtifact: false,
}

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

const imageSampleBinary = fs.readFileSync(__dirname + '/sample.png')
let testRunId = 0

zeb
  .testRunExecutionStart({
    name: 'name_0',
    framework: 'framework_0',
    startedAt: new Date().toISOString(),
    uuid: cuid(),
  })
  .then(({ id }) => {
    testRunId = id
    return zeb.testExecutionStartReporting(id, {
      uuid: cuid(),
      name: 'testExecutionStartReporting_0',
      className: 'className_0',
      methodName: 'methodName_0',
      startedAt: new Date().toISOString(),
      maintainer: 'maintainer_0',
      testCase: 'testCase_0',
    })
  })
  .then(({ id: testId }) => {
    zeb.sendTestExecutionLogs(testRunId, [
      { testId, level: 'level_0', timestamp: Date.now(), message: 'message_0' },
    ])

    if (CONFIG.shouldSendScreenshot) {
      zeb
        .sendTestScreenshot(testRunId, testId, imageSampleBinary)
        .then((x) => {
          console.log('load image success', x)
        })
        .catch((x) => {
          console.log('load image failed', x)
        })
    }

    if (CONFIG.shouldSendArtifact) {
      zeb
        .sendTestArtifact(testRunId, testId, { file: imageSampleBinary })
        .then((x) => {
          console.log('artifact send success', x)
        })
        .catch((x) => {
          console.log('artifact send failed', x)
        })
    }

    return zeb.testExecutionFinishReporting(testRunId, testId, {
      result: 'PASSED',
      endedAt: new Date().toISOString(),
    })
  })
  .then(() => {
    return zeb.testRunExecutionFinishReporting(testRunId, {
      endedAt: new Date().toISOString(),
    })
  })
  .then((x) => {
    console.log('success', x)
  })
  .catch((e) => {
    console.log('error', e)
  })
