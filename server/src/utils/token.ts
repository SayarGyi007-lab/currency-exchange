import { config } from '../config/config';
import jwt from "jsonwebtoken";

const generateTokens = (id: string, role: string) => {
  const accessToken = jwt.sign(
    { id, role },
    config.JWT_ACCESS_TOKEN!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id },
    config.JWT_REFRESH_TOKEN!,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;