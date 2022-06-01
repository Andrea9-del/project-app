import { useState } from "react";
import {logout} from'../../firebase';

const TodoList = ({list, deleteTodo}) =>{
    const [edit , setEdit] = useState(null);
    const [editText , setEditText] = useState('')
     
    const editTodo = (tod) => {
        const editedTodo = [...list].map(todo => {
            if(todo.id === tod) return todo.text = editText
            const newList = [...editedTodo]
            return newList
        })
        setEdit(null)
        setEditText('')
    }
    return (
        <div>
            {list.map(todo => {
                return (
                    <ul key = {todo.id}>
                        <li>{todo.text}</li>
                        {(todo.id === edit) ? (
                            <>
                            <input className="text-black" value={editText} type = 'text' onChange={(e) => setEditText(e.target.value)}/>
                            <button className="pl-4 text-red" disabled = {editText === ''} onClick={() =>editTodo(edit) } > Submit Edit</button></>
                        ) : ( <>
                            <button onClick = {() => deleteTodo(todo.id)} className='px-4 py-2'>Delete</button>
                            <button onClick = {() => setEdit(todo.id)}>Edit</button></>)}
                    </ul>
                )
            })}
            <button onClick = {logout}> Log out</button>
        </div>
    );
}

export default TodoList;