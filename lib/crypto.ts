import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // In a real app, this would be an environment variable

export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decrypt(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function hashPassword(password: string): string {
  return CryptoJS.SHA256(password).toString();
}