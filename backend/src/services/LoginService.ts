// Domaine institutionnel autorisé (à adapter si besoin)
const ALLOWED_DOMAIN = "usms.ac.ma";

// Compte de démonstration : simulation, la vraie base viendra plus tard
const DEMO_USER = { email: "etudiant@usms.ac.ma", password: "motdepasse1" };

export type LoginResult = { success: boolean; message: string };

export function isInstitutionalEmail(email: string): boolean {
  return email.toLowerCase().endsWith("@" + ALLOWED_DOMAIN);
}

export function login(email: string, password: string): LoginResult {
  if (!isInstitutionalEmail(email)) {
    return { success: false, message: "Utilisez votre e-mail institutionnel." };
  }
  if (email.toLowerCase() !== DEMO_USER.email || password !== DEMO_USER.password) {
    return { success: false, message: "E-mail ou mot de passe incorrect" };
  }
  return { success: true, message: "Connexion réussie" };
}
