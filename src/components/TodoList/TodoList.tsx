import React from "react";
import List from '@material-ui/core/List';
import Todo from "../../interfaces/Todo";

interface TodoListProps {
    list: Todo[];
}

export default function TodoList (props: TodoListProps) {

    const { list } = props;

    const displayedList = list.map((toDo: Todo, index: number) => (
        <li>{toDo.text}</li>
    ));

    return (
        <List>
            {displayedList}
        </List>
    )
}