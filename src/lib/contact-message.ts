import { Site } from "@/lib/site";

export const CONTACT_TOPICS = [
  "collaboration",
  "potential",
  "freelance",
  "hi",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export type ContactPayload = {
  name: string;
  location: string;
  email: string;
  topic: ContactTopic;
};

export type ContactRequest = ContactPayload & {
  website?: string;
  locale?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 80;
const LOCATION_MAX = 80;
const EMAIL_MAX = 120;

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export class ContactMessage {
  static isTopic(value: string): value is ContactTopic {
    return (CONTACT_TOPICS as readonly string[]).includes(value);
  }

  static isHoneypot(input: { website?: string }) {
    return Boolean(asTrimmedString(input.website));
  }

  static parse(
    input: unknown,
  ): { ok: true; value: ContactPayload } | { ok: false; error: string } {
    if (!input || typeof input !== "object") {
      return { ok: false, error: "invalid" };
    }

    const data = input as Record<string, unknown>;
    const name = asTrimmedString(data.name);
    const location = asTrimmedString(data.location);
    const email = asTrimmedString(data.email).toLowerCase();
    const topic = asTrimmedString(data.topic);

    if (name.length < 2 || name.length > NAME_MAX) {
      return { ok: false, error: "name" };
    }
    if (location.length < 2 || location.length > LOCATION_MAX) {
      return { ok: false, error: "location" };
    }
    if (!EMAIL_PATTERN.test(email) || email.length > EMAIL_MAX) {
      return { ok: false, error: "email" };
    }
    if (!ContactMessage.isTopic(topic)) {
      return { ok: false, error: "topic" };
    }

    return { ok: true, value: { name, location, email, topic } };
  }

  static topicLabel(topic: ContactTopic) {
    switch (topic) {
      case "collaboration":
        return "Collaboration";
      case "potential":
        return "Potential project";
      case "freelance":
        return "Freelance work";
      case "hi":
        return "Just saying hi";
    }
  }

  static subject(payload: ContactPayload) {
    return `${ContactMessage.topicLabel(payload.topic)} inquiry from ${payload.name}`;
  }

  static textBody(payload: ContactPayload, locale?: string) {
    const lines = [
      `Hey Anselmo,`,
      ``,
      `My name is ${payload.name} and I am from ${payload.location}.`,
      `I would like to discuss: ${ContactMessage.topicLabel(payload.topic)}.`,
      ``,
      `You can reach me at ${payload.email}.`,
    ];
    if (locale) lines.push(``, `Language: ${locale}`);
    return lines.join("\n");
  }

  static mailtoHref(payload: ContactPayload) {
    return Site.mailto(
      ContactMessage.subject(payload),
      ContactMessage.textBody(payload),
    );
  }
}

export class ContactDelivery {
  static async send(payload: ContactPayload, locale?: string) {
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM?.trim() ||
            `${Site.displayName} Portfolio <noreply@anselmoacquah.it>`,
          to: [Site.email],
          reply_to: payload.email,
          subject: ContactMessage.subject(payload),
          text: ContactMessage.textBody(payload, locale),
        }),
        signal: AbortSignal.timeout(8000),
      });
      return response.ok;
    }

    const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: Site.email,
          ...payload,
          locale,
          subject: ContactMessage.subject(payload),
          text: ContactMessage.textBody(payload, locale),
        }),
        signal: AbortSignal.timeout(8000),
      });
      return response.ok;
    }

    return false;
  }
}
