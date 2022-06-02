import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home';
import TodoApp from '../pages/Todo/TodoApp';
import  {useState} from 'react';
import ResetPassword from '../pages/login/resetPassword';
import SignUp from '../pages/sign-up/SignUp'; 
import '../index.css'



const App = () => {
    const [user, setUser] = useState(localStorage.getItem('user') || false)
    return (
    <BrowserRouter>
        
        <Routes>
                <Route path='/' element={<Home setUser={setUser}/>}/>
                <Route path='/sign-up' element={<SignUp setUser={setUser}/>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path='/todo' element={<TodoApp/>}/>
                
            </Routes>
    
    </BrowserRouter>
    );
}
export default App;