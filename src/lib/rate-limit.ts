type Bucket = { count: number; resetAt: number };

export class RateLimit {
  private static readonly buckets = new Map<string, Bucket>();

  static allow(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
    const now = Date.now();
    const current = RateLimit.buckets.get(key);

    if (!current || current.resetAt <= now) {
      RateLimit.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  }

  static clientKey(request: Request) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
    return request.headers.get("x-real-ip") || "local";
  }
}
