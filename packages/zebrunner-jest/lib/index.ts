import cuid from 'cuid'
import makeZebrunnerAPI from 'zebrunner-js'

import readPackageJSON, { PackageInfo } from './read-package-json'
import initZebConfig from './zeb-config'

import type { Config } from '@jest/types'
import type {
  AggregatedResult,
  Context,
  ReporterOnStartOptions,
  Test,
  AssertionResult,
  TestResult,
} from './types'

type TestExecutionLog = {
  testId: number
  level: string
  message: string
  timestamp: number
}

const transformResultToLog = (testId: number) => (
  result: AssertionResult
): TestExecutionLog => ({
  testId,
  level: result.status === 'failed' ? 'ERROR' : 'PASSED',
  timestamp: Date.now(),
  message: result.title,
})

class ZebrunnerJestReporter {
  protected _globalConfig: Config.GlobalConfig
  protected _options: any
  protected zeb: ReturnType<typeof makeZebrunnerAPI>

  packageInfo: PackageInfo
  testRunId: number = 0
  testId: number = 0
  req: Promise<any> = Promise.resolve()

  constructor(globalConfig: Config.GlobalConfig, options: any) {
    this._globalConfig = globalConfig
    this._options = options
    this.packageInfo = readPackageJSON(globalConfig.rootDir)
    this.zeb = makeZebrunnerAPI(initZebConfig(globalConfig.rootDir))
  }

  onRunStart(aggregatedResult: AggregatedResult, options: ReporterOnStartOptions) {
    return (this.req = this.req.then(() =>
      this.zeb.testRunExecutionStart({
        name: `${this.packageInfo.name} ${this.packageInfo.version}`,
        framework: 'jest',
        startedAt: new Date().toISOString(),
      })
    )).then(({ id }) => {
      this.testRunId = id
    })
  }

  onTestStart(test: Test) {
    return (this.req = this.req
      .then(() =>{
        const testFilePath = test.path.replace(this._globalConfig.rootDir, '')

        return this.zeb.testExecutionStartReporting(this.testRunId, {
          uuid: cuid(),
          name: testFilePath, 
          className: testFilePath,
          methodName: testFilePath,
          startedAt: new Date().toISOString(),
        })
      })
      .then(({ id }) => {
        this.testId = id
      }))
  }

  onTestResult(test: Test, testResult: TestResult, aggregatedResult: AggregatedResult) {
    const logs = testResult.testResults.map(transformResultToLog(this.testId))
    const isFailed = testResult.testResults.map((x) => x.status).includes('failed')

    return (this.req = this.req
      .then(() => this.zeb.sendTestExecutionLogs(this.testRunId, logs))
      .then(() =>
        this.zeb.testExecutionFinishReporting(this.testRunId, this.testId, {
          result: isFailed ? 'FAILED' : 'PASSED',
          endedAt: new Date().toISOString(),
        })
      ))
  }

  onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    return (this.req = this.req.then(() =>
      this.zeb.testRunExecutionFinishReporting(this.testRunId, {
        endedAt: new Date().toISOString(),
      })
    ))
  }
}

export default ZebrunnerJestReporter
