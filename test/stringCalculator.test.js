import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StringCalculator from '../src/stringCalculator';

test('renders input field and calculate button', () => {
  const { getByPlaceholderText, getByText } = render(<StringCalculator />);
  const inputElement = getByPlaceholderText('Enter numbers separated by commas or custom delimiter');
  const buttonElement = getByText('Calculate');
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('calculates sum correctly for valid input', () => {
  const { getByPlaceholderText, getByText } = render(<StringCalculator />);
  const inputElement = getByPlaceholderText('Enter numbers separated by commas or custom delimiter');
  const buttonElement = getByText('Calculate');

  fireEvent.change(inputElement, { target: { value: '1,2,3' } });
  fireEvent.click(buttonElement);

  const resultElement = getByText('Result: 6');
  expect(resultElement).toBeInTheDocument();
});

test('handles negative numbers input', () => {
  const { getByPlaceholderText, getByText } = render(<StringCalculator />);
  const inputElement = getByPlaceholderText('Enter numbers separated by commas or custom delimiter');
  const buttonElement = getByText('Calculate');

  fireEvent.change(inputElement, { target: { value: '1,-2,3,-4' } });
  fireEvent.click(buttonElement);

  const errorElement = getByText('Negative numbers not allowed: -2, -4');
  expect(errorElement).toBeInTheDocument();
});
