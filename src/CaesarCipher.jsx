import React, { useState } from 'react';
import './CaesarCipher.css'; // Import the CSS file for styling

function CaesarCipher() {
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState(0);
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  // Function to encrypt the message using Caesar cipher
  const encrypt = (text, shift) => {
    return text.split('').map((char) => {
      if (char.match(/[A-Za-z]/)) {
        const code = char.charCodeAt(0);
        const base = code < 91 ? 65 : 97; // Uppercase or lowercase
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char; // Non-alphabetical characters are unchanged
    }).join('');
  };

  // Function to decrypt the message using Caesar cipher
  const decrypt = (text, shift) => {
    return encrypt(text, 26 - (shift % 26)); // Decrypt by shifting back
  };

  const handleEncrypt = () => {
    const result = encrypt(message.toUpperCase(), shift);
    setEncrypted(result);
  };

  const handleDecrypt = () => {
    const result = decrypt(encrypted, shift);
    setDecrypted(result);
  };

  return (
    <div className="caesar-cipher-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="input-field"
      />
      <input
        type="number"
        value={shift}
        onChange={(e) => setShift(Number(e.target.value))}
        placeholder="Enter shift value"
        className="input-field"
      />
      <div className="button-group">
        <button className="cipher-button" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button className="cipher-button" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
      <div className="result">
        <div><strong>Encrypted:</strong> {encrypted}</div>
        <div><strong>Decrypted:</strong> {decrypted}</div>
      </div>
    </div>
  );
}

export default CaesarCipher;
