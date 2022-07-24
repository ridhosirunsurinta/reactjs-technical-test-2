export function getGender(g) {
  switch (g) {
    case 1:
      return "male";
    case 2:
      return "female";
    default:
      return undefined;
  }
}
