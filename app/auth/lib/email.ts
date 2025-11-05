export function maskEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return email;
  const name = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  const shown = name.slice(0, 2);
  return `${shown}${name.length > 2 ? '*'.repeat(Math.max(1, Math.min(3, name.length - 2))) : ''}${domain}`;
}


