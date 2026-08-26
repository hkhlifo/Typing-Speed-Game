import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const secret = new TextEncoder().encode(jwtSecret);

export async function createToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  if (!payload.userId || typeof payload.userId !== "string") {
    throw new Error("Invalid token");
  }

  return payload.userId;
}