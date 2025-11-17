export function getUsernameFromEmail(email: string | null): string {
  if (!email) return "User";
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
