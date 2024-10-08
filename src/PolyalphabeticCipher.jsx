import React, { useState } from 'react';
import './PolyalphabeticCipher.css'; // Make sure to import your CSS file

const PolyalphabeticCipher = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const vigenereEncrypt = (text, key) => {
    let result = '';
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const letter = text.charCodeAt(i) - 'A'.charCodeAt(0);
      const keyLetter = key.charCodeAt(keyIndex % key.length) - 'A'.charCodeAt(0);
      result += String.fromCharCode((letter + keyLetter) % 26 + 'A'.charCodeAt(0));
      keyIndex++;
    }

    return result;
  };

  const vigenereDecrypt = (text, key) => {
    let result = '';
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const letter = text.charCodeAt(i) - 'A'.charCodeAt(0);
      const keyLetter = key.charCodeAt(keyIndex % key.length) - 'A'.charCodeAt(0);
      result += String.fromCharCode((letter - keyLetter + 26) % 26 + 'A'.charCodeAt(0));
      keyIndex++;
    }

    return result;
  };

  const handleEncrypt = () => {
    setEncrypted(vigenereEncrypt(message, key));
    setDecrypted(''); // Clear decrypted text
  };

  const handleDecrypt = () => {
    setDecrypted(vigenereDecrypt(encrypted, key));
  };

  return (
    <div className="polyalphabetic-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className='input-field'
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key"
        className='input-field'
      />
     <div className="button-group">
        <button className="polyalphabetic-button" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button className="polyalphabetic-button" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
      <div className="result">
        <div><strong>Encrypted:</strong> {encrypted}</div>
        <div><strong>Decrypted:</strong> {decrypted}</div>
      </div>
    </div>
  );
};

export default PolyalphabeticCipher;
