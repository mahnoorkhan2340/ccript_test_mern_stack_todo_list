import React from 'react';

const todoList = ({ todos, deletetodo, edittodo, showDropdown }) => {
  const handleDelete = (index) => {
    deletetodo(index);
  };

  const handleEdit = (index) => {
    edittodo(index);
  };

  return (
    <div className={`todo-list ${showDropdown ? 'open' : ''}`}>
      {showDropdown && (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.name} - {todo.phone}
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default todoList;
