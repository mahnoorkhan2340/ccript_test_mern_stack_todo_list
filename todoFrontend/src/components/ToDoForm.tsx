import React, { useState, useEffect } from "react";
import PlusIcon from "../assets/icons/PlusIcon";
import "./ToDoForm.css";
import profileImage from "../assets/icons/images/profile.jpg";
import "./ToDoList.css";
import ListIcon from "../assets/icons/ListIcon";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";
import DotIcon from "../assets/icons/DotIcon";

const ToDoForm = ({
  addtodo,
  editId,
  todos,
  toggleDropdown,
  deletetodo,
  edittodo,
  showDropdown,
  updatestatus,
}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addtodo({ title });
    setTitle("");
  };

  const handleDelete = (id) => {
    deletetodo(id);
  };

  const handleEdit = (id) => {
    edittodo(id);
  };
  const handleStatus = (id) => {
    const selectedTodo = todos.find((todo) => todo._id === id);
    console.log('selectedTodo:' , selectedTodo)
    updatestatus({todo: selectedTodo});
  };

  useEffect(() => {
    if (editId !== "") {
      const selectedTodo = todos.find((todo) => todo._id === editId);
      setTitle(selectedTodo.title);
    }
  }, [editId, todos]);

  return (
    <div className="todo-form">
      <div className="logo-container">
        <img src={profileImage} alt="Logo" className="logo" />
      </div>
      <h2>To-do List App</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add New Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit" className="plus-button">
            <PlusIcon />
          </button>
        </div>
      </form>

      <div className="dropdown-container">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <span className="list-icon">
            <ListIcon />
          </span>
          Open your todos
        </button>

        <div className={`todo-list ${showDropdown ? "open" : ""}`}>
          {showDropdown && (
            <ul>
              {todos &&
                todos
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((todo, index) => (
                    <li key={todo._id}>
                      <div className="todo-item">
                        <span className="check-circle-icon" onClick={() => handleStatus(todo._id)}>
                          <CheckCircleIcon />
                        </span>
                        <div className="task-details">
                          <span className="task-name">
                            <b>Task:</b> {todo.title}
                          </span>
                          {/* <span ><b>Description:</b> {todo.description}</span> */}
                          <span>
                            <b>Completed:</b> {todo.completed ? "Yes" : "Not"}
                          </span>
                          <span>
                            <b>CreatedAt:</b> {todo.createdAt}
                          </span>
                          <span className="dot-icon">
                            <button onClick={() => handleEdit(todo._id)} className="edit-button">
                              <DotIcon />
                            </button>
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(todo._id)} className="delete-button">
                        Delete
                      </button>
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoForm;
