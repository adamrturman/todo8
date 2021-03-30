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

    const deleteTodo = (index: number) => {
      const listAfterDeletion = list.filter((todo: Todo, i: number) => i !== index);
      setList(listAfterDeletion);
    };

  return (
    <div className="App">
      Todo 8
        <InputArea createTodoToAdd={createTodoToAdd} />
        <TodoList
            list={list}
            deleteTodo={deleteTodo}
        />
    </div>
  );
}

export default App;
