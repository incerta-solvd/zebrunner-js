import makeHttpClient from './http-client'
import * as DTO from './DTO'

export default function makeZebrunnerAPI(cfg: {
  // Look for accessToken/serviceURL https://company_name.zebrunner.com/profile
  accessToken: string
  serviceURL: string
  projectKey: string
}) {
  const client = makeHttpClient(cfg)

  const testRunExecutionStart = (data: DTO.TestRunExecutionStartRequest) =>
    client.post<DTO.TestRunExecutionStartResponse>(
      `/api/reporting/v1/test-runs?projectKey=${cfg.projectKey}`,
      data
    )

  const testExecutionStartReporting = (
    testRunId: number | string,
    data: DTO.TestExecutionStartReportingRequest
  ) =>
    client.post<DTO.TestExecutionStartReportingResponse>(
      `/api/reporting/v1/test-runs/${testRunId}/tests`,
      data
    )

  /* @TODO it's not working, we should consult API maintainers */
  const testExecutionStartReportingHeadless = (
    testRunId: number | string,
    data: DTO.TestExecutionStartReportingHeadlessRequest
  ) =>
    client.post<DTO.TestExecutionStartReportingHeadlessResponse>(
      `/api/reporting/v1/test-runs/${testRunId}/tests`,
      data
    )

  const testExecutionFinishReporting = (
    testRunId: number | string,
    testId: number | string,
    data: DTO.TestExecutionFinishReportingRequest
  ) =>
    client.put<DTO.TestExecutionFinishReportingResponse>(
      `/api/reporting/v1/test-runs/${testRunId}/tests/${testId}`,
      data
    )

  const testRunExecutionFinishReporting = (
    testRunId: number | string,
    data: DTO.TestRunExecutionFinishReportingRequest
  ) =>
    client.put<DTO.TestRunExecutionFinishReportingResponse>(
      `/api/reporting/v1/test-runs/${testRunId}`,
      data
    )

  const sendTestExecutionLogs = (
    testRunId: number | string,
    data: DTO.SendTestExecutionLogRequest
  ) =>
    client.post<DTO.SendTestExecutionLogResponse>(
      `/api/reporting/v1/test-runs/${testRunId}/logs`,
      data
    )

  const sendTestScreenshot = (
    testRunId: number,
    testId: number,
    binary: DTO.SendTestScreenshotRequest
  ) =>
    client.post<DTO.SendTestScreenshotResponse>(
      `/api/reporting/v1/test-runs/${testRunId}/tests/${testId}/screenshots`,
      binary,
      {
        headers: { 'Content-Type': 'image/png' },
      }
    )

  /* @TODO it's not working, we should consult API maintainers */
  const sendTestArtifact = (
    testRunId: number,
    testId: number,
    data: DTO.PublishTestArtifactRequest
  ) =>
    client.post<DTO.PublishTestArtifactResponse>(
      `/api/reporting/v1/test-runs/${testRunId}/tests/${testId}/artifacts`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )

  return {
    testRunExecutionStart,
    testExecutionStartReporting,
    testExecutionStartReportingHeadless,
    testExecutionFinishReporting,
    testRunExecutionFinishReporting,
    sendTestExecutionLogs,
    sendTestScreenshot,
    sendTestArtifact
  }
}
