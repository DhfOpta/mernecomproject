import React, { useState } from 'react'
import { useCustmHook } from '../Contxt/contxt'

const Contct = () => {
    const [user,setUser]=useState({
        name:'',email:"",message:""
    })
    const [userDAta,setUserdAT]=useState(true)
    const {datauser}=useCustmHook()
    console.log(datauser);
    if (userDAta&&datauser) {
        setUser({
            name:datauser.name,email:datauser.email,message:""
        })
        setUserdAT(false)
    }
    const chngrTxt=(e)=>{
        const name=e.target.name;
        const value=e.target.value
        setUser((prv)=>{
        return{
            ...prv,
            [name]:value
        }
        })
    }
    console.log(user);


  return (
<>
    <div>
        <form onSubmit={(e)=>e.preventDefault()}>
           <div> <input type='text' name='name' placeholder='Name' required value={user.name} onChange={chngrTxt } autoComplete='false'/></div>
           <div> <input type='email' name='email' placeholder='email' required value={user.email} onChange={chngrTxt} autoComplete='false'/></div>
          
            <div> <textarea name='message' placeholder='message' required value={user.message} autoComplete='false' onChange={chngrTxt} rows='10' cols='30'>

</textarea></div>
<button>Submit</button>
        </form>
    </div>
</>  )
}

export default Contct