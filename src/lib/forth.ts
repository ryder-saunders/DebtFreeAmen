export type ForthLead = {
  debtAmount: string;
  stateOfResidence: string;
  combineDebt: string;
  takeHomePay: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tellUsMore?: string;
  surveyId?: string;
  submittedAt: string;
};

type ForthDataSourceResult = {
  contactId: string | null;
};

function dataSourcePostUrl() {
  const url = process.env.FORTH_DATA_SOURCE_POST_URL?.trim();

  if (!url) {
    throw new Error("Missing FORTH_DATA_SOURCE_POST_URL");
  }

  return url;
}

function cleanValue(value: string | undefined) {
  const clean = value?.trim();

  return clean || null;
}

function appendIfPresent(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
) {
  const clean = cleanValue(value);

  if (clean) {
    params.set(key, clean);
  }
}

function buildForthDataSourceParams(lead: ForthLead) {
  const params = new URLSearchParams();

  appendIfPresent(params, "FirstName", lead.firstName);
  appendIfPresent(params, "first_name", lead.firstName);
  appendIfPresent(params, "LastName", lead.lastName);
  appendIfPresent(params, "last_name", lead.lastName);
  appendIfPresent(params, "Email", lead.email);
  appendIfPresent(params, "EmailAddress", lead.email);
  appendIfPresent(params, "HomePhone", lead.phone);
  appendIfPresent(params, "Phone", lead.phone);
  appendIfPresent(params, "State", lead.stateOfResidence);
  appendIfPresent(params, "How_much_total_debt_are_you_in", lead.debtAmount);
  appendIfPresent(params, "Net_Income", lead.takeHomePay);

  return params;
}

function contactIdFromResponse(responseText: string) {
  const trimmed = responseText.trim();
  const successMatch = /^Success:?\s*(\d+)?$/i.exec(trimmed);

  if (successMatch) {
    return successMatch[1] ?? null;
  }

  return null;
}

export async function createForthLead(
  lead: ForthLead,
): Promise<ForthDataSourceResult> {
  const url = new URL(dataSourcePostUrl());
  const params = buildForthDataSourceParams(lead);

  for (const [key, value] of params) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, { method: "POST" });
  const responseText = await response.text();

  if (!response.ok || !/^Success/i.test(responseText.trim())) {
    throw new Error(
      `Forth data source post failed with ${response.status}: ${responseText}`,
    );
  }

  return { contactId: contactIdFromResponse(responseText) };
}
