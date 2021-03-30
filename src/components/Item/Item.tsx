import React from "react";
import Todo from "../../interfaces/Todo";
import ListItem from '@material-ui/core/ListItem';
import DeleteForever from '@material-ui/icons/DeleteForever';

interface ItemProps {
    todo: Todo;
    index: number;
    deleteTodo: (index: number) => void;
}

export default function Item (props: ItemProps) {

    const { todo, index, deleteTodo } = props;

    const removeToDo = () => deleteTodo(index);

    return (
        <>
            <ListItem key={index}>{todo.text}</ListItem>
            <DeleteForever data-testid={`${todo.text} deleteIcon`} onClick={removeToDo}/>
        </>
    )
}