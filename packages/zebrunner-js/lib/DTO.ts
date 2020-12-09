// Test run execution start reporting
// POST /api/reporting/v1/test-runs?projectKey={projectKey}

export type TestRunExecutionStartRequest = {
  name: string
  framework: string
  startedAt: string // ISO 8601
  uuid?: string
  config?: any
  launchContext?: any
}

export type TestRunExecutionStartResponse = { id: number } & TestRunExecutionStartRequest

// Test execution start reporting
// POST /api/reporting/v1/test-runs/{testRunId}/tests

export type TestExecutionStartReportingRequest = {
  uuid: string
  name: string
  className: string
  methodName: string
  startedAt: string
  maintainer?: string
  testCase?: string
}

export type TestExecutionStartReportingResponse = {
  id: number
} & TestExecutionStartReportingRequest

// @TODO need to clarify mechanics of request below

export type TestExecutionStartReportingHeadlessRequest = {
  uuid?: string
  name?: string
  startedAt: string
}

export type TestExecutionStartReportingHeadlessResponse = {
  id: number
} & TestExecutionStartReportingHeadlessRequest

// Test execution finish reporting
// PUT /api/reporting/v1/test-runs/{testRunId}/tests/{id}

export type TestExecutionResult = 'PASSED' | 'FAILED' | 'ABORTED' | 'SKIPPED' | 'IGNORED'

export type TestExecutionFinishReportingRequest = {
  result: TestExecutionResult
  endedAt: string // ISO 8601 // @TODO in documentation optional but actually mandatory
  reason?: string
  labels?: { [k: string]: string[] }
}

export type TestExecutionFinishReportingResponse = {
  id: number
} & TestExecutionFinishReportingRequest

// Test run execution finish reporting
// PUT /api/reporting/v1/test-runs/{testRunId}

export type TestRunExecutionFinishReportingRequest = {
  endedAt: string // ISO 8601
}

export type TestRunExecutionFinishReportingResponse = {}

// Sending test execution logs
// POST /api/reporting/v1/test-runs/{testRunId}/logs

export type TestExecutionLog = {
  testId: number
  level: string
  timestamp: number
  message: string
}

export type SendTestExecutionLogRequest = Array<TestExecutionLog>
export type SendTestExecutionLogResponse = {}

// Sending test screenshots
// POST /api/reporting/v1/test-runs/{testRunId}/tests/{testId}/screenshots
// @TODO should be provided optional header: x-zbr-screenshot-captured-at: <epoch-millis>

export type SendTestScreenshotRequest = Buffer
export type SendTestScreenshotResponse = { key: string }

// Publish test artifacts
// POST /api/reporting/v1/test-runs/{testRunId}/tests/{testId}/artifacts

export type PublishTestArtifactRequest = {
  file: Buffer | string
}

export type PublishTestArtifactResponse = any

// SESSIONS SECTION

// Test session start reporting
// POST /api/reporting/v1/test-sessions

export type SessionStartReportingRequest = {
  sessionId: string
  startedAt?: string // ISO 8601
  desiredCapabilities: string[]
  capabilities: string[]
  testRefs?: any[]
}

export type SessionStartReportingResponse = {} & SessionStartReportingRequest

// Test session finish reporting
// POST /api/reporting/v1/test-sessions/{sessionId}

export type SessionFinishReportingRequest = {
  endedAt?: string // ISO 8601
  testRefs?: any[]
}

export type SessionFinishReportingResponse = {} & SessionFinishReportingRequest