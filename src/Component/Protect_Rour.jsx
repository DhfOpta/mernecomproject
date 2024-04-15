import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCustmHook } from '../Contxt/contxt'
import { useState } from 'react'
import axios from 'axios'
import LinearIndeterminate from './Spinner'

export const Protect_Rour = () => {
        // const [admin, setAdmin] = useState(false)
        const navgt = useNavigate()       
        const { isLogin, length ,admin} = useCustmHook()

        // const dataAdmin = async () => {

        //         try {
        //                 const dataAdmin = await axios.get('http://localhost:5000/user', {
        //                         headers: {
        //                                 "Authorization": localStorage.getItem('token')
        //                         }
        //                 })
        //                 console.log(dataAdmin);
        //                 if (dataAdmin.data.msg.isAdmin) {
        //                         setAdmin(true)
        //                 } else {
        //                         setAdmin(false)
        //                 }
        //         } catch (error) {
        //                 console.log(error);
        //         }

        // }
        // useEffect(() => {
        //         dataAdmin()
        // }, [])

        return <>
                {admin ? <> <Outlet /></> : <><LinearIndeterminate/><div style={{display:'grid',placeItems:'center',height:'80vh'}}>
                <h1>Redirecting... { navgt('/home')} </h1></div></>}
        </>
}
