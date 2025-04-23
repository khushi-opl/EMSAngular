import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js'


@Injectable({
  providedIn: 'root'
})
export class EncryptionServiceService {

  // Generate key based on a password (or any other shared secret)
  generateKey(password: string): string {
    // Use SHA-256 hash to generate a fixed-length key from the password
    const hashedKey = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    return hashedKey;
  }

  // Encrypt data using AES with the dynamically generated key
  encryptData(data: any, password: string): string {
    const secretKey = this.generateKey(password);  // Generate key from password
    const stringData = JSON.stringify(data);  // Convert the data to string
    const encrypted = CryptoJS.AES.encrypt(stringData, secretKey).toString();  // Encrypt with AES
    return encrypted;
  }

  // Decrypt data using AES with the dynamically generated key
  decryptData(encryptedData: string, password: string): any {
    const secretKey = this.generateKey(password);  // Generate key from password
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decryptedData);  // Parse the decrypted string back into an object
    } catch (e) {
      console.error("Decryption error: ", e);
      return null;
    }
  }
}
