import bcrypt from "bcryptjs";

export default async function matchRole(role, userRole) {
  const result = await bcrypt.compare(role, userRole);
  return result;
}
