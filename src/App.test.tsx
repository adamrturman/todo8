import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

const addAToDo = (input: HTMLElement, text: string, button: HTMLElement) => {
    fireEvent.change(input, { target: {value: text }});
    fireEvent.click(button);
};

test('renders title', () => {
    const { getByText } = render(<App />);
    getByText("Todo 8");
});

test('renders add button', () => {
    const { getByText } = render(<App />);
    getByText("Click to add");
});

test('todo is added to list and input is cleared', () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");
    const inputValue = input.innerHTML;

    addAToDo(input, "get bread", addButton);
    const getBreadText = queryByText("get bread");

    expect(getBreadText).toBeInTheDocument();
    expect(inputValue).toBe("");
});

test('clicking the remove icon deletes that todo', () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");

    addAToDo(input, "get bread", addButton);

    const getBreadText = getByText("get bread");
    expect(getBreadText).toBeInTheDocument();
    fireEvent.click(getByTestId("get bread deleteIcon"));

    expect(getBreadText).not.toBeInTheDocument();
});

test('duplicate todos are not allowed', () => {
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");
    window.alert = jest.fn();

    addAToDo(input, "get bread", addButton);
    addAToDo(input, "get bread", addButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
});

test('blank todos are not allowed', () => {
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");
    window.alert = jest.fn();

    addAToDo(input, "", addButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
});

test('banner text not displayed when count is 0', () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");
    const bannerText = getByTestId("count-remaining");

    expect(bannerText.innerHTML).toBe("");

    addAToDo(input, "get bread", addButton);
    expect(bannerText.innerHTML).toBe("There is 1 task remaining.");

    fireEvent.click(getByTestId("get bread-checkbox"));

    expect(bannerText.innerHTML).toBe("");
});

test('adding todos correctly increments the displayed count', () => {
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");

    addAToDo(input, "get bread", addButton);

    getByText("There is 1 task remaining.");

    addAToDo(input, "get milk", addButton);

    getByText("There are 2 tasks remaining.");
});

test('checking boxes decrements the displayed count', () => {
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");

    addAToDo(input, "get bread", addButton);

    getByText("There is 1 task remaining.");

    addAToDo(input, "get milk", addButton);

    getByText("There are 2 tasks remaining.");
});

test('editing and saving an existing todo', () => {
    const { getByLabelText, getByText,getByTestId,queryByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");

    addAToDo(input, "get bread", addButton);
    const editOrSaveButton = getByTestId("get bread-edit-save-button");
    fireEvent.click(editOrSaveButton);
    const changeField = getByTestId("get bread-input");
    fireEvent.change(changeField, { target: { value: "get milk"}});
    fireEvent.click(editOrSaveButton);

    expect(getByText("get milk")).toBeInTheDocument();
    expect(queryByText("get bread")).not.toBeInTheDocument();
});

test('click to clear button only renders when there are completed todos', ()=> {
    const { getByLabelText, getByText,getByTestId,queryByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");

    addAToDo(input, "get bread", addButton);
    const getBreadCheckbox = getByTestId("get bread-checkbox");

    expect(queryByText("Click to clear")).not.toBeInTheDocument();

    fireEvent.click(getBreadCheckbox);

    expect(queryByText("Click to clear")).toBeInTheDocument();
});

test('clicking clear button removes all completed todos and leaves others', ()=> {
    const { getByLabelText, getByText,getByTestId,queryByText } = render(<App />);
    const input = getByLabelText("Add a Todo to the list");
    const addButton = getByText("Click to add");

    addAToDo(input, "get bread", addButton);
    addAToDo(input, "get milk", addButton);
    addAToDo(input, "get eggs", addButton);
    addAToDo(input, "get cheese", addButton);

    const getBreadCheckbox = getByTestId("get bread-checkbox");
    const getEggsCheckbox = getByTestId("get eggs-checkbox");
    fireEvent.click(getBreadCheckbox);
    fireEvent.click(getEggsCheckbox);

    const clearButton = getByText("Click to clear");
    fireEvent.click(clearButton);

    expect(queryByText("get bread")).not.toBeInTheDocument();
    expect(queryByText("get eggs")).not.toBeInTheDocument();
    expect(queryByText("get milk")).toBeInTheDocument();
    expect(queryByText("get cheese")).toBeInTheDocument();
});
