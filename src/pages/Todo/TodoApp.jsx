import { useLocation } from "react-router-dom"
import { useState } from "react"
import TodoForm  from "./TodoForm"
import TodoList from "./TodoList";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase"

const TodoApp = () => {
    const location =useLocation();
    const [name, setname] = useState(location.state.displayName)
    const [uid , setUid] = useState(location.state.uid)
    const [todos, setTodos] = useState([])

    const getName = async () => {
        const docSnap = await getDoc(doc(db, 'users', uid))

        if(docSnap.exists()) {
            console.log(docSnap.data());
        }else {
            //doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    
    const onSubmit =(todo)=> {
        setTodos ([todo, ...todos])
    }

    const deleteTodo = (tod)=> {
        const updateTodo = [...todos].filter(todo =>{
            return todo.id !== tod
        })
        setTodos(updateTodo);
    }
    return(
        <div className="w-screen h-screen">
            <span className="text-3xl flex justify-center">Welcome to my Todo-App</span><br />
            <div className="">
                <TodoForm onSubmit={onSubmit} /> 
                <div className=" py-4 bg-white ">
                  <TodoList list={todos} deleteTodo={deleteTodo}  />
                </div>
            </div>
        </div> 
    );

};

export default TodoApp;
