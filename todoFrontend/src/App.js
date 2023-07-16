import React, { useEffect, useState } from 'react';
import ToDoForm from './components/ToDoForm.tsx';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const fetchTodoList = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/todos-all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.log('Error Getting Todo List:', error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const updateToDoListData = async (todoObj , id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoObj),
      });
      const data = await response.json();
      console.log('after edit data:', data);
      fetchTodoList();
    } catch (error) {
      console.log('Error editing todo:', error);
    }
  }

  const addtodo = async (todo) => {
    const todoObj = {
      title: todo.title,
      description: `This is my ${todo.title} todo.`,
      completed: todo.completed || false,
    };

    if (editId !== "") {
      updateToDoListData(todoObj , editId)

    } else {
      try {
        const response = await fetch('http://localhost:3000/api/v1/todo/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todoObj),
        });
        const data = await response.json();
        console.log('data:', data);
        fetchTodoList();
      } catch (error) {
        console.log('Error adding todo:', error);
      }
    }

    setEditId("");
  };

  const deletetodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('after delete data:', data);
      fetchTodoList();
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };

  const edittodo = (id) => {
    setEditId(id);
  };

  const updatestatus = (obj) => {
    const todoObj = {
      ...obj.todo,
      completed: !obj.todo.completed,
    }
     updateToDoListData(todoObj , todoObj._id)

  }
  return (
    <div className="App">
      <ToDoForm
        addtodo={addtodo}
        editId={editId}
        todos={todos}
        toggleDropdown={toggleDropdown}
        deletetodo={deletetodo}
        edittodo={edittodo}
        updatestatus={updatestatus}
        showDropdown={showDropdown}
      />
    </div>
  );
};

export default App;
