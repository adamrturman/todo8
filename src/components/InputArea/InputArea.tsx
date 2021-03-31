import React, {ChangeEvent, useState} from "react";
import styles from "./InputArea.module.css"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

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
        <Card className={styles.inputAreaCard}>
            <div style={{ "paddingTop": "2rem" }}>
                <div>
                    <label htmlFor="input">Add a Todo to the list</label>
                </div>
                <TextField data-testid="input" id="input" value={task} variant="outlined" onChange={handleChange} />
                <Button variant="contained" onClick={addToList}>Click to add</Button>
                </div>
        </Card>
    );
}