export function toTwoDecimals(number) {
  // Calcule chiffre par chiffre en base 10 et évite surprises d'arrondi flottant
  return Math.round((Number(number) + Number.EPSILON) * 100) / 100;
}
