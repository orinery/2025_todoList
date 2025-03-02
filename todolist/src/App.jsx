import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { useState, useRef } from "react";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "완료된 투두는 왼쪽 클릭!",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "삭제시에는 오른쪽 클릭!",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "내용 수정시에는 오른쪽 펜 클릭!",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  const onEdit = (targetId, newContent) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, content: newContent } : todo
      )
    );
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default App;
