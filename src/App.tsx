import React, {useState} from 'react';
import './App.css';
import Todo from "./interfaces/Todo";
import InputArea from "./components/InputArea/InputArea";
import TodoList from "./components/TodoList/TodoList";

function App() {
    const [list, setList] = useState<Todo[]>([]);

    const createTodoToAdd = (task: string) => {
        const hasDuplicate = list.reduce((haveSeenDuplicate, todo) => {
            if (task === todo.text) {
                haveSeenDuplicate = true;
            }
            return haveSeenDuplicate;
        }, false);

        if (hasDuplicate) {
            alert("Duplicate todos not allowed");
            return;
        }

        if (!task.length){
            alert("Blank todos not allowed.");
            return;
        }

        const toDoToAdd: Todo = {
          text: task,
          isCompleted: false
      };
      setList([...list, toDoToAdd]);
    };

    const deleteTodo = (index: number) => {
      const listAfterDeletion = list.filter((todo: Todo, i: number) => i !== index);
      setList(listAfterDeletion);
    };

    const handleComplete = (index: number) => {
      const listAfterCompletion = list.map((todo: Todo, i: number) => {
          if (i === index) {
              todo.isCompleted = !todo.isCompleted;
          }
          return todo;
      });
      setList(listAfterCompletion);
    };

  return (
    <div className="App">
      Todo 8
        <InputArea createTodoToAdd={createTodoToAdd} />
        <TodoList
            list={list}
            deleteTodo={deleteTodo}
            handleComplete={handleComplete}
        />
    </div>
  );
}

export default App;
