import React, { useState } from 'react';
import './MonoalphabeticCipher.css';

const MonoalphabeticCipher = () => {
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const substitutionMap = {
    A: 'Q', B: 'W', C: 'E', D: 'R', E: 'T', F: 'Y', G: 'U',
    H: 'F', I: 'D', J: 'S', K: 'A', L: 'P', M: 'O', N: 'I',
    O: 'G', P: 'H', Q: 'J', R: 'K', S: 'L', T: 'Z', U: 'X',
    V: 'C', W: 'V', X: 'B', Y: 'N', Z: 'M'
  };

  const monoEncrypt = (text) => {
    return text.toUpperCase().split('').map(char => substitutionMap[char] || char).join('');
  };

  const monoDecrypt = (text) => {
    const reverseMap = Object.fromEntries(Object.entries(substitutionMap).map(([k, v]) => [v, k]));
    return text.toUpperCase().split('').map(char => reverseMap[char] || char).join('');
  };

  const handleEncrypt = () => {
    setEncrypted(monoEncrypt(message));
  };

  const handleDecrypt = () => {
    setDecrypted(monoDecrypt(encrypted));
  };

  return (
    <div className='monoalphabetic-container'>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className='input-field'
      />

      <div className="button-group">
        <button className="monoalphabetic-button" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button className="monoalphabetic-button" onClick={handleDecrypt}>
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

export default MonoalphabeticCipher;
