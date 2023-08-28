import { createContext, useState,useEffect } from "react";
import GetToDoApi from "../api/GetToDoApi";

export const ToDoContext = createContext();

const ToDoContextProvider = (props) => {
  
    const todo = GetToDoApi("https://4cy87dmhnb.execute-api.eu-north-1.amazonaws.com/dev/gettodos");
    
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (todo) {
            setTodos(JSON.parse(todo.body).Items);
        }
    }, [todo]);

    const CreateToDo = (todo) => {
        setTodos([todo,...todos]);
    }

    const DeleteToDo = (todoId) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    }
   
    return (
        <ToDoContext.Provider value={{ todos,CreateToDo,DeleteToDo }}>
            {props.children}
        </ToDoContext.Provider>
    );
};

export default ToDoContextProvider;
