import cuid from "cuid";
import fs from "fs";

import makeZebrunnerAPI from "../../../../packages/zebrunner-js/dist";

describe("Cypress Test Session", () => {
  let zeb = null;
  const sessionId = cuid();

  if (Object.keys(Cypress.env()).length === 0) {
    throw Error(
      'You should have "env" field in "cypress.json" file of the project root, use ".env.example" as guide'
    );
  } else {
    const serviceURL = Cypress.env("ZEBRUNNER_SERVICE_URL");
    const projectKey = Cypress.env("ZEBRUNNER_PROJECT_KEY");
    const accessToken = Cypress.env("ZEBRUNNER_ACCESS_TOKEN");

    if (!serviceURL || !projectKey || !accessToken) {
      throw Error("One or many required .env variables missed");
    } else {
      zeb = makeZebrunnerAPI({
        serviceURL,
        projectKey,
        accessToken,
      });
    }
  }

  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });

  it('"sessionStartReporting" should return object', async () => {
    const response = await zeb.sessionStartReporting({
      sessionId,
      startedAt: new Date().toISOString(),
      desiredCapabilities: ["firefox", "macos"],
      capabilities: ["firefox", "macos"],
      testRefs: [123215, 123216, 123217, 123218],
    });

    console.log("sessionStartReportingResponse===", response);

    expect(typeof response).to.equal("object");
  });

  it('"sessionFinishReporting" should return object', async () => {
    const response = await zeb.sessionFinishReporting(sessionId, {
      endedAt: new Date().toISOString(),
      testRefs: [123215, 123216, 123217, 123218],
    });

    console.log("sessionFinishReportingResponse===", response);

    expect(typeof response).to.equal("object");
  });

  it('"sessionPublishArtifact" should return object', async () => {
    const response = await zeb.SessionPublishArtifact(sessionId, {
      name: "jenkins-log-20200604.tar.gz",
      url: "https://ci.organization.org/pipelines/jenkins-log-20200604.tar.gz",
    });

    console.log("SessionPublishArtifactResponse===", response);

    expect(typeof response).to.equal("object");
  });
});
