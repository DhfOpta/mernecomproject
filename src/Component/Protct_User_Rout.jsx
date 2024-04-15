import React, { useEffect, useState } from 'react'
import { useCustmHook } from '../Contxt/contxt';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Protct_User_Rout = () => {
//     const [admin, setAdmin] = useState(false)
const nvgt=useNavigate()
const { isLogin, length ,admin} = useCustmHook()

//     const dataAdmin = async () => {

//         try {
//                 const dataAdmin = await axios.get('http://localhost:5000/user', {
//                         headers: {
//                                 "Authorization": localStorage.getItem('token')
//                         }
//                 })
//                 console.log(dataAdmin);
//                 if (dataAdmin.data.msg.isAdmin) {
//                         setAdmin(false)
//                 } else if(!dataAdmin.data.msg.isAdmin) {
//                         setAdmin(true)
//                 }
//         } catch (error) {
//                 console.log(error);
//         }

// }
useEffect(() => {
        // dataAdmin()
        if(admin){
                nvgt('/admin_Auth')
        }
}, [admin,isLogin])
  return <>
    {
        !admin && isLogin?<Outlet/>:<></>
    }
    {/* <div>Protct_User_Rout</div> */}
  </>
}

export default Protct_User_Rout