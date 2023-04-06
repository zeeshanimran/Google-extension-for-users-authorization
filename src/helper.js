/* eslint-disable no-undef */
import CryptoJS from "crypto-js";
const secretPass = "XkhZG4fW2t2W";
export const generateSecret = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export function encryptValue(value) {
  const hashValue = CryptoJS.AES.encrypt(value, secretPass).toString();
  return hashValue;
}

export function decryptValue(value) {
  var bytes = CryptoJS.AES.decrypt(value, secretPass);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
