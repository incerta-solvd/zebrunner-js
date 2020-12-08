// The types is extended from:
// https://github.com/facebook/jest/blob/master/packages/jest-reporters/src/types.ts
// https://github.com/facebook/jest/blob/master/packages/jest-test-result/src/types.ts

import type { Config } from '@jest/types'

export type RuntimeTransformResult = any
export type V8CoverageResult = any
export type SerializableError = any

export type FailedAssertion = {
  matcherName?: string
  message?: string
  actual?: unknown
  pass?: boolean
  passed?: boolean
  expected?: unknown
  isNot?: boolean
  stack?: string
  error?: unknown
}

export type AssertionLocation = {
  fullName: string
  path: string
}

export type Status = AssertionResult['status']

export type Bytes = number

export type Milliseconds = any

export type AssertionResult = any

export type FormattedAssertionResult = Pick<
  AssertionResult,
  'ancestorTitles' | 'fullName' | 'location' | 'status' | 'title'
> & {
  failureMessages: AssertionResult['failureMessages'] | null
}

export type AggregatedResultWithoutCoverage = {
  numFailedTests: number
  numFailedTestSuites: number
  numPassedTests: number
  numPassedTestSuites: number
  numPendingTests: number
  numTodoTests: number
  numPendingTestSuites: number
  numRuntimeErrorTestSuites: number
  numTotalTests: number
  numTotalTestSuites: number
  openHandles: Array<Error>
  snapshot: SnapshotSummary
  startTime: number
  success: boolean
  testResults: Array<TestResult>
  wasInterrupted: boolean
}

export type AggregatedResult = AggregatedResultWithoutCoverage & {
  coverageMap?: any | null
}

export type Suite = {
  title: string
  suites: Array<Suite>
  tests: Array<AssertionResult>
}

export type TestCaseResult = AssertionResult

export type TestResult = {
  console?: any
  coverage?: any
  displayName?: Config.DisplayName
  failureMessage?: string | null
  leaks: boolean
  memoryUsage?: Bytes
  numFailingTests: number
  numPassingTests: number
  numPendingTests: number
  numTodoTests: number
  openHandles: Array<Error>
  perfStats: {
    end: Milliseconds
    runtime: Milliseconds
    slow: boolean
    start: Milliseconds
  }
  skipped: boolean
  snapshot: {
    added: number
    fileDeleted: boolean
    matched: number
    unchecked: number
    uncheckedKeys: Array<string>
    unmatched: number
    updated: number
  }
  testExecError?: SerializableError
  testFilePath: Config.Path
  testResults: Array<AssertionResult>
  v8Coverage?: V8CoverageResult
}

export type FormattedTestResult = {
  message: string
  name: string
  summary: string
  status: 'failed' | 'passed'
  startTime: number
  endTime: number
  coverage: unknown
  assertionResults: Array<FormattedAssertionResult>
}

export type FormattedTestResults = {
  coverageMap?: any | null | undefined
  numFailedTests: number
  numFailedTestSuites: number
  numPassedTests: number
  numPassedTestSuites: number
  numPendingTests: number
  numPendingTestSuites: number
  numRuntimeErrorTestSuites: number
  numTotalTests: number
  numTotalTestSuites: number
  snapshot: SnapshotSummary
  startTime: number
  success: boolean
  testResults: Array<FormattedTestResult>
  wasInterrupted: boolean
}

export type CodeCoverageReporter = unknown

export type CodeCoverageFormatter = (
  coverage: any | null | undefined,
  reporter: CodeCoverageReporter
) => Record<string, unknown> | null | undefined

export type UncheckedSnapshot = {
  filePath: string
  keys: Array<string>
}

export type SnapshotSummary = {
  added: number
  didUpdate: boolean
  failure: boolean
  filesAdded: number
  filesRemoved: number
  filesRemovedList: Array<string>
  filesUnmatched: number
  filesUpdated: number
  matched: number
  total: number
  unchecked: number
  uncheckedKeysByFile: Array<UncheckedSnapshot>
  unmatched: number
  updated: number
}

// EXTRA

export type ReporterOnStartOptions = {
  estimatedTime: number
  showStatus: boolean
}

export type Context = {
  config: Config.ProjectConfig
}

export type Test = {
  context: Context
  duration?: number
  path: Config.Path
}

export type CoverageWorker = { worker: any }

export type CoverageReporterOptions = {
  changedFiles?: Set<Config.Path>
  sourcesRelatedToTestsInChangedFiles?: Set<Config.Path>
}

export type CoverageReporterSerializedOptions = {
  changedFiles?: Array<Config.Path>
  sourcesRelatedToTestsInChangedFiles?: Array<Config.Path>
}

export type OnTestStart = (test: Test) => Promise<void>
export type OnTestFailure = (test: Test, error: SerializableError) => Promise<unknown>
export type OnTestSuccess = (test: Test, result: TestResult) => Promise<unknown>

export interface Reporter {
  readonly onTestResult?: (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult
  ) => Promise<void> | void
  readonly onTestFileResult?: (
    test: Test,
    testResult: TestResult,
    aggregatedResult: AggregatedResult
  ) => Promise<void> | void
  readonly onTestCaseResult?: (
    test: Test,
    testCaseResult: TestCaseResult
  ) => Promise<void> | void
  readonly onRunStart: (
    results: AggregatedResult,
    options: ReporterOnStartOptions
  ) => Promise<void> | void
  readonly onTestStart?: (test: Test) => Promise<void> | void
  readonly onTestFileStart?: (test: Test) => Promise<void> | void
  readonly onRunComplete: (
    contexts: Set<Context>,
    results: AggregatedResult
  ) => Promise<void> | void
  readonly getLastError: () => Error | void
}

export type SummaryOptions = {
  currentTestCases?: Array<{ test: Test; testCaseResult: TestCaseResult }>
  estimatedTime?: number
  roundTime?: boolean
  width?: number
}

export type TestRunnerOptions = {
  serial: boolean
}

export type TestRunData = Array<{
  context: Context
  matches: { allTests: number; tests: Array<Test>; total: number }
}>

export type TestSchedulerContext = {
  firstRun: boolean
  previousSuccess: boolean
  changedFiles?: Set<Config.Path>
}
