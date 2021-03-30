import React, {useState} from 'react';
import './App.css';
import Todo from "./interfaces/Todo";
import InputArea from "./components/InputArea/InputArea";

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
        <InputArea />
    </div>
  );
}

export default App;
