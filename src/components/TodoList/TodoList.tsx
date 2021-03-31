import React from "react";
import styles from "./TodoList.module.css"
import List from '@material-ui/core/List';
import Todo from "../../interfaces/Todo";
import Item from "../Item/Item";
import Card from '@material-ui/core/Card';

interface TodoListProps {
    list: Todo[];
    deleteTodo: (index: number) => void;
    handleComplete: (index: number) => void;
    countRemainingTodos: () => number;
}

export default function TodoList (props: TodoListProps) {

    const { list, deleteTodo, handleComplete, countRemainingTodos } = props;

    let listClasses = styles.listCard;

    if (countRemainingTodos() > 0) {
        listClasses += ` ${styles.listCardGreenBackground}`
    }

    if (countRemainingTodos() > 2) {
        listClasses += ` ${styles.listCardYellowBackground}`
    }

    if (countRemainingTodos() > 3) {
        listClasses += ` ${styles.listCardRedBackground}`
    }

    const displayedList = list.map((todo: Todo, index: number) => (
        <Item
            todo={todo}
            index={index}
            key={index}
            deleteTodo={deleteTodo}
            handleComplete={handleComplete}
        />
    ));

    return (
        <Card variant="outlined" className={listClasses}>
            <List>
                {displayedList}
            </List>
        </Card>
    )
}