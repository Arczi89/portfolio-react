import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key-change-this-in-production';

export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return data; // Fallback to original data
  }
};

export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData; // Fallback to encrypted data
  }
};

export const encryptContactData = (contactData) => {
  return {
    name: encryptData(contactData.name),
    email: encryptData(contactData.email),
    message: encryptData(contactData.message),
    ip_address: contactData.ip_address,
    user_agent: contactData.user_agent,
  };
};

export const decryptContactData = (encryptedContactData) => {
  return {
    ...encryptedContactData,
    name: decryptData(encryptedContactData.name),
    email: decryptData(encryptedContactData.email),
    message: decryptData(encryptedContactData.message),
  };
}; 