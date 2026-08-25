import { spawn } from "node:child_process";
import http from "node:http";
import { setTimeout as delay } from "node:timers/promises";

const APP_ORIGIN = process.env.LEAD_TEST_APP_ORIGIN ?? "http://127.0.0.1:3037";
const MOCK_FORTH_ORIGIN =
  process.env.LEAD_TEST_MOCK_FORTH_ORIGIN ?? "http://127.0.0.1:4317";
const MOCK_FORTH_POST_URL = `${MOCK_FORTH_ORIGIN}/post/test-data-source/`;

const requests = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function startMockForth() {
  const server = http.createServer((request, response) => {
    requests.push({
      method: request.method,
      url: request.url,
    });

    if (
      request.method === "POST" &&
      request.url.startsWith("/post/test-data-source/")
    ) {
      response.end("Success:987654321");
      return;
    }

    response.statusCode = 404;
    response.end("Not found");
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(new URL(MOCK_FORTH_ORIGIN).port, "127.0.0.1", () =>
      resolve(server),
    );
  });
}

function startNextDev() {
  const child = spawn(
    "npm",
    ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3037"],
    {
      env: {
        ...process.env,
        FORTH_DATA_SOURCE_POST_URL: MOCK_FORTH_POST_URL,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));

  return child;
}

async function waitForApp() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(APP_ORIGIN);

      if (response.ok) {
        return;
      }
    } catch {
      // The dev server is still starting.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for ${APP_ORIGIN}`);
}

async function postLead() {
  const response = await fetch(`${APP_ORIGIN}/api/leads`, {
    body: JSON.stringify({
      combineDebt: "Yes",
      consent: true,
      debtAmount: "$30,000 - $50,000",
      email: "api.smoke@example.com",
      firstName: "Api",
      landingPage: "/",
      lastName: "Smoke",
      phone: "(555) 111-2222",
      stateOfResidence: "Florida",
      surveyId: "river-relief-debt-review-core-v1",
      takeHomePay: "$3,000 - $5,000",
      tellUsMore: "",
      website: "",
    }),
    headers: { "content-type": "application/json" },
    method: "POST",
  });

  const body = await response.json();
  assert(response.status === 200, `Lead submission failed: ${response.status}`);
  assert(body.forwarded === true, "Lead response should report forwarded=true");
  assert(
    body.forthContactId === "987654321",
    "Lead response should include mock Forth contact ID",
  );
}

function assertDataSourcePayload(requestUrl) {
  const url = new URL(requestUrl, MOCK_FORTH_ORIGIN);

  assert(url.searchParams.get("FirstName") === "Api", "Missing FirstName");
  assert(url.searchParams.get("first_name") === "Api", "Missing first_name");
  assert(url.searchParams.get("LastName") === "Smoke", "Missing LastName");
  assert(url.searchParams.get("last_name") === "Smoke", "Missing last_name");
  assert(
    url.searchParams.get("Email") === "api.smoke@example.com",
    "Missing Email",
  );
  assert(
    url.searchParams.get("EmailAddress") === "api.smoke@example.com",
    "Missing EmailAddress",
  );
  assert(
    url.searchParams.get("HomePhone") === "5551112222",
    "Missing HomePhone",
  );
  assert(url.searchParams.get("Phone") === "5551112222", "Missing Phone");
  assert(url.searchParams.get("State") === "Florida", "Missing State");
  assert(
    url.searchParams.get("How_much_total_debt_are_you_in") ===
      "$30,000 - $50,000",
    "Missing selected debt range",
  );
  assert(
    url.searchParams.get("Net_Income") === "$3,000 - $5,000",
    "Missing Net_Income",
  );
  assert(
    !url.searchParams.has("Tell_us_more"),
    "Tell_us_more must not be sent",
  );
  assert(!url.searchParams.has("Address"), "Address must not be sent");
  assert(!url.searchParams.has("City"), "City must not be sent");
  assert(!url.searchParams.has("DOB"), "DOB must not be sent");
  assert(!url.searchParams.has("Campaign"), "Campaign must not be sent");
}

async function main() {
  const mockForth = await startMockForth();
  const nextDev = startNextDev();

  try {
    await waitForApp();
    await postLead();

    const dataSourcePosts = requests.filter(
      (request) =>
        request.method === "POST" &&
        request.url.startsWith("/post/test-data-source/"),
    );

    assert(
      dataSourcePosts.length === 1,
      `Expected 1 Forth data source post, saw ${dataSourcePosts.length}`,
    );
    assertDataSourcePayload(dataSourcePosts[0].url);

    console.log("Forth data source lead smoke test passed.");
  } finally {
    mockForth.close();
    nextDev.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
