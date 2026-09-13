import { NextResponse } from "next/server";
import { ContactDelivery, ContactMessage } from "@/lib/contact-message";
import { RateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  if (ContactMessage.isHoneypot({ website: String(record.website ?? "") })) {
    return NextResponse.json({ ok: true });
  }

  const parsed = ContactMessage.parse(record);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const key = RateLimit.clientKey(request);
  if (!RateLimit.allow(`contact:${key}`)) {
    return NextResponse.json(
      {
        ok: false,
        fallback: "mailto",
        href: ContactMessage.mailtoHref(parsed.value),
      },
      { status: 429 },
    );
  }

  const locale = typeof record.locale === "string" ? record.locale : undefined;

  try {
    const delivered = await ContactDelivery.send(parsed.value, locale);
    if (delivered) {
      return NextResponse.json({ ok: true });
    }
  } catch {
    // Delivery failed; the client falls back to mailto only.
  }

  return NextResponse.json({
    ok: false,
    fallback: "mailto",
    href: ContactMessage.mailtoHref(parsed.value),
  });
}
