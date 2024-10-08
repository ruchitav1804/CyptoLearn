import React, { useState } from 'react';
import './HillCipher.css'; // Import the CSS file for styling

function HillCipher() {
  const [message, setMessage] = useState('');
  const [keyMatrix, setKeyMatrix] = useState(''); // Key matrix should be inputted as a string of numbers
  const [encrypted, setEncrypted] = useState('');

  // Utility function to convert a character to a number (A=0, B=1, ..., Z=25)
  const charToNumber = (char) => {
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
  };

  // Utility function to convert a number to a character (0=A, 1=B, ..., 25=Z)
  const numberToChar = (num) => {
    return String.fromCharCode((num % 26) + 'A'.charCodeAt(0));
  };

  // Utility function to convert text to a number array
  const textToNumbers = (text) => {
    return text.split('').map((char) => charToNumber(char));
  };

  // Utility function to convert a number array to text
  const numbersToText = (numbers) => {
    return numbers.map((num) => numberToChar(num)).join('');
  };

  // Helper function to multiply matrices
  const multiplyMatrix = (matrix, vector) => {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
      let sum = 0;
      for (let j = 0; j < vector.length; j++) {
        sum += matrix[i][j] * vector[j];
      }
      result.push(sum % 26); // Modular arithmetic
    }
    return result;
  };

  // Convert the key matrix from input string into a 2D array
  const parseKeyMatrix = (matrixString) => {
    const numbers = matrixString.split(',').map((n) => parseInt(n.trim()));
    const size = Math.sqrt(numbers.length); // Assuming the key matrix is square
    const matrix = [];
    for (let i = 0; i < size; i++) {
      matrix.push(numbers.slice(i * size, (i + 1) * size));
    }
    return matrix;
  };

  // Hill cipher encryption function
  const hillEncrypt = (plaintext, matrixString) => {
    const matrix = parseKeyMatrix(matrixString);
    const plaintextNumbers = textToNumbers(plaintext);

    // Padding if necessary
    if (plaintextNumbers.length % matrix.length !== 0) {
      const paddingSize = matrix.length - (plaintextNumbers.length % matrix.length);
      for (let i = 0; i < paddingSize; i++) {
        plaintextNumbers.push(charToNumber('X')); // Pad with 'X'
      }
    }

    let ciphertextNumbers = [];
    for (let i = 0; i < plaintextNumbers.length; i += matrix.length) {
      const block = plaintextNumbers.slice(i, i + matrix.length);
      const encryptedBlock = multiplyMatrix(matrix, block);
      ciphertextNumbers = ciphertextNumbers.concat(encryptedBlock);
    }

    return numbersToText(ciphertextNumbers);
  };

  // Hill cipher decryption function (inverse matrix needed)

  // Helper function to find the inverse of a matrix modulo 26

  const handleEncrypt = () => {
    const result = hillEncrypt(message.toUpperCase(), keyMatrix);
    setEncrypted(result);
  };

  return (
    <div className="hill-cipher-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="input-field"
      />
      <input
        type="text"
        value={keyMatrix}
        onChange={(e) => setKeyMatrix(e.target.value)}
        placeholder="Enter key matrix (comma-separated)"
        className="input-field"
      />
      <div className="button-group">
        <button className="cipher-button" onClick={handleEncrypt}>
          Encrypt
        </button>
      </div>
      <div className="result">
        <div><strong>Encrypted:</strong> {encrypted}</div>
      </div>
    </div>
  );
}

export default HillCipher;
