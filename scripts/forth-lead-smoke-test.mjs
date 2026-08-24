import { spawn } from "node:child_process";
import http from "node:http";
import { setTimeout as delay } from "node:timers/promises";

const APP_ORIGIN = process.env.LEAD_TEST_APP_ORIGIN ?? "http://127.0.0.1:3037";
const MOCK_FORTH_ORIGIN =
  process.env.LEAD_TEST_MOCK_FORTH_ORIGIN ?? "http://127.0.0.1:4317";
const MOCK_FORTH_BASE_URL = `${MOCK_FORTH_ORIGIN}/v1`;

const requests = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function startMockForth() {
  const server = http.createServer((request, response) => {
    const chunks = [];

    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      const bodyText = Buffer.concat(chunks).toString("utf8");
      const body = bodyText ? JSON.parse(bodyText) : null;

      requests.push({
        body,
        headers: request.headers,
        method: request.method,
        url: request.url,
      });
      response.setHeader("content-type", "application/json");

      if (request.method === "POST" && request.url === "/v1/auth/token") {
        response.end(
          JSON.stringify({
            response: { api_key: "mock-api-key", expires_in: 86_400 },
            status: { code: 200 },
          }),
        );
        return;
      }

      if (request.method === "POST" && request.url === "/v1/contacts") {
        response.end(
          JSON.stringify({
            response: { id: 987_654_321 },
            status: { code: 200 },
          }),
        );
        return;
      }

      if (request.method === "POST" && request.url === "/v1/debts") {
        response.end(
          JSON.stringify({
            response: { id: 123_456_789 },
            status: { code: 200 },
          }),
        );
        return;
      }

      response.statusCode = 404;
      response.end(JSON.stringify({ error: "not found" }));
    });
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
        FORTH_API_BASE_URL: MOCK_FORTH_BASE_URL,
        FORTH_CLIENT_ID: "test-client-id",
        FORTH_CLIENT_SECRET: "test-client-secret",
        FORTH_LEAD_CAMPAIGN: "Website Leads Test",
        FORTH_LEAD_SOURCE: "River Relief Website Test",
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

function customsById(payload) {
  return Object.fromEntries(
    (payload.customs ?? []).map((item) => [item.field_id, item.value?.[0]]),
  );
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

function assertContactPayload(payload) {
  const customs = customsById(payload);

  assert(payload.first_name === "Api", "Missing first_name");
  assert(payload.last_name === "Smoke", "Missing last_name");
  assert(payload.email === "api.smoke@example.com", "Missing email");
  assert(payload.phone_number === "5551112222", "Missing phone_number");
  assert(payload.state === "Florida", "Missing state");
  assert(payload.address?.state === "FL", "Missing address state");
  assert(payload.address?.address1 === "-", "Missing address1 placeholder");
  assert(payload.address?.city === "-", "Missing city placeholder");
  assert(payload.address?.zip === "00000", "Missing zip placeholder");
  assert(payload.address?.address2 === "", "Missing address2 blank value");
  assert(payload.address?.address3 === "", "Missing address3 blank value");
  assert(payload.total_debt === 40000, "Missing total_debt estimate");
  assert(payload.source === "River Relief Website Test", "Missing source");
  assert(payload.campaign === "Website Leads Test", "Missing campaign");
  assert(!payload.notes, "Contact payload should not include notes");
  assert(!payload.landingPage, "Contact payload should not include URL data");

  assert(customs["749411"] === "$30,000 - $40,000", "Bad estimated debt");
  assert(customs["750771"] === "$30,000 - $50,000", "Bad unsecured balance");
  assert(customs["750765"] === "$3,000 - $5,000", "Bad net income");
  assert(customs["749418"] === "debt-consolidation-intake", "Bad lead type");
  assert(customs["750639"] === "Website", "Bad lead source");
  assert(customs["760267"] === "Yes", "Bad struggling-to-pay value");
  assert(customs["750532"] === "River Relief Website Test", "Bad source");
  assert(customs["774881"] === "Website Leads Test", "Bad campaign");
  assert(
    customs["750868"]?.includes("Website survey summary"),
    "Missing survey summary",
  );
  assert(!customs["749414"], "Hardship Description must not be sent");
}

function assertDebtPayload(payload) {
  assert(payload.client_id === "987654321", "Missing debt client_id");
  assert(payload.creditor === "28280013", "Missing creditor");
  assert(payload.debt_type === "186", "Debt type should be Unknown");
  assert(payload.original_debt_amount === 40000, "Bad original debt amount");
  assert(payload.current_debt_amount === 40000, "Bad current debt amount");
  assert(payload.notes.includes("Applicant address state: FL"), "Bad notes");
  assert(!payload.notes.includes("Consent"), "Notes should omit consent");
  assert(!payload.notes.includes("landing"), "Notes should omit URL data");
}

async function main() {
  const mockForth = await startMockForth();
  const nextDev = startNextDev();

  try {
    await waitForApp();
    await postLead();

    const authPosts = requests.filter(
      (request) =>
        request.method === "POST" && request.url === "/v1/auth/token",
    );
    const contactPosts = requests.filter(
      (request) => request.method === "POST" && request.url === "/v1/contacts",
    );
    const debtPosts = requests.filter(
      (request) => request.method === "POST" && request.url === "/v1/debts",
    );

    assert(
      authPosts.length === 1,
      `Expected 1 auth post, saw ${authPosts.length}`,
    );
    assert(
      contactPosts.length === 1,
      `Expected 1 contact post, saw ${contactPosts.length}`,
    );
    assert(
      debtPosts.length === 1,
      `Expected 1 debt post, saw ${debtPosts.length}`,
    );
    assertContactPayload(contactPosts[0].body);
    assertDebtPayload(debtPosts[0].body);

    console.log("Forth lead smoke test passed.");
  } finally {
    mockForth.close();
    nextDev.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
