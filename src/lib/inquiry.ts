export type InquiryResult = {
  ok: boolean;
  demo: boolean;
  message?: string;
};

export async function submitInquiry(payload: Record<string, unknown>): Promise<InquiryResult> {
  const endpoint = (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined)?.trim();

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    console.info('[Maniesta demo] Inquiry not sent:', payload);
    return { ok: true, demo: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        ok: false,
        demo: false,
        message: `We couldn't send your inquiry (error ${response.status}). Please try again or email us directly.`,
      };
    }

    return { ok: true, demo: false };
  } catch {
    return {
      ok: false,
      demo: false,
      message: 'A network error prevented your inquiry from sending. Please try again or email us directly.',
    };
  }
}