import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from "node:crypto";

/**
 * Password hashing for dashboard sign-in: scrypt (N=2^15, r=8, p=1), a 16-byte random salt and a
 * 32-byte key, stored as "scrypt$<N>$<r>$<p>$<salt>$<key>". Passwords themselves are never stored
 * or logged; only this string is.
 */
const N = 2 ** 15, R = 8, P = 1, KEYLEN = 32;

function scrypt(password: string, salt: Buffer, o: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scryptCb(password.normalize("NFKC"), salt, KEYLEN, { ...o, maxmem: 128 * o.N! * o.r! * 2 }, (e, k) => (e ? reject(e) : resolve(k))));
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, { N, r: R, p: P });
  return ["scrypt", N, R, P, salt.toString("base64url"), key.toString("base64url")].join("$");
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, n, r, p, salt, key] = parts as [string, string, string, string, string, string];
  const expected = Buffer.from(key, "base64url");
  const got = await scrypt(password, Buffer.from(salt, "base64url"), { N: Number(n), r: Number(r), p: Number(p) });
  return got.length === expected.length && timingSafeEqual(got, expected);
}

/** Why a new password is refused, or null. Length over composition rules (NIST 800-63B). */
export function passwordProblem(password: string, email?: string): string | null {
  if (password.length < 12) return "use at least 12 characters";
  if (password.length > 200) return "use at most 200 characters";
  if (email && password.toLowerCase().includes(email.split("@")[0]!.toLowerCase()) && email.split("@")[0]!.length >= 4) return "don't use your email name in the password";
  if (/^(.)\1+$/.test(password)) return "use more than one repeated character";
  return null;
}

/** A hash to compare against when no user matches, so a miss takes as long as a wrong password. */
let dummy: Promise<string> | null = null;
export function dummyHash(): Promise<string> {
  dummy ??= hashPassword(randomBytes(18).toString("base64url"));
  return dummy;
}
