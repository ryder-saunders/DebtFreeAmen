"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";

import { surveyQuestions, usStates } from "../_lib/survey-questions";
import { ArrowRightIcon, CheckIcon } from "./icons";

type SubmitState = "idle" | "submitting" | "success" | "error";

type SurveyData = {
  debtType: string;
  debtAmount: string;
  paymentStruggleDuration: string;
  stateOfResidence: string;
  combineDebt: string;
  takeHomePay: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tellUsMore: string;
  consent: boolean;
  website: string;
};

const initialData: SurveyData = {
  debtType: "",
  debtAmount: "",
  paymentStruggleDuration: "",
  stateOfResidence: "",
  combineDebt: "",
  takeHomePay: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  tellUsMore: "",
  consent: false,
  website: "",
};

const steps = [
  "debtAmount",
  "stateOfResidence",
  "combineDebt",
  "takeHomePay",
  "name",
  "email",
  "phone",
] as const;

type StepId = (typeof steps)[number];

const questionLabelClass = "text-[1.35rem] leading-snug font-bold";
const fieldLabelClass = "grid gap-2 text-base leading-snug font-bold";
const inputClass =
  "border-brand-grey-light text-brand-grey-dark h-10 border px-3 text-base font-normal";

export function LeadForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<SurveyData>(initialData);

  const stepId = steps[stepIndex];
  const canGoNext = useMemo(() => isStepComplete(stepId, data), [data, stepId]);

  function updateField<K extends keyof SurveyData>(
    key: K,
    value: SurveyData[K],
  ) {
    setMessage("");
    setData((current) => ({ ...current, [key]: value }));
  }

  function handleNext() {
    if (!canGoNext) {
      setMessage("Please complete this step before continuing.");
      return;
    }

    setMessage("");
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  }

  function handlePrevious() {
    setMessage("");
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function autoAdvance() {
    setMessage("");
    window.setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, steps.length - 1));
    }, 180);
  }

  function updatePhone(value: string) {
    updateField("phone", formatPhoneNumber(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isStepComplete(stepId, data)) {
      setMessage("Please complete this step before continuing.");
      return;
    }

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          debtType: data.debtType || "Credit Card Debt",
          landingPage: window.location.pathname,
          source: "amen-lp",
          surveyId: surveyQuestions.id,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "We could not send the review yet.");
      }

      setSubmitState("success");
      setMessage(
        result.message ?? "Thanks. River Relief has your review request.",
      );
      setData(initialData);
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not send the review yet.",
      );
    }
  }

  return (
    <form
      className="border-brand-grey-light/30 bg-background overflow-hidden border shadow-2xl shadow-black/25"
      onSubmit={handleSubmit}
    >
      <div className="bg-brand-tan h-2">
        <div
          className="bg-brand-accent h-full transition-all"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="text-brand-blue flex flex-col gap-4 p-5 sm:p-7">
        <StepContent
          autoAdvance={autoAdvance}
          data={data}
          stepId={stepId}
          updatePhone={updatePhone}
          updateField={updateField}
        />

        {message ? (
          <p
            className={`text-sm font-semibold ${
              submitState === "error" ? "text-red-700" : "text-brand-blue"
            }`}
          >
            {message}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-3 py-2.5">
          <button
            className="text-brand-grey-mid hover:text-brand-blue min-h-10 px-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-35"
            disabled={stepIndex === 0 || submitState === "submitting"}
            onClick={handlePrevious}
            type="button"
          >
            ← Previous
          </button>
          {stepIndex === steps.length - 1 ? (
            <button
              className="bg-brand-accent glow-cta hover:bg-brand-blue min-h-11 rounded-[6px] px-6 text-[15px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitState === "submitting"}
              type="submit"
            >
              {submitState === "submitting" ? "Sending..." : "Get My Options"}
            </button>
          ) : (
            <button
              className="bg-brand-accent glow-cta hover:bg-brand-blue inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] px-6 text-[15px] font-bold text-white transition"
              onClick={handleNext}
              type="button"
            >
              Next
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function StepContent({
  autoAdvance,
  data,
  stepId,
  updatePhone,
  updateField,
}: {
  autoAdvance: () => void;
  data: SurveyData;
  stepId: StepId;
  updatePhone: (value: string) => void;
  updateField: <K extends keyof SurveyData>(
    key: K,
    value: SurveyData[K],
  ) => void;
}) {
  if (stepId === "debtAmount") {
    return (
      <div className="grid gap-4">
        <SingleSelectField
          label="How much debt do you need help with?"
          name="debtAmount"
          options={surveyQuestions.steps[1].options}
          value={data.debtAmount}
          onChange={(value) => {
            updateField("debtAmount", value);
            autoAdvance();
          }}
        />
        <DebtTypeNotes />
      </div>
    );
  }

  if (stepId === "stateOfResidence") {
    return (
      <label className="grid gap-2">
        <QuestionLabel>What is your State of Residence?</QuestionLabel>
        <select
          autoComplete="address-level1"
          className={`${inputClass} bg-white`}
          name="stateOfResidence"
          onChange={(event) => {
            updateField("stateOfResidence", event.target.value);
            if (event.target.value) {
              autoAdvance();
            }
          }}
          required
          value={data.stateOfResidence}
        >
          <option value="">Select your state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (stepId === "combineDebt") {
    return (
      <SingleSelectField
        label="Would you like to combine your debt into one simple monthly payment?"
        name="combineDebt"
        options={["Yes", "No"]}
        value={data.combineDebt}
        onChange={(value) => {
          updateField("combineDebt", value);
          autoAdvance();
        }}
      />
    );
  }

  if (stepId === "takeHomePay") {
    return (
      <SingleSelectField
        label="What's your monthly take-home pay?"
        name="takeHomePay"
        options={[
          "$0 - $3,000",
          "$3,000 - $5,000",
          "$5,000 - $7,500",
          "$7,500+",
        ]}
        value={data.takeHomePay}
        onChange={(value) => {
          updateField("takeHomePay", value);
          autoAdvance();
        }}
        helperText="After taxes, the amount that actually hits your bank account each month."
      />
    );
  }

  if (stepId === "name") {
    return (
      <div className="grid gap-4">
        <QuestionLabel>What is your name?</QuestionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            autoComplete="given-name"
            label="First Name"
            name="firstName"
            onChange={(value) => updateField("firstName", value)}
            required
            value={data.firstName}
          />
          <TextField
            autoComplete="family-name"
            label="Last Name"
            name="lastName"
            onChange={(value) => updateField("lastName", value)}
            required
            value={data.lastName}
          />
        </div>
      </div>
    );
  }

  if (stepId === "email") {
    return (
      <QuestionTextField
        autoComplete="email"
        label="Confirm Your Email"
        name="email"
        onChange={(value) => updateField("email", value)}
        placeholder="Email"
        required
        type="email"
        value={data.email}
      />
    );
  }

  return (
    <div className="grid gap-4">
      <QuestionTextField
        autoComplete="tel"
        inputMode="tel"
        label="What is your phone number?"
        maxLength={14}
        name="phone"
        onChange={updatePhone}
        placeholder="(555) 555-5555"
        required
        type="tel"
        value={data.phone}
      />
      <label className="text-brand-grey-mid flex items-start gap-3 text-[11px] leading-5 sm:text-xs">
        <input
          checked={data.consent}
          className="accent-brand-blue mt-0.5 h-4 w-4 shrink-0"
          name="consent"
          onChange={(event) => updateField("consent", event.target.checked)}
          required
          type="checkbox"
        />
        <span>{surveyQuestions.steps[4].fields[5].label}</span>
      </label>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        onChange={(event) => updateField("website", event.target.value)}
        tabIndex={-1}
        type="text"
        value={data.website}
      />
    </div>
  );
}

function SingleSelectField({
  label,
  name,
  options,
  value,
  onChange,
  helperText,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
}) {
  return (
    <fieldset>
      <legend className={`${questionLabelClass} mb-4`}>{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <label
            className={`flex min-h-10 cursor-pointer items-center gap-3 border px-3 py-2 text-sm font-semibold transition ${
              value === option
                ? "border-brand-accent bg-brand-accent/10 text-brand-blue"
                : "border-brand-grey-light/60 text-brand-grey-dark hover:border-brand-blue bg-white"
            }`}
            key={option}
          >
            <input
              checked={value === option}
              className="accent-brand-blue"
              name={name}
              onChange={() => onChange(option)}
              required
              type="radio"
              value={option}
            />
            {option}
          </label>
        ))}
      </div>
      {helperText ? (
        <p className="text-brand-grey-mid mt-4 text-sm leading-6 font-normal">
          {helperText}
        </p>
      ) : null}
    </fieldset>
  );
}

function DebtTypeNotes() {
  return (
    <div className="grid gap-3 text-xs font-bold tracking-wide uppercase">
      <div className="border border-green-400 bg-green-50 p-3 text-green-900">
        <p>Eligible debt types</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] normal-case">
          {[
            "Credit Card Debt",
            "Personal Loans",
            "Medical Debt",
            "Private Student Loans",
            "Business Debt",
          ].map((item) => (
            <span
              className="rounded-full border border-green-400 bg-green-100 px-2 py-1"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="border border-red-300 bg-red-50 p-3 text-red-900 opacity-75">
        <p>Do not include</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] normal-case">
          {["Rent", "Mortgage", "Utilities", "Vehicles"].map((item) => (
            <span
              className="rounded-full border border-red-200 bg-white px-2 py-1"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="bg-brand-accent/10 text-brand-blue flex gap-2 px-3 py-2 text-xs leading-5 font-semibold tracking-normal normal-case">
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />A range is enough.
        River Relief can help you compare options without shame.
      </p>
    </div>
  );
}

function TextField({
  autoComplete,
  inputMode,
  label,
  maxLength,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal";
  label: string;
  maxLength?: number;
  name: keyof SurveyData;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className={fieldLabelClass}>
      <span>{label}</span>
      <input
        autoComplete={autoComplete}
        className={inputClass}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function QuestionTextField({
  autoComplete,
  inputMode,
  label,
  maxLength,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal";
  label: string;
  maxLength?: number;
  name: keyof SurveyData;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <QuestionLabel>{label}</QuestionLabel>
      <input
        autoComplete={autoComplete}
        className={inputClass}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function QuestionLabel({ children }: { children: ReactNode }) {
  return <span className={questionLabelClass}>{children}</span>;
}

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isStepComplete(stepId: StepId, data: SurveyData) {
  if (stepId === "debtAmount") return Boolean(data.debtAmount);
  if (stepId === "stateOfResidence") return Boolean(data.stateOfResidence);
  if (stepId === "combineDebt") return Boolean(data.combineDebt);
  if (stepId === "takeHomePay") return Boolean(data.takeHomePay);
  if (stepId === "name") return Boolean(data.firstName && data.lastName);
  if (stepId === "email") return Boolean(data.email);
  return Boolean(data.phone && data.consent);
}
