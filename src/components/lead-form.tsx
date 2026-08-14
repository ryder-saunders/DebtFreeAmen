"use client";

import { FormEvent, useState } from "react";

import { CheckIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { surveyQuestions, usStates } from "@/lib/survey-questions";

type SubmitState = "idle" | "submitting" | "success" | "error";

type SurveyData = {
  debtType: string;
  debtAmount: string;
  paymentStruggleDuration: string;
  stateOfResidence: string;
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
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  tellUsMore: "",
  consent: false,
  website: "",
};

export function LeadForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<SurveyData>(initialData);

  function updateField<K extends keyof SurveyData>(
    key: K,
    value: SurveyData[K],
  ) {
    setData((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
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
      className="border-brand-grey-light/40 bg-background grid gap-4 border p-5 shadow-2xl shadow-black/20 sm:p-6"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-brand-accent text-xs font-bold tracking-[0.18em] uppercase">
          {siteConfig.leadForm.eyebrow}
        </p>
        <h2 className="text-brand-blue mt-2 text-2xl leading-tight font-bold">
          {siteConfig.leadForm.heading}
        </h2>
        <p className="text-brand-grey-mid mt-2 text-sm leading-6">
          {siteConfig.leadForm.body}
        </p>
      </div>

      <div className="grid gap-4">
        <SingleSelectField
          label={surveyQuestions.steps[0].label}
          name="debtType"
          options={surveyQuestions.steps[0].options}
          value={data.debtType}
          onChange={(value) => updateField("debtType", value)}
          affirmation={surveyQuestions.steps[0].affirmation}
        />
        <SingleSelectField
          label={surveyQuestions.steps[1].label}
          name="debtAmount"
          options={surveyQuestions.steps[1].options}
          value={data.debtAmount}
          onChange={(value) => updateField("debtAmount", value)}
          affirmation={surveyQuestions.steps[1].affirmation}
        />
        <SingleSelectField
          label={surveyQuestions.steps[2].label}
          name="paymentStruggleDuration"
          options={surveyQuestions.steps[2].options}
          value={data.paymentStruggleDuration}
          onChange={(value) => updateField("paymentStruggleDuration", value)}
          affirmation={surveyQuestions.steps[2].affirmation}
        />
      </div>

      <label className="grid gap-1 text-sm font-semibold">
        {surveyQuestions.steps[3].label}
        <select
          className="border-brand-grey-light/70 min-h-11 border bg-white px-3 font-normal"
          name="stateOfResidence"
          onChange={(event) =>
            updateField("stateOfResidence", event.target.value)
          }
          required
          value={data.stateOfResidence}
        >
          <option value="">Select state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="First name"
          name="firstName"
          onChange={(value) => updateField("firstName", value)}
          required
          value={data.firstName}
        />
        <TextField
          label="Last name"
          name="lastName"
          onChange={(value) => updateField("lastName", value)}
          required
          value={data.lastName}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Email"
          name="email"
          onChange={(value) => updateField("email", value)}
          required
          type="email"
          value={data.email}
        />
        <TextField
          label="Phone"
          name="phone"
          onChange={(value) => updateField("phone", value)}
          required
          type="tel"
          value={data.phone}
        />
      </div>

      <label className="grid gap-1 text-sm font-semibold">
        Tell Us More
        <textarea
          className="border-brand-grey-light/70 min-h-24 border px-3 py-2 font-normal"
          name="tellUsMore"
          onChange={(event) => updateField("tellUsMore", event.target.value)}
          placeholder="Share anything helpful for the first conversation."
          rows={3}
          value={data.tellUsMore}
        />
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

      <button
        className="bg-brand-accent text-brand-blue min-h-12 px-5 text-sm font-bold transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitState === "submitting"}
        type="submit"
      >
        {submitState === "submitting"
          ? "Sending..."
          : "Qualify For Debt Relief"}
      </button>

      <div className="text-brand-grey-mid grid gap-1 text-xs leading-5">
        {siteConfig.leadForm.affirmations.map((affirmation) => (
          <p key={affirmation}>{affirmation}</p>
        ))}
      </div>

      {message ? (
        <p
          className={`text-sm font-semibold ${
            submitState === "error" ? "text-red-700" : "text-green-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function SingleSelectField({
  label,
  name,
  options,
  value,
  affirmation,
  onChange,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  affirmation: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <label
            className={`flex min-h-11 cursor-pointer items-center gap-3 border px-3 text-sm font-semibold transition ${
              value === option
                ? "border-brand-accent bg-brand-accent/10 text-brand-blue"
                : "border-brand-grey-light/50 hover:border-brand-blue"
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
      <p className="bg-brand-accent/10 text-brand-blue flex gap-2 px-3 py-2 text-xs leading-5 font-semibold">
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
        {affirmation}
      </p>
    </fieldset>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: keyof SurveyData;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <input
        className="border-brand-grey-light/70 min-h-11 border px-3 font-normal"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}
