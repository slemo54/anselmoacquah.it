"use client";

import { useState, type FormEvent } from "react";
import { ContactChannels } from "@/content/site";
import { useLocale } from "@/components/portfolio/LocaleProvider";

const topicKeys = [
  "collaboration",
  "potential",
  "freelance",
  "hi",
] as const;

export function Contact() {
  const { copy } = useLocale();
  const [topic, setTopic] =
    useState<(typeof topicKeys)[number]>("collaboration");
  const [status, setStatus] = useState("");

  const topicLabel = copy[topic];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    const replyTo = String(data.get("email") ?? "").trim();

    setStatus(copy.formStatus);
    window.location.href = ContactChannels.introductionMailto({
      name,
      location,
      topic: topicLabel,
      replyTo,
    });
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
              placeholder={copy.namePlaceholder}
              aria-label={copy.namePlaceholder}
              required
            />{" "}
            <span>{copy.from}</span>{" "}
            <input
              className="inline-input"
              name="location"
              type="text"
              placeholder={copy.locationPlaceholder}
              aria-label={copy.locationPlaceholder}
              required
            />
            . <span>{copy.discuss}</span>{" "}
            <span className="toggle-tags" role="group" aria-label={copy.discuss}>
              {topicKeys.map((key) => (
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
              placeholder={copy.emailPlaceholder}
              aria-label={copy.emailPlaceholder}
              required
            />
            .
          </p>
          <div className="contact-actions">
            <button className="btn btn-primary submit-btn" type="submit">
              <span>{copy.sendIntro}</span> <span>↗</span>
            </button>
            <p className="form-status" aria-live="polite">
              {status}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
