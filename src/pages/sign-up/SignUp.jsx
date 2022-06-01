import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import {Auth,db} from '../../firebase'
import {useNavigate} from 'react-router-dom';
import { setDoc , doc , serverTimestamp } from "firebase/firestore";


const SignUp = ({setUser}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()

    const signUpUser = async(e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(Auth, email, password)
             await setDoc(doc(db, 'user', res.user.uid), {
                userName: name,
                email: email,
                password: password,
                createdAt: serverTimestamp()
            })
            setUser(localStorage.setItem('user', res.user.uid))
            navigate('/todo', {state: {name}})
            } catch (error) {
                 const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
        } 
    }
    return (
        <form onSubmit= {signUpUser}>
            <div className='sign-up w-full min-h-screen relative'>
                <div className=" flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute shadow-2xl w-fit md:w-lg rounded-md bg-slate-200 p-14 opacity-85 mt-10">        
                   <p className="text-3xl text-left mb-5">Welcome,</p>
                    <h1 className=' text-center text-2xl pb-5'>Sign Up Here!</h1>
                    <label>Enter your name</label>
                    <input className="border-b-2  border-black outline-none bg-transparent  " type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                    <label className="mr-2 font-roboto">Enter your Email</label>
                    <input  className="border-b-2  border-black outline-none bg-transparent " type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label className="mr-2 font-roboto">Enter your password</label>
                    <input  className="border-b-2  border-black outline-none bg-transparent " type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="mt-4 text-blue-600 text-xl">Sign Up</button>
                </div>
             </div>
            
        </form>
    )
}

export default SignUp;