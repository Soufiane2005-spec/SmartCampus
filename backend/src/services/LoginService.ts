// Domaine institutionnel autorisé (à adapter si besoin)
const ALLOWED_DOMAIN = "usms.ac.ma";

export function isInstitutionalEmail(email: string): boolean {
  return email.toLowerCase().endsWith("@" + ALLOWED_DOMAIN);
}
