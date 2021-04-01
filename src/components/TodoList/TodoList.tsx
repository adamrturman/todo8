import React, {ChangeEvent} from "react";
import styles from "./TodoList.module.css";
import List from '@material-ui/core/List';
import Todo from "../../interfaces/Todo";
import Item from "../Item/Item";
import {Card, Button } from '@material-ui/core';

interface TodoListProps {
    list: Todo[];
    deleteTodo: (index: number) => void;
    handleComplete: (index: number) => void;
    countRemainingTodos: () => number;
    handleSave: (index: number, task: string) => void;
    handleEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
    currentTask: Todo;
    clearAllCompleted: () => void;
}

export default function TodoList (props: TodoListProps) {

    const { list, deleteTodo, handleComplete, countRemainingTodos, handleSave, handleEditChange, currentTask, clearAllCompleted } = props;

    let listClasses = styles.listCard;

    const numberOfRemainingTodos = countRemainingTodos();

    const numberOfCompletedTodos = list.length - numberOfRemainingTodos;

    if (numberOfRemainingTodos > 0) {
        listClasses += ` ${styles.listCardGreenBackground}`;
    }

    if (numberOfRemainingTodos > 2) {
        listClasses += ` ${styles.listCardYellowBackground}`;
    }

    if (numberOfRemainingTodos > 3) {
        listClasses += ` ${styles.listCardRedBackground}`;
    }

    const displayedList = list.map((todo: Todo, index: number) => (
        <Item
            todo={todo}
            currentTask={currentTask}
            index={index}
            key={index}
            deleteTodo={deleteTodo}
            handleComplete={handleComplete}
            handleSave={handleSave}
            handleEditChange={handleEditChange}
        />
    ));

    return (
        <Card variant="outlined" className={listClasses}>
            <List>
                {displayedList}
                {numberOfCompletedTodos ?
                    <Button onClick={clearAllCompleted}>Click to clear</Button>
                :
                null}
            </List>
        </Card>
    );
}