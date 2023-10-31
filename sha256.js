const CryptoJS = require('crypto-js');

// Function to perform SHA-256 hashing
function sha256(message) {
  return CryptoJS.SHA256(message).toString();
}

// Simulate public key and private key encryption using a shared secret
function encryptWithPublicKey(message, publicKey) {
  const sharedSecret = 'my_shared_secret'; // Replace with your actual shared secret
  const hashedSecret = sha256(sharedSecret);

  // Encrypt the message with the hashed shared secret
  const encryptedMessage = CryptoJS.AES.encrypt(message, hashedSecret).toString();

  // You can now transmit or store the encryptedMessage

  return encryptedMessage;
}

function decryptWithPrivateKey(encryptedMessage, privateKey) {
  const sharedSecret = 'my_shared_secret'; // Replace with your actual shared secret
  const hashedSecret = sha256(sharedSecret);

  // Decrypt the message using the hashed shared secret
  const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, hashedSecret).toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

// Example usage:
const originalMessage = 'Hello, World!';
const publicKey = 'public_key_goes_here';
const privateKey = 'private_key_goes_here';

const encryptedMessage = encryptWithPublicKey(originalMessage, publicKey);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = decryptWithPrivateKey(encryptedMessage, privateKey);
console.log('Decrypted Message:', decryptedMessage);
