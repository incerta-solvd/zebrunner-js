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

describe('Check zebrunner API sessions methods', () => {
  const sessionId = cuid()  
  
  // @TODO currently method is not working due to error 500, code: REP-1000
  it('"sessionStartReporting" should return object', async () => {
    const response = await zeb.sessionStartReporting({
      sessionId,
      startedAt: new Date().toISOString(),
      desiredCapabilities: ["firefox", 'macos'],
      capabilities: ["firefox", 'macos'],
      testRefs: [123215, 123216, 123217, 123218],
    })

    console.log('sessionStartReportingResponse===', response)

    expect(typeof response).toBe('object')
  })

  it('"sessionFinishReporting" should return object', async () => {
    const response = await zeb.sessionFinishReporting(sessionId, {
      endedAt: new Date().toISOString(),
      testRefs: [123215, 123216, 123217, 123218],
    })

    console.log('sessionFinishReportingResponse===', response)

    expect(typeof response).toBe('object')
  })
})