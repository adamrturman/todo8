import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
    const { getByText } = render(<App />);
    getByText("Todo 8");
});

test('renders add button', () => {
    const { getByText } = render(<App />);
    getByText("Click to add");
});
