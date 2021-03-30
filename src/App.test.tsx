import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

const addAToDo = (input: HTMLElement, value: string, button: HTMLElement) => {
    fireEvent.change(input, { target: { value: value } });
    fireEvent.click(button);
}

test('renders title', () => {
    const { getByText } = render(<App />);
    getByText("Todo 8");
});

test('renders add button', () => {
    const { getByText } = render(<App />);
    getByText("Click to add");
});

test('todo is added to list and input is cleared', () => {
    const { getByText, getByLabelText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");
    const inputValue = input.innerHTML;

    addAToDo(input, "get bread", addButton);

    expect(getByText("get bread")).toBeInTheDocument();
    expect(inputValue).toBe("")
});
