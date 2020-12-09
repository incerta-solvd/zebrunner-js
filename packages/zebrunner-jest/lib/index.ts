import makeZebrunnerAPI from 'zebrunner-js'
import readDotEnv from './read-dot-env'

import type { Config } from '@jest/types'
import type {
  AggregatedResult,
  Context,
  ReporterOnStartOptions,
  Test,
  TestCaseResult,
  TestResult,
} from './types'

class ZebrunnerJestReporter {
  protected _globalConfig: Config.GlobalConfig
  protected _options: any
  protected _zebrunner: ReturnType<typeof makeZebrunnerAPI>

  constructor(globalConfig: Config.GlobalConfig, options: any) {
    const dotenv = readDotEnv() as any

    const serviceURL = process.env['ZEBRUNNER_SERVICE_URL'] || dotenv['ZEBRUNNER_SERVICE_URL']
    const projectKey = process.env['ZEBRUNNER_PROJECT_KEY'] || dotenv['ZEBRUNNER_PROJECT_KEY']
    const accessToken = process.env['ZEBRUNNER_ACCESS_TOKEN'] || dotenv['ZEBRUNNER_ACCESS_TOKEN']

    if (!serviceURL || !projectKey || !accessToken) {
      throw Error('One or many required .env variables missed')
    }

    this._globalConfig = globalConfig
    this._options = options
    this._zebrunner = makeZebrunnerAPI({
      serviceURL,
      projectKey,
      accessToken,
    })
  }

  onTestCaseResult(test: Test, testCaseResult: TestCaseResult) {
    console.log('onTestCaseResult')
  }

  onRunStart(aggregatedResult: AggregatedResult, options: ReporterOnStartOptions) {
    console.log('onRunStart')
  }

  onTestStart(test: Test) {
    console.log('onTestStart')
  }

  onTestResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) {
    console.log('onTestResult')
    console.log(testResult)
  }

  onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    console.log('onRunComplete')
  }
}

export default ZebrunnerJestReporter
