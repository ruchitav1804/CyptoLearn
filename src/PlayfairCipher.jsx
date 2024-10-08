import React, { useState } from 'react';
import './PlayfairCipher.css'; // Import the CSS file for styling

function PlayfairCipher() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const generateMatrix = (key) => {
    key = key.toUpperCase().replace(/J/g, 'I');
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    let matrix = [];
    let usedChars = new Set();

    // Fill matrix with key characters
    for (let char of key) {
      if (!usedChars.has(char) && alphabet.includes(char)) {
        matrix.push(char);
        usedChars.add(char);
      }
    }

    // Fill remaining characters
    for (let char of alphabet) {
      if (!usedChars.has(char)) {
        matrix.push(char);
        usedChars.add(char);
      }
    }

    // Convert to 5x5 matrix
    let finalMatrix = [];
    for (let i = 0; i < matrix.length; i += 5) {
      finalMatrix.push(matrix.slice(i, i + 5));
    }

    return finalMatrix;
  };

  const prepareText = (text) => {
    text = text.toUpperCase().replace(/\s+/g, '').replace(/J/g, 'I');
    let preparedText = '';

    for (let i = 0; i < text.length; i++) {
      preparedText += text[i];
      if (i + 1 < text.length && text[i] === text[i + 1]) {
        preparedText += 'X';
      }
    }

    if (preparedText.length % 2 !== 0) {
      preparedText += 'X';
    }

    return preparedText;
  };

  const findPosition = (matrix, char) => {
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      if (row.includes(char)) {
        return { row: i, col: row.indexOf(char) };
      }
    }
    return null;
  };

  const playfairEncrypt = (plaintext, key) => {
    const matrix = generateMatrix(key);
    const preparedText = prepareText(plaintext);
    let ciphertext = '';

    for (let i = 0; i < preparedText.length; i += 2) {
      const char1 = preparedText[i];
      const char2 = preparedText[i + 1];
      const pos1 = findPosition(matrix, char1);
      const pos2 = findPosition(matrix, char2);

      if (pos1.row === pos2.row) {
        ciphertext += matrix[pos1.row][(pos1.col + 1) % 5];
        ciphertext += matrix[pos2.row][(pos2.col + 1) % 5];
      } else if (pos1.col === pos2.col) {
        ciphertext += matrix[(pos1.row + 1) % 5][pos1.col];
        ciphertext += matrix[(pos2.row + 1) % 5][pos2.col];
      } else {
        ciphertext += matrix[pos1.row][pos2.col];
        ciphertext += matrix[pos2.row][pos1.col];
      }
    }

    return ciphertext;
  };

  const playfairDecrypt = (ciphertext, key) => {
    const matrix = generateMatrix(key);
    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i += 2) {
      const char1 = ciphertext[i];
      const char2 = ciphertext[i + 1];
      const pos1 = findPosition(matrix, char1);
      const pos2 = findPosition(matrix, char2);

      if (pos1.row === pos2.row) {
        plaintext += matrix[pos1.row][(pos1.col - 1 + 5) % 5];
        plaintext += matrix[pos2.row][(pos2.col - 1 + 5) % 5];
      } else if (pos1.col === pos2.col) {
        plaintext += matrix[(pos1.row - 1 + 5) % 5][pos1.col];
        plaintext += matrix[(pos2.row - 1 + 5) % 5][pos2.col];
      } else {
        plaintext += matrix[pos1.row][pos2.col];
        plaintext += matrix[pos2.row][pos1.col];
      }
    }

    return plaintext;
  };

  const handleEncrypt = () => {
    const result = playfairEncrypt(message, key);
    setEncrypted(result);
  };

  const handleDecrypt = () => {
    const result = playfairDecrypt(encrypted, key);
    setDecrypted(result);
  };

  return (
    <div className="playfaircipher-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="input-field"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key"
        className="input-field"
      />
      <div className="button-group">
        <button className="playfair-button" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button className="playfair-button" onClick={handleDecrypt}>
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

export default PlayfairCipher;
