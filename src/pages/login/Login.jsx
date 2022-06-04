import {signInWithEmailAndPassword} from 'firebase/auth';
import {Auth} from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithGoogle} from '../../firebase';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../firebase';


const Login =({setUser}) =>{
    const [email,  setEmail] = useState('')
    const [ password, setPassword ] =useState('') 
    const [uid, setUid] = useState('');
    let navigate= useNavigate();
   
    
    const onLogin = async (e) => {
        e.preventDefault();
       
       try{
            await signInWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUid(user.uid)
                setUser(localStorage.setItem ('user',user))
                navigate('/todo', {state:{uid}})
                console.log(user.uid);
            
                // ...
            })
       }
            catch(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)  ;
      };
  };
    return ( 
            <div className='log-in w-full min-h-screen relative'>
                <div className=' flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute shadow-2xl w-fit md:w-lg rounded-md bg-amber-500 opacity-85  p-14  '>
                    <form onSubmit={onLogin}>
                        <h1  className=' text-center text-2xl pb-5'>Welcome Back!</h1>
                        <label className='  text-xl'>Email</label><br />
                        <input className='border-b-2  border-red-700 outline-none bg-transparent  '
                        type="email"
                        value ={email}
                        onChange= {(e) =>setEmail (e.target.value)} 
                        /> <br />
                        <label className='  text-xl pt-10' >Password</label> <br />
                        <input className='border-b-2 border-red-700 outline-none bg-transparent '
                        type="password"  
                        value ={password}
                        onChange= {(e)=>setPassword (e.target.value)}
                        /> <br />
                        <div className='w-full text-center'>
                       <button type='submit' className='text-red-700  pt-4 text-2xl border-2 border-white'>Sign In</button> <br />
                       </div>
                    </form>
                    
                        <button onClick={signInWithGoogle} className='text-blue-800  w-40 mt-4 pr-4'>Sign In With Google</button>
                        <Link to='/reset-password' className='text-blue-900  mt-1'>Forgot Password? </Link>
                        <span className='text-white '>Don't have an acount? <Link to='/sign-up' className='text-blue-900 '>Sign up</Link> now</span>
                
                    
                </div>
            </div>
    )
};
export default Login;