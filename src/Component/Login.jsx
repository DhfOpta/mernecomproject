import axios from 'axios'
import './Login.css'
import React, { useContext, useEffect, useState } from 'react'
import { useCustmHook } from '../Contxt/contxt'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LinearIndeterminate from './Spinner'

const API = 'http://localhost:5000/login'
const Login = () => {
    const [user, setUser] = useState({
        email: "", password: ""
    })
    const [loding,setLoding]=useState(false)

    const { gtTokn } = useCustmHook()
    const navgt = useNavigate()
    console.log(gtTokn);
    const chngrTxt = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setUser((prv) => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    const postData = async () => {
        try {                    

            if(user.email==''||user.password==''){
                // setTimeout(() => {
                    toast.error('Fill The Data')
                    // setLoding(true)

                // }, 3500)
            }else{
                setLoding(true)
                const dataLogin = await axios.post(API, JSON.stringify(user), {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization:`tokn`
                    }
                })
                console.log(dataLogin);
                gtTokn(dataLogin.data.token)
                setUser({ email: "", password: "" })
                if(dataLogin){
                    setLoding(true)
                setTimeout(() => {
                    toast.success('Login Succeful')

                }, 100)

                }
                navgt('/home/')
              
            }
            setLoding(false)
        } catch (error) {
            setLoding(true)
            console.log(error);
            console.log(error.response.data.msg);
            // setTimeout(() => {
                toast.warn('Login UnSuccefull by '+ error.response.data.msg)

            // }, 3500)
        }

    }
    console.log(user);
    // useEffect(()=>{            setLoding(false)
// },[])
    return (
        <>
{loding?  
     <LinearIndeterminate/>:''}
{/* },2000)} */}
            <div>
                <form onSubmit={(e) => e.preventDefault()} className='txt'>
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' placeholder='Name' required value={user.name} onChange={chngrTxt} autoComplete='false' />
                        <div id="text" className="form-text">We'll never share your Text with anyone else.</div>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='email' required value={user.email} onChange={chngrTxt} autoComplete='false' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' placeholder='password' required value={user.password} onChange={chngrTxt} autoComplete='false' />
                    </div>
                    {/* <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div> */}
                    <button type="submit" className="btn btn-primary" onClick={postData}>Log In</button>
                </form>
            </div>
            {/* Dhfopta@1 */}
        </>)
}

export default Login