import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCustmHook } from '../Contxt/contxt'

export const Protect_Auth_ROut = () => {
    const [login,setLogin]=useState(false)
    const {tokn}=useCustmHook()
    console.log(tokn);
    const nvgt=useNavigate()
    const data = async () => {
        try {
            const dataGt = await axios.get('http://localhost:5000/user', {
                headers: { 'Authorization': tokn }

            })
            console.log(dataGt,'jxbj');
            // setData(dataGt.data.msg)
            setLogin(true)

            // return localStorage.setItem('userData',JSON.stringify(dataGt.data.msg))
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
data()
    },[])
    console.log(login);
  return <>
    {!login?<Outlet/>: <>'You Are Login'{nvgt('/home')}</>}
  </>
}
