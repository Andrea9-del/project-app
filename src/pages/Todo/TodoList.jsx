import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../firebase";
import { signOut } from "firebase/auth";

const TodoList = ({list, deleteTodo}) =>{
    const [edit , setEdit] = useState(null);
    const [editText , setEditText] = useState('')
     const navigate = useNavigate()
    const editTodo = (tod) => {
        const editedTodo = [...list].map(todo => {
            if(todo.id === tod) {
                 todo.text = editText
            }})
            list = editedTodo
            setEdit(null)
            setEditText('')
    }

    const logout = () => {
        signOut(Auth);
        navigate('/')
      };
    return (
        <div className="bg-teal-100 text-xl px-4 py-4 ">
                    {list.map(todo => {
                        return (
                            <ul key = {todo.id}>
                                <li>{todo.text}</li>
                                {(todo.id === edit) ? (
                                    <>
                                    <input className="text-gray-500" value={editText} type = 'text' onChange={(e) => setEditText(e.target.value)}/>
                                    <button className="  text-gray-700  border-2 border-white rounded-md px-4 hover:border-amber-700 " disabled = {editText === ''} onClick={() =>editTodo(edit) } > Submit Edit</button></>
                                ) : ( <div className="flex flex-row justify-evenly" >
                                
                                        <button onClick = {() => deleteTodo(todo.id)} className='text-gray-700 border-2 border-white rounded-md p-2 hover:border-amber-700 '>Delete</button>
                                        <div>
                                        <button onClick = {() => setEdit(todo.id)} className="text-gray-700 pl-2 border-2 border-white rounded-md p-2 hover:border-amber-700 ">Edit</button>
                                        </div>
                                    </div>)}
                            </ul>
                        )
                    })}
                    <div className="flex flex-row justify-center pt-4">
                        <button className="  text-2xl text-gray-700  border-2 border-white rounded-md p-2 text-center hover:bg-amber-700" onClick = {logout}> Log out</button>
                    </div>
        </div>
    );
}

export default TodoList;