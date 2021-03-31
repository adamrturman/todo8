import React, {ChangeEvent, useState} from "react";
import Todo from "../../interfaces/Todo";
import styles from "./Item.module.css"
import DeleteForever from '@material-ui/icons/DeleteForever';
import {Typography, Button, Checkbox, ListItem} from "@material-ui/core";

interface ItemProps {
    todo: Todo;
    index: number;
    deleteTodo: (index: number) => void;
    handleComplete: (index: number) => void;
    handleSave: (index: number, task: string) => void;
    handleEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
    currentTask: Todo;
}

export default function Item (props: ItemProps) {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const { todo, index, deleteTodo, handleComplete, handleSave, handleEditChange, currentTask } = props;

    const removeToDo = () => deleteTodo(index);

    const toggleComplete = () => handleComplete(index);

    const makeEditable = () => setIsEditable(true);

    const saveEdit = () => {
        setIsEditable(false);
        handleSave(index, currentTask.text);
    }

    const editOrSaveAction = isEditable ? saveEdit : makeEditable;
    const editOrSaveText = isEditable ? 'Save' : 'Edit';

    const itemStyleClasses = todo.isCompleted ? `${styles.completed}` : ``;

    return (
        <>
            <ListItem className={`${styles.list} ${styles.listItem}`} key={index}>
                 <DeleteForever data-testid={`${todo.text} deleteIcon`} onClick={removeToDo}/>
                {isEditable ?
                    <input data-testid={`${todo.text}-input`} onChange={handleEditChange}/>
                    :
                    <Typography className={itemStyleClasses}>{todo.text}</Typography>
                }
                    <Checkbox data-testid={`${todo.text}-checkbox`} onClick={toggleComplete} />
                    <Button data-testid={`${todo.text}-edit-save-button`} onClick={editOrSaveAction}>{editOrSaveText}</Button>

            </ListItem>
        </>
    );
}