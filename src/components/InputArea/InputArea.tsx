import React, {ChangeEvent, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function InputArea() {
    const [task, setTask] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    return (
        <>
            <TextField variant="outlined" onChange={handleChange} />
            <Button variant="contained">Click to add</Button>
        </>
    );
}