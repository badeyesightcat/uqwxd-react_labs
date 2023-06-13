import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  
  // Add the handlesubmit code here
  const handleSubmit = e => {
    e.preventDefault();

    const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
    };

    if ( newTodo.text.length > 0) {
        setTodos([...todos, newTodo]);
        setTodo('');
    } else {
        alert('Enter valid task.');
        setTodo('');
    }
  };
  
  
  // Add the deleteToDo code here
  const deleteToDo = id => {
    const updatedTodos = [...todos].filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  
  // Add the toggleComplete code here
  const toggleComplete = id => {
      const updatedTodos = [...todos].map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo });
      setTodos(updatedTodos);
  };

  
  // Add the submitEdits code here
  const submitEdits = id => {
    const updatedTodos = [...todos].map(todo => todo.id === id ? { ...todo, text: editingText } : todo);
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  useEffect(() => {
      const json = localStorage.getItem('todos');
      const loadedTodos = JSON.parse(json);
      if (loadedTodos) setTodos(loadedTodos);
  }, []);

  useEffect(() => {
      if (todos.length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem('todos', json);
      }
  }, [todos]);
  
return <div className ="todo-list">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
        <input
            type ="text"
            placeholder="Add a new task"
            value={todo}
            onChange={e  => setTodo(e.target.value)} />
        <button type ="submit">Add Todo</button>
    </form>
    {todos.map(todo => <div className="todo" key={todo.id}>
        <div className="todo-text">
        <input
            id="completed"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)} />
        {todo.id === todoEditing
            ? <input type="text" onChange={(e) => setEditingText(e.target.value)} />
            : <div>{todo.text}</div>}
        </div>
        <div className="todo-actions">
            {todo.id === todoEditing
                ? <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                : <button onClick={() => setTodoEditing(todo.id)}>Edit</button>}
            <button
                type="button"
                onClick={() => deleteToDo(todo.id)}>Delete</button>
        </div>
    </div>)}
</div>;
};

export default App;
