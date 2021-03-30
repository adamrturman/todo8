import React, {ChangeEvent, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface InputAreaProps {
    createTodoToAdd: (task: string) => void;
}

export default function InputArea(props: InputAreaProps) {
    const [task, setTask] = useState<string>('');

    const { createTodoToAdd } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    const addToList = () => {
        createTodoToAdd(task);
        setTask('');
    }

    return (
        <>
            <TextField value={task} variant="outlined" onChange={handleChange} />
            <Button variant="contained" onClick={addToList}>Click to add</Button>
        </>
    );
}