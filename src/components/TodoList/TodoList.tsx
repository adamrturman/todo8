import React from "react";
import List from '@material-ui/core/List';
import Todo from "../../interfaces/Todo";
import Item from "../Item/Item";

interface TodoListProps {
    list: Todo[];
    deleteTodo: (index: number) => void;
    handleComplete: (index: number) => void;
}

export default function TodoList (props: TodoListProps) {

    const { list, deleteTodo, handleComplete } = props;

    const displayedList = list.map((todo: Todo, index: number) => (
        // <li>{toDo.text}</li>
        <Item
            todo={todo}
            index={index}
            key={index}
            deleteTodo={deleteTodo}
            handleComplete={handleComplete}
        />
    ));

    return (
        <List>
            {displayedList}
        </List>
    )
}