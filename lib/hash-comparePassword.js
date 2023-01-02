import bcrypt from "bcrypt";

export const hashedPassword = async (text) => {
  const hashedPassword = await bcrypt.hash(text, 12);
  return hashedPassword;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};
