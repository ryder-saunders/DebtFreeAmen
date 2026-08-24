type ForthTokenResponse = {
  access_token?: string;
  token?: string;
  api_key?: string;
  expires_in?: number;
  response?: {
    api_key?: string;
    expires_in?: number;
  };
};

type ForthCreateContactResponse = {
  id?: string | number;
  contact_id?: string | number;
  response?: {
    id?: string | number;
    contact_id?: string | number;
  };
};

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

const FORTH_API_BASE_URL =
  process.env.FORTH_API_BASE_URL ?? "https://api.forthcrm.com/v1";

const stateAbbreviations: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const forthFields = {
  estimatedDebt: process.env.FORTH_FIELD_ESTIMATED_DEBT_ID ?? "749411",
  leadType: process.env.FORTH_FIELD_LEAD_TYPE_ID ?? "749418",
  leadSource: process.env.FORTH_FIELD_LEAD_SOURCE_ID ?? "750639",
  originalDataSource:
    process.env.FORTH_FIELD_ORIGINAL_DATA_SOURCE_ID ?? "750532",
  utmCampaign: process.env.FORTH_FIELD_UTM_CAMPAIGN_ID ?? "774881",
  balanceOfUnsecuredAccounts:
    process.env.FORTH_FIELD_BALANCE_OF_UNSECURED_ACCOUNTS_ID ?? "750771",
  netIncome: process.env.FORTH_FIELD_NET_INCOME_ID ?? "750765",
  strugglingToMakePayments:
    process.env.FORTH_FIELD_STRUGGLING_TO_MAKE_PAYMENTS_ID ?? "760267",
  tellUsMore: process.env.FORTH_FIELD_TELL_US_MORE_ID ?? "750868",
} as const;

let cachedToken: { value: string; expiresAt: number } | undefined;

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

async function getForthAccessToken() {
  const now = Date.now();

  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }

  const response = await fetch(`${FORTH_API_BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: requiredEnv("FORTH_CLIENT_ID"),
      client_secret: requiredEnv("FORTH_CLIENT_SECRET"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Forth auth failed with ${response.status}`);
  }

  const data = (await response.json()) as ForthTokenResponse;
  const token =
    data.access_token ?? data.token ?? data.api_key ?? data.response?.api_key;
  const expiresIn = data.expires_in ?? data.response?.expires_in;

  if (!token) {
    throw new Error("Forth auth did not return an access token");
  }

  cachedToken = {
    value: token,
    expiresAt: now + (expiresIn ? expiresIn * 1000 : 9 * 24 * 60 * 60 * 1000),
  };

  return token;
}

function stateAbbreviation(state: string) {
  return stateAbbreviations[state] ?? state;
}

function optionalCustom(fieldId: string, value: string | undefined) {
  const cleanValue = value?.trim();

  if (!cleanValue) {
    return null;
  }

  return { field_id: fieldId, value: [cleanValue] };
}

function debtAmountEstimate(debtAmount: string) {
  if (debtAmount.includes("$30,000") && debtAmount.includes("$50,000")) {
    return 40_000;
  }

  if (debtAmount.includes("$0") && debtAmount.includes("$30,000")) {
    return 30_000;
  }

  if (debtAmount.includes("$50,000")) {
    return 50_000;
  }

  return null;
}

function estimatedDebtOption(debtAmount: string) {
  if (debtAmount.includes("$30,000") && debtAmount.includes("$50,000")) {
    return "$30,000 - $40,000";
  }

  if (debtAmount.includes("$0") && debtAmount.includes("$30,000")) {
    return "$20,000 - $30,000";
  }

  if (debtAmount.includes("$50,000")) {
    return "$50,000 - $60,000";
  }

  return "";
}

function tellUsMoreSummary(lead: ForthLead) {
  return [
    "Website survey summary",
    `Debt amount: ${lead.debtAmount}`,
    `State of residence: ${lead.stateOfResidence}`,
    `Wants to combine debt into one payment: ${lead.combineDebt}`,
    `Monthly take-home pay: ${lead.takeHomePay}`,
    ...(lead.tellUsMore ? [`Visitor note: ${lead.tellUsMore}`] : []),
  ].join("\n");
}

function contactCustoms(lead: ForthLead) {
  return [
    optionalCustom(
      forthFields.estimatedDebt,
      estimatedDebtOption(lead.debtAmount),
    ),
    optionalCustom(forthFields.balanceOfUnsecuredAccounts, lead.debtAmount),
    optionalCustom(forthFields.netIncome, lead.takeHomePay),
    optionalCustom(forthFields.tellUsMore, tellUsMoreSummary(lead)),
    optionalCustom(forthFields.leadType, "debt-consolidation-intake"),
    optionalCustom(forthFields.leadSource, "Website"),
    optionalCustom(forthFields.strugglingToMakePayments, "Yes"),
    optionalCustom(
      forthFields.originalDataSource,
      process.env.FORTH_LEAD_SOURCE ?? "River Relief Website",
    ),
    optionalCustom(
      forthFields.utmCampaign,
      process.env.FORTH_LEAD_CAMPAIGN ?? "Website Leads",
    ),
  ].filter((custom) => custom !== null);
}

function shouldCreateDebtRecords() {
  return process.env.FORTH_CREATE_DEBT_RECORDS !== "false";
}

function websiteIntakeCreditorId() {
  return process.env.FORTH_WEBSITE_INTAKE_CREDITOR_ID ?? "28280013";
}

async function createForthDebt(
  apiKey: string,
  contactId: string,
  lead: ForthLead,
) {
  const estimatedAmount = debtAmountEstimate(lead.debtAmount);

  if (!estimatedAmount) {
    return;
  }

  const payload = {
    client_id: contactId,
    creditor: websiteIntakeCreditorId(),
    debt_type: "186",
    original_debt_amount: estimatedAmount,
    current_debt_amount: estimatedAmount,
    notes: [
      `Website selected debt amount: ${lead.debtAmount}`,
      `State of residence: ${lead.stateOfResidence}`,
      `Applicant address state: ${stateAbbreviation(lead.stateOfResidence)}`,
      `Combine debt into one payment: ${lead.combineDebt}`,
      `Monthly take-home pay: ${lead.takeHomePay}`,
      ...(lead.surveyId ? [`Survey version: ${lead.surveyId}`] : []),
    ].join("\n"),
  };

  const response = await fetch(`${FORTH_API_BASE_URL}/debts`, {
    method: "POST",
    headers: {
      "Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Forth debt creation failed with ${response.status}: ${responseText}`,
    );
  }
}

export async function createForthLead(lead: ForthLead) {
  const apiKey = await getForthAccessToken();
  const estimatedDebtAmount = debtAmountEstimate(lead.debtAmount);
  const payload = {
    first_name: lead.firstName,
    last_name: lead.lastName,
    email: lead.email,
    phone_number: lead.phone,
    state: lead.stateOfResidence,
    address: {
      address1: "-",
      address2: "",
      address3: "",
      city: "-",
      state: stateAbbreviation(lead.stateOfResidence),
      zip: "00000",
    },
    ...(estimatedDebtAmount ? { total_debt: estimatedDebtAmount } : {}),
    source: process.env.FORTH_LEAD_SOURCE ?? "River Relief Website",
    campaign: process.env.FORTH_LEAD_CAMPAIGN ?? "Website Leads",
    ...(process.env.FORTH_CAMPAIGN_ID
      ? { campaign_id: process.env.FORTH_CAMPAIGN_ID }
      : {}),
    customs: contactCustoms(lead),
  };

  const response = await fetch(`${FORTH_API_BASE_URL}/contacts`, {
    method: "POST",
    headers: {
      "Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Forth lead creation failed with ${response.status}: ${responseText}`,
    );
  }

  const data = (await response
    .json()
    .catch(() => ({}))) as ForthCreateContactResponse;
  const contactId =
    data.response?.contact_id ??
    data.response?.id ??
    data.contact_id ??
    data.id ??
    null;

  if (contactId && shouldCreateDebtRecords()) {
    try {
      await createForthDebt(apiKey, String(contactId), lead);
    } catch (error) {
      console.error(error);
    }
  }

  return { contactId: contactId ? String(contactId) : null };
}
