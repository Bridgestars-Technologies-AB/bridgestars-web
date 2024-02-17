import crypto from "crypto";
export const defaultAlgorithm = "aes256";

function ensureProperOptions(algorithm: string, key: string) {
  if (!key) {
    throw new TypeError("options.key argument is required to encrypt a string");
  }

  if (algorithm === "aes256" && key.length !== 32) {
    const errorLabel = `A 32-bits key must be used with aes256. Given: ${key.length} (${key}-bits)`;
    throw new Error(errorLabel);
  }
}

/**
 * Encrypt cookie string
 *
 * @param  {String} str     Cookie string
 * @param  {Object} options
 * @param  {Object} options.algorithm Algorithm to use to encrypt data
 * @param  {Object} options.key       Key to use to encrypt data
 *
 * @return {String}
 */
export function encryptCookie(
  str: string,
  options: { algorithm: string; key: string } = { algorithm: "", key: "" },
): string {
  const key = options.key;
  const algorithm = options.algorithm || defaultAlgorithm;

  ensureProperOptions(algorithm, key);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = [
    iv.toString("hex"),
    ":",
    cipher.update(str, "utf8", "hex"),
    cipher.final("hex"),
  ];

  return encrypted.join("");
}

/**
 * Decrypt cookie string
 *
 * @param  {String} str               Cookie string
 * @param  {Object} options
 * @param  {Object} options.algorithm Algorithm to use to decrypt data
 * @param  {Object} options.key       Key to use to decrypt data
 *
 * @return {String}
 */
export function decryptCookie(
  str: string,
  options: { algorithm: string; key: string },
): string {
  const key = options.key;
  const algorithm = options.algorithm || defaultAlgorithm;

  ensureProperOptions(algorithm, key);

  const encryptedArray = str.split(":");
  const iv = new Buffer(encryptedArray[0], "hex");
  const encrypted = new Buffer(encryptedArray[1], "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted =
    decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");

  return decrypted;
}
