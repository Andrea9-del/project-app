import {useState} from 'react';

const TodoForm = ({onSubmit}) =>{
    const [input , setInput] =useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        onSubmit({
            id:new Date().getTime(), text: input
        })
        setInput('')
    }

    return (
        <div className="shadow-2xl w-screen opacity-85  ">
            <form onSubmit={handleSubmit} className='w-full flex items-center justify-center '>
                <div className="bg-gray-400 h-20 flex items-center justify-center w-full px-16  ">
                    <input type="text" className="border-b-2  border-amber-700 outline-none bg-transparent w-72  text-black " value = {input} onChange ={(e) => setInput(e.target.value)}/>
                    <button className=" hover:border-amber-700 px-3 py-1 border-2 border-white ml-3 rounded-lg focus:outline-none focus:bg-white focus:text-amber-500" disabled = {input === ''}>Add Todo</button>
                </div>
            </form>
        </div>
    );

}
export default TodoForm;