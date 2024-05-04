import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class EncryptionDataService {
  encryptUUID(uuid: string): { encryptedUUID: string, key: string } {
     // Generate a random key in hexadecimal format
     const keyHex: string = CryptoJS.lib.WordArray.random(32).toString();

     // Encrypt the UUID
     const encryptedUUID: string = CryptoJS.AES.encrypt(uuid, keyHex).toString();
     return {
       encryptedUUID,
       key: keyHex // Keep the key in hexadecimal format for display
     };
   }
}
