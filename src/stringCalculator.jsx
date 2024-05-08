// StringCalculator.js
import React, { useState } from 'react';
import './stringCalculator.css';

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const add = (numbersString) => {
    if (numbersString === '') return 0;

    const delimiter = numbersString.startsWith('//') ? numbersString[2] : ',|\n';
    const numbers = numbersString.split(new RegExp(`[${delimiter}]`));

    const negativeNumbers = numbers.filter(num => parseInt(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    return numbers.reduce((acc, num) => acc + parseInt(num), 0);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setErrorMessage('');
    } catch (error) {
      setResult(0);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
    <div>
    <input
        className='user-input'
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter numbers separated by commas or custom delimiter"
      />
    </div>      
      <button className='calculate-btn' onClick={handleCalculate}>Calculate</button>
      <div>Result: {result}</div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default StringCalculator;
