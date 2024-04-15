import React, { useState, useContext } from 'react'
import './Login.css'
import axios from 'axios';
import { useCustmHook } from '../Contxt/contxt'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const API = 'http://localhost:5000/register'
const Signup = () => {
    const [user, setUser] = useState({
        name: '', email: "", password: ""
    })
    const nvgt = useNavigate()
    const { gtTokn } = useCustmHook()
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

            // const jdata=JSON.stringify(user);
            // console.log(jdata);
            //  const dataPost=await fetch('http://localhost:5000/register', {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //       Authorization: `Bearer }`
            //     },

            //         body:JSON.stringify(user)
            //     })
            //     console.log(dataPost)
            if (user.email == '' || user.password == '' || user.name == '') {
                setTimeout(() => {
                    toast.error('Fill The Data')

                }, 3500)
            } else {

                const postData = await axios.post(API, JSON.stringify(user),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            //   Authorization: `Bearer }`
                        }
                    },)
                console.log(postData.data.token);
                gtTokn(postData.data.token)
                setUser({
                    name: '', email: "", password: ""
                })
                nvgt('/home/')
                setTimeout(() => {
                    toast.success('SignUp Succeful')

                }, 3500);
            }
            // console.log(dataPost);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                toast.warn('Sign Up UnSuccefull by ' + error.response.data.msg)

            }, 3500)
        }
    }
    console.log(user);
    return (
        <>
            {/* <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div> <input type='text' name='name' placeholder='Name' required value={user.name} onChange={chngrTxt} autoComplete='false' /></div>
                    <div> <input type='email' name='email' placeholder='email' required value={user.email} onChange={chngrTxt} autoComplete='false' /></div>
                    <div><input type='password' name='password' placeholder='password' required value={user.password} autoComplete='false' onChange={chngrTxt} /></div>
                    <button onClick={postData}>Sign up</button>
                </form>
            </div> */}

            <div>
                <form onSubmit={(e) => e.preventDefault()} className='txt'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' placeholder='Name' required value={user.name} onChange={chngrTxt} autoComplete='false' />
                        {/* <div id="text" className="form-text">We'll never share your Text with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='email' required value={user.email} onChange={chngrTxt} autoComplete='false' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' placeholder='password' required value={user.password} onChange={chngrTxt} autoComplete='false' />
                    </div>
                    {/* <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div> */}
                    <button type="submit" className="btn btn-primary" onClick={postData}>Sign up</button>
                </form>
            </div>
            <ToastContainer />
        </>)
}

export default Signup