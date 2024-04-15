import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useCustmHook } from '../Contxt/contxt'
import { toast } from 'react-toastify'
import LinearIndeterminate from './Spinner'

const Logout = () => {
  // const [loding,setLoding]=useState(true)

    const {setLocaTokn}=useCustmHook()
    useEffect(()=>{
        setLocaTokn()
     
    },[setLocaTokn])
  return  <>
{/* },2000)} */}<Navigate to='/'/>
    {/* {   setTimeout(() => {
          toast.success('Logout Succeful')
    
      }, 3500)} */}
  </>
}

export default Logout