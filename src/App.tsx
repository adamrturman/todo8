import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Todo from "./interfaces/Todo";
import InputArea from "./components/InputArea/InputArea";
import TodoList from "./components/TodoList/TodoList";
import Banner from "./components/Banner/Banner";

function App() {
    const [list, setList] = useState<Todo[]>([]);
    const [currentTask, setCurrentTask] = useState<Todo>({text: '', isCompleted: false});

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

    const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentTask({text: event.target.value, isCompleted: false});
    };

    const countRemainingTodos = () => {
      return list.reduce((count, todo) => {
          if (!todo.isCompleted) {
              count++;
          }
          return count;
      }, 0);
    };

    const handleSave = (index: number, task: string) => {
      const listAfterEdit = list.map((todo: Todo, i: number ) => {
          if (i === index) {
              todo.text = task;
          }
          return todo;
      });
      setList([...listAfterEdit]);
    };

    const clearAllCompleted = () => {
      const listAfterClearingCompleted = list.filter(todo => !todo.isCompleted);
      setList(listAfterClearingCompleted);
    };

  return (
    <div className="App">
      <Banner countRemainingTodos={countRemainingTodos} />
        <InputArea createTodoToAdd={createTodoToAdd} />
        <TodoList
            currentTask={currentTask}
            list={list}
            deleteTodo={deleteTodo}
            handleComplete={handleComplete}
            countRemainingTodos={countRemainingTodos}
            handleSave={handleSave}
            handleEditChange={handleEditChange}
            clearAllCompleted={clearAllCompleted}
        />
    </div>
  );
}

export default App;
