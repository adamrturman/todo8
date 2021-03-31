import React from "react";
import Typography from '@material-ui/core/Typography';


interface BannerProps {
    countRemainingTodos: () => number;
}

export default function Banner(props: BannerProps) {

    const { countRemainingTodos } = props;

    const numberOfRemainingTasks = countRemainingTodos();

    const isOrAre = numberOfRemainingTasks > 1 ? `are` : `is`;

    const taskOrTasks = numberOfRemainingTasks > 1 ? `tasks` : `task`;

    const remainingTodosText = numberOfRemainingTasks > 0 ? `There ${isOrAre} ${numberOfRemainingTasks} ${taskOrTasks} remaining.` : ``;

    return (
        <>
            <Typography variant="h1">Todo 8</Typography>
            <Typography data-testid="count-remaining" variant="h2">{remainingTodosText}</Typography>
        </>

    );
}