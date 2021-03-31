import React from "react";
import Todo from "../../interfaces/Todo";
import styles from "./Item.module.css"
import ListItem from '@material-ui/core/ListItem';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Checkbox from '@material-ui/core/Checkbox';
import {Typography} from "@material-ui/core";

interface ItemProps {
    todo: Todo;
    index: number;
    deleteTodo: (index: number) => void;
    handleComplete: (index: number) => void;
}

export default function Item (props: ItemProps) {

    const { todo, index, deleteTodo, handleComplete } = props;

    const removeToDo = () => deleteTodo(index);

    const toggleComplete = () => handleComplete(index);

    const itemStyleClasses = todo.isCompleted ? `${styles.completed}` : ``;

    return (
        <>
            <ListItem className={`${styles.list} ${styles.listItem}`} key={index}>
                 <DeleteForever data-testid={`${todo.text} deleteIcon`} onClick={removeToDo}/>
                 <Typography className={itemStyleClasses}>{todo.text}</Typography>
                    <Checkbox data-testid={`${todo.text}-checkbox`} onClick={toggleComplete} />
            </ListItem>
        </>
    );
}