export async function sendOtp(email: string): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 1000));
  // In production, call your backend here to send OTP
  // Example:
  // const res = await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ email }) });
  // return { ok: res.ok };
  return { ok: !!email };
}

export async function verifyOtp(email: string, code: string): Promise<{ ok: boolean }> {
  await new Promise((r) => setTimeout(r, 800));
  // Mock success if 6 digits provided; replace with backend call
  // Example:
  // const res = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, code }) });
  // return { ok: res.ok };
  return { ok: !!email && /^\d{6}$/.test(code) };
}


