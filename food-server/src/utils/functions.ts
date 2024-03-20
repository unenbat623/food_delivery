import bcrypt from "bcrypt";

export const otp = (digit: number) => {
  return Math.round(Math.random() * Math.pow(10, digit))
    .toString()
    .padStart(4, "0");
};

export const generateHash = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  const createdHash = await bcrypt.hash(data, salt);
  return createdHash;
};
