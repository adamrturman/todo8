import React, {useState} from 'react';
import './App.css';
import Todo from "./interfaces/Todo";
import InputArea from "./components/InputArea/InputArea";
import TodoList from "./components/TodoList/TodoList";

function App() {
    const [list, setList] = useState<Todo[]>([]);

    const createTodoToAdd = (task: string) => {
      const toDoToAdd: Todo = {
          text: task,
          isCompleted: false
      };
      setList([...list, toDoToAdd]);
    };

  return (
    <div className="App">
      Todo 8
        <InputArea createTodoToAdd={createTodoToAdd} />
        <TodoList list={list} />
    </div>
  );
}

export default App;
