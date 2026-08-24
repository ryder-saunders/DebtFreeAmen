import { NextResponse } from "next/server";

import { createForthLead } from "@/lib/forth";

type LeadPayload = {
  debtType?: string;
  debtAmount?: string;
  paymentStruggleDuration?: string;
  stateOfResidence?: string;
  combineDebt?: string;
  takeHomePay?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tellUsMore?: string;
  consent?: boolean;
  landingPage?: string;
  source?: string;
  surveyId?: string;
  website?: string;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (cleanString(payload.website)) {
    return NextResponse.json({
      message: "Thanks. River Relief has your review request.",
      forwarded: false,
    });
  }

  const lead = {
    debtType: cleanString(payload.debtType),
    debtAmount: cleanString(payload.debtAmount),
    paymentStruggleDuration: cleanString(payload.paymentStruggleDuration),
    stateOfResidence: cleanString(payload.stateOfResidence),
    combineDebt: cleanString(payload.combineDebt),
    takeHomePay: cleanString(payload.takeHomePay),
    firstName: cleanString(payload.firstName),
    lastName: cleanString(payload.lastName),
    email: cleanString(payload.email).toLowerCase(),
    phone: cleanString(payload.phone).replace(/[^\d+]/g, ""),
    tellUsMore: cleanString(payload.tellUsMore),
    consent: payload.consent === true,
    landingPage: cleanString(payload.landingPage),
    source: cleanString(payload.source) || "amen-lp",
    surveyId:
      cleanString(payload.surveyId) || "river-relief-debt-review-core-v1",
    submittedAt: new Date().toISOString(),
  };

  const requiredFields: Array<keyof typeof lead> = [
    "debtAmount",
    "stateOfResidence",
    "combineDebt",
    "takeHomePay",
    "firstName",
    "lastName",
    "email",
    "phone",
    "landingPage",
  ];

  const missingField = requiredFields.find((field) => !lead[field]);

  if (missingField) {
    return NextResponse.json(
      { message: "Please complete every required field." },
      { status: 400 },
    );
  }

  if (!lead.consent) {
    return NextResponse.json(
      { message: "Please confirm consent before submitting." },
      { status: 400 },
    );
  }

  if (!isEmail(lead.email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const forthResult = await createForthLead({
      combineDebt: lead.combineDebt,
      debtAmount: lead.debtAmount,
      email: lead.email,
      firstName: lead.firstName,
      lastName: lead.lastName,
      phone: lead.phone,
      stateOfResidence: lead.stateOfResidence,
      submittedAt: lead.submittedAt,
      surveyId: lead.surveyId,
      takeHomePay: lead.takeHomePay,
      tellUsMore: lead.tellUsMore,
    });

    return NextResponse.json({
      message: "Thanks. River Relief has your review request.",
      forwarded: true,
      forthContactId: forthResult.contactId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "We could not send the review yet. Please call River Relief.",
      },
      { status: 502 },
    );
  }
}
