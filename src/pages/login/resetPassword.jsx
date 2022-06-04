import {Auth} from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import React,{useRef ,useState}from 'react'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    const [error ,setError] = useState('');
    const emailRef = useRef();

    const resetPassword = (email) => {
        try {
            sendPasswordResetEmail(Auth, email) 
        } catch (err) {
            setError(err.message)
        } 
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        return resetPassword(emailRef.current.value)
       
    }
    return (
        <>
        <div className='h-screen relative'>
            <form onSubmit={handleSubmit} className=" p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute text-center border-2 border-black w-96 px-20">
                <div className="  pb-6">
                    <label htmlFor="email" className='text-xl'>Enter your Email:</label>
                    <p >{error}</p>
                    <input type="email"className=" border-b-2 border-black bg-transperant px-10 outline-none text-center " id="email" required ref ={emailRef} />
                </div>
                <div className="flex items-center justify-center text-lg pb-3 "><button className="p-2 border-2 border-blue-500 rounded-md hover:bg-purple-400 text-2xl">Reset Password</button></div>
                <div className="w-100 text-center text-xl pt-6">
                    Already have an account? <br/><Link to="/"  className="text-blue-500 text-2xl pt-4">Sign In</Link>
                </div>
                <div  className="w-100 text-center text-xl pt-6">
                    Need an account ? <br /><Link to="/sign-up" className="text-blue-500 text-2xl pt-4 ">Sign Up</Link>
                </div>
     
            </form>
           </div>
    </>

  )}

export default ResetPassword




