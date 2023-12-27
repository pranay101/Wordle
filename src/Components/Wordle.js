// src/Wordle.js
import React, { useState, useEffect } from 'react';

const Wordle = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');

  useEffect(() => {
    // Fetch random words from the Datamuse API
    fetch('https://api.datamuse.com/words?sp=*')
      .then((response) => response.json())
      .then((data) => {
        const selected = data[Math.floor(Math.random() * data.length)];
        setWords(data.slice(0, 5)); // Adjust the number of words as needed
        setSelectedWord(selected.word);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = () => {
    if (guess.toLowerCase() === selectedWord.toLowerCase()) {
      alert(`Congratulations! You guessed the word "${selectedWord}" correctly in ${attempts + 1} attempts.`);
      // Reset the game
      setGuess('');
      setAttempts(0);
      setLoading(true);
      setSelectedWord('');
      // Fetch new words
      fetch('https://api.datamuse.com/words?sp=*')
        .then((response) => response.json())
        .then((data) => {
          const selected = data[Math.floor(Math.random() * data.length)];
          setWords(data.slice(0, 5)); // Adjust the number of words as needed
          setSelectedWord(selected.word);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setAttempts(attempts + 1);
      alert(`Incorrect guess. Keep trying!`);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Wordle Game</h1>

      {loading && <p className="text-gray-600">Loading words...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div>
          <div className="flex space-x-4 mb-4">
            {words.map((word, index) => (
              <div key={index} className="bg-blue-500 text-white p-4 rounded-md">
                {word.word}
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              className="border p-2 rounded-md"
              placeholder="Enter your guess"
              value={guess}
              onChange={handleGuessChange}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleGuessSubmit}
              disabled={!guess}
            >
              Submit
            </button>
          </div>

          <p className="text-gray-600">
            Attempts: {attempts}, Selected Word: {selectedWord}
          </p>
        </div>
      )}
    </div>
  );
};

export default Wordle;
