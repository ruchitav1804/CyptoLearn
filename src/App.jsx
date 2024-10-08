import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PlayfairCipher from './PlayfairCipher.jsx';
import HillCipher from './HillCipher.jsx';
import CaesarCipher from './CaesarCipher.jsx';
import MonoalphabeticCipher from './MonoalphabeticCipher.jsx';
import PolyalphabeticCipher from './PolyalphabeticCipher.jsx';

function App() {
  return (
    <Router>
          <div className="App">
            <h1>CryptoLearn</h1>
          </div>

      <div className='App-nav' >
        <nav>
          <ul>
            <li>
              <Link to="/caesar"><h3>Caesar Cipher</h3></Link>
              <p>The Caesar cipher is a simple encryption technique that was used by Julius Caesar to send secret messages to his allies. It works by shifting the letters in the plaintext message by a certain number of positions, known as the “shift” or “key”. The Caesar Cipher technique is one of the earliest and simplest methods of encryption techniques.</p>
              <Routes>
              <Route path="/caesar" element={<CaesarCipher />} />
              </Routes>
            </li>
            <li>
              <Link to="/monoalphabetic"><h3>Monoalphabetic Cipher</h3></Link>
              <p>Monoalphabetic Cipher is a part of the substitution technique in which a single cipher alphabet is used per message (mapping is done from plain alphabet to cipher alphabet). Monoalphabetic cipher converts plain text into cipher text and re-convert a cipher text to plain text. Monoalphabetic Cipher eliminates the brute-force techniques for cryptanalysis. Moreover, the cipher line can be a permutation of the 26 alphabetic characters.</p>
              <Routes>
              <Route path="/monoalphabetic" element={<MonoalphabeticCipher />} />
              </Routes>
            </li>
            <li>
              <Link to="/polyalphabetic"><h3>Polyalphabetic Cipher</h3></Link>
              <p>Vigenere Cipher is a method of encrypting alphabetic text. It uses a simple form of polyalphabetic substitution. A polyalphabetic cipher is any cipher based on substitution, using multiple substitution alphabets. The encryption of the original text is done using the Vigenère square or Vigenère table.</p>
              <Routes>
                <Route path="/polyalphabetic" element={<PolyalphabeticCipher />} />
              </Routes>
            </li>
            <li>
              <Link to="/playfair"><h3>Playfair Cipher</h3></Link>
              <p>Playfair cipher is an encryption algorithm to encrypt or encode a message. It is the same as a traditional cipher. The only difference is that it encrypts a digraph (a pair of two letters) instead of a single letter.
                  It initially creates a key-table of 5*5 matrix. The matrix contains alphabets that act as the key for encryption of the plaintext. Note that any alphabet should not be repeated. Another point to note that there are 26 alphabets and we have only 25 blocks to put a letter inside it. Therefore, one letter is excess so, a letter will be omitted (usually J) from the matrix. Nevertheless, the plaintext contains J, then J is replaced by I. It means treat I and J as the same letter, accordingly.</p>
              <Routes>
                <Route path="/playfair" element={<PlayfairCipher />} />
              </Routes>
            </li>
            <li>
              <Link to="/hill"><h3>Hill Cipher</h3></Link>
              <p>Hill cipher is a polygraphic substitution cipher based on linear algebra.Each letter is represented by a number modulo 26. Often the simple scheme A = 0, B = 1, …, Z = 25 is used, but this is not an essential feature of the cipher. To encrypt a message, each block of n letters (considered as an n-component vector) is multiplied by an invertible n × n matrix, against modulus 26. To decrypt the message, each block is multiplied by the inverse of the matrix used for encryption.</p>
              <Routes>
                <Route path="/hill" element={<HillCipher />} />
              </Routes>
            </li>
          </ul>
        </nav>
        </div>
        
    </Router>
  );
}

export default App;
