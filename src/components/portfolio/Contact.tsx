"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/portfolio/LocaleProvider";
import { Language } from "@/i18n/language";
import {
  CONTACT_TOPICS,
  ContactMessage,
  type ContactTopic,
} from "@/lib/contact-message";

type FormStatus = "idle" | "sending" | "success" | "fallback" | "error";

export function Contact() {
  const { copy, locale } = useLocale();
  const i18n = Language.copy(locale);
  const [topic, setTopic] = useState<ContactTopic>("collaboration");
  const [status, setStatus] = useState<FormStatus>("idle");

  const statusMessage =
    status === "sending"
      ? i18n.contact.sending
      : status === "success"
        ? i18n.contact.success
        : status === "fallback"
          ? i18n.contact.fallback
          : status === "error"
            ? i18n.contact.error
            : "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const parsed = ContactMessage.parse({
      name: data.get("name"),
      location: data.get("location"),
      email: data.get("email"),
      topic,
    });
    if (!parsed.ok) {
      setStatus("error");
      return;
    }

    const website = String(data.get("website") ?? "");
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.value,
          website,
          locale,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        fallback?: string;
        href?: string;
      };

      if (result.ok) {
        setStatus("success");
        form.reset();
        setTopic("collaboration");
        return;
      }

      if (result.fallback === "mailto") {
        setStatus("fallback");
        window.location.href =
          result.href || ContactMessage.mailtoHref(parsed.value);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("fallback");
      window.location.href = ContactMessage.mailtoHref(parsed.value);
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-intro">
          <span className="eyebrow">{copy.startConversation}</span>
          <h2 className="section-title">
            {copy.contactTitle.lead}
            <span className="gradient-text">{copy.contactTitle.accent}</span>
          </h2>
        </div>
        <form onSubmit={onSubmit}>
          <p className="contact-sentence">
            <span>{copy.heyName}</span>{" "}
            <input
              className="inline-input"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={copy.namePlaceholder}
              aria-label={i18n.contact.nameAria}
              minLength={2}
              maxLength={80}
              required
            />{" "}
            <span>{copy.from}</span>{" "}
            <input
              className="inline-input"
              name="location"
              type="text"
              autoComplete="address-level2"
              placeholder={copy.locationPlaceholder}
              aria-label={i18n.contact.locationAria}
              minLength={2}
              maxLength={80}
              required
            />
            . <span>{copy.discuss}</span>{" "}
            <span
              className="toggle-tags"
              role="group"
              aria-label={i18n.contact.topicAria}
            >
              {CONTACT_TOPICS.map((key) => (
                <button
                  key={key}
                  className={`toggle-tag${topic === key ? " active" : ""}`}
                  type="button"
                  aria-pressed={topic === key}
                  onClick={() => setTopic(key)}
                >
                  {copy[key]}
                </button>
              ))}
            </span>
            . <span>{copy.reach}</span>{" "}
            <input
              className="inline-input"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={copy.emailPlaceholder}
              aria-label={i18n.contact.emailAria}
              maxLength={120}
              required
            />
            .
          </p>
          <div className="hp" aria-hidden="true">
            <label>
              {i18n.contact.honeypotAria}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>
          <div className="contact-actions">
            <button
              className="btn btn-primary submit-btn"
              type="submit"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending" ? i18n.contact.sending : copy.sendIntro}
              </span>{" "}
              <span>↗</span>
            </button>
            <p
              className={
                status === "error"
                  ? "form-status form-status-error"
                  : "form-status"
              }
              aria-live="polite"
            >
              {statusMessage}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
