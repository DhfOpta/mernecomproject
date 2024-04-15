
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCustmHook } from '../Contxt/contxt';

const CahtRply = () => {
const [data,setData]=useState([])
const [hidee,setHidee]=useState(false)
const { datauser, chatDataGt, cartClickd } = useCustmHook()
console.log(datauser);
const [updateData, setUpdateData] = useState({
  // title: '',
reply:'',
  _id: ''
})
const dataGt=async()=>{
  console.log('chatgt');

  try {
    const response = await axios.get('http://localhost:5000/cahtbyUser/dhfopta@gmail.com');
    console.log(response.data.msg);
    const data=await response.data.msg

    setData(data)
    // const data=await axios.get('http://localhost:5000/cahtbyUser/')
    // console.log(data);
  } catch (error) {
    console.log(error);
  }

}
const gtUpdateValue=(e)=>{
  // const value=e.target.value
  // console.log(value);
  
  const value = e.target.value
  console.log(value);
  const name = e.target.name
  setUpdateData((prv) => {
      return { ...prv, [name]: value }
  })

  // setUpdateData({
  //   // title: '',
  // reply:e.target.value,
  //   _id: ''})
}
const onChatRply=async(id)=>{
  const data={    sender_Id: 'dhfopta@gmail.com',
    recever_Id:id ,
    chat: updateData.reply,

    }
const dataPost=await axios.post(`http://localhost:5000/cahtbyUser`,JSON.stringify(data),  {
    headers: {
        "Content-Type": "application/json",
    }
})
chatDataGt(true)
console.log(dataPost);
}
const gtSingleData = async (id,chat) => {
  console.log(id,chat);
  // 
  try {
    setHidee(true)
    setUpdateData({
      // title: '',
    reply:chat,
      _id: id})
  } catch (error) {
      console.log(error);
  }
}
useEffect(()=>{
  dataGt()
},[])
  return <>
  
  <table className="table" width='100%'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Id</th>
                    <th scope="col">Caht</th>
                   

                </tr>
            </thead>
            <tbody>
            {data.map((cvl,indx)=>{
              return<><tr  onClick={() => { gtSingleData(cvl._id,cvl.chat) }}>
              <td style={{width:'20.5%'}}>{indx+1}</td>
              
              <td style={{width:'20.5%'}}>{cvl.sender_Id}</td>
              {(hidee && cvl._id == updateData._id )?<><td style={{width:'20.5%'}}><input key={cvl._id} type='text' style={{ width: '85%', padding: '.5rem .2rem' }} onChange={gtUpdateValue} value={updateData.reply} name='reply' placeholder='Enter Product Title' />
              <button style={{backgroundColor:'transparent',padding:".5rem .9rem ",border:".1rem solid black",borderRadius:'.4rem',margin:'0 .3rem',cursor:'pointer'}} onClick={()=>{onChatRply(cvl.sender_Id)}}>Reply</button>
              </td>
              
              </>
                             
                             :   <>
                             <td style={{width:'20.5%'}}>{cvl.chat}</td>
                             
                             </>
                            
                             }

              </tr>
            
              </>
            })}
            {/* <tr>
            <td style={{width:'20.5%'}}>1</td>
            <td style={{width:'20.5%'}}>a</td>
            <td style={{width:'20.5%'}}>a</td>
            <td style={{width:'20.5%'}}>a</td>

            <td style={{width:'20.5%'}}>a</td>


            </tr> */}
            {/* {data.map((cvl,indx)=>{
              return<>
              <td style={{width:'20.5%'}}>{indx+1}</td>
              
              <td style={{width:'20.5%'}}>{cvl.sender_Id}</td>
              <td style={{width:'20.5%'}}>{cvl.chat}</td>

              </>
            })} */}
            </tbody>
            </table>
  </>
}

export default CahtRply