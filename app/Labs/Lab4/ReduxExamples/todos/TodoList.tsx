import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "@/app/(Kambaz)/hooks";
import Todo from "../../../../(Kambaz)/Models/Todo";

export default function TodoList() {
  const { todos } = useAppSelector((state) => state.todosReducer);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: Todo) => (
          <TodoItem 
          key={todo.id} 
          todo={todo}/>
        ))}
      </ListGroup>
      <hr/>
    </div>
);}
