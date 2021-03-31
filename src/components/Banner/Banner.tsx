import React from "react";
import styles from "./Banner.module.css"
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

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
        <Card className={styles.bannerCard}>
            <Typography variant="h1">Todo 8</Typography>
            <Typography data-testid="count-remaining" variant="h4">{remainingTodosText}</Typography>
        </Card>

    );
}