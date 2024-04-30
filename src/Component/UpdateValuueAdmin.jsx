import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const updateAPI = 'http://localhost:9000/product/'
const allData = 'http://localhost:9000/product/'

export const UpdateValuueAdmin = () => {
    const [hide,setHide]=useState(false)
    const [hidee,setHidee]=useState(false)

    const [pdata, setPdata] = useState([])
    const [dataa, setData] = useState([])
    // const 
    const [setTrue, setSEt] = useState(false)
    const [updateData, setUpdateData] = useState({
        title: '',
        stock: '',
        price: '',
        rating: '',
        _id: ''
    })


    const gtSingleData = async (_id,cvl) => {
        console.log(_id,cvl);
        // 
        try {
            // if (_id===cvl._id) {
            //     setHidee(true)

            // }
            const data = await axios.get(updateAPI + _id)
            console.log(data.data[0]);
            setData(data.data[0])
            if (data.data[0]) {
                setHidee(true)
                console.log(dataa, 'dataa');
                setUpdateData({
                    // ...prv,
                    title: data.data[0].title,
                    price: data.data[0].price,
                    stock: data.data[0].stock,
                    rating: data.data[0].rating,
                    _id: data.data[0]._id
                }
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    const gtUpdateValue = (e) => {

        const value = e.target.value
        console.log(value);
        const name = e.target.name
        setUpdateData((prv) => {
            return { ...prv, [name]: value }
        })



    }


    const updateDaata = async () => {
        try {
// if (updateData.name==''||updateData.price==''|| updateData.stock==''||updateData.rating=='') {
// alert('fill DAta')
    
// }
// else{
    // if (_id===cvl._id) {
            

            // }

    const data = await axios.patch(updateAPI + updateData._id, JSON.stringify(updateData), {
        headers: {
            'Content-type': "application/json"
        }
    })
    console.log(data);
    setSEt(true)
    setUpdateData({
        // ...prv,
        title: '',
        price: '',
        stock: '',
        rating: '',
        _id: ''
    }
    )
    setHidee(false)
    toast.success('Update Succesfull')
// }
           
        } catch (error) {

        }
    }




    const getAllData = async (url) => {
        try {
            const data = await axios.get(url)
            console.log(data.data);
            setPdata(data.data)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllData(allData)
        setSEt(false)

    }, [setTrue])
    return <>
{/* 
<div style={hide? {visibility:'visible'}:{display:'none'}}>
<form style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,gap:'1rem',marginTop:'4rem'}} onSubmit={(e) => { e.preventDefault() }}>
            <div style={{ width: '100%' }}>
                <input type='text' style={{ width: '100%', padding: '.5rem 1.5rem' }} onChange={gtUpdateValue} value={updateData.title} name='title' placeholder='Enter Product Title' />
            </div>
            <div style={{ width: '100%' }} >
                <input type='number' style={{ width: '100%', padding: '.5rem 1.5rem' }} onChange={gtUpdateValue} value={updateData.stock} name='stock' placeholder='Enter Product Stock' />
            </div><div style={{ width: '100%' }} >
                <input type='number' style={{ width: '100%', padding: '.5rem 1.5rem' }} onChange={gtUpdateValue} value={updateData.price} name='price' placeholder='Enter Product Price' />
            </div>
            <div style={{ width: '100%' }} >
                <input type='number' style={{ width: '100%', padding: '.5rem 1.5rem' }} onChange={gtUpdateValue} value={updateData.rating} name='rating' placeholder='Enter Product rating' />
            </div>
            <div style={{ width: '100%' }} >
                <Button type='submit' style={{ width: '100%', padding: '1.5rem 1.5rem',fontSize:'1rem',fontWeight:'900' }} onClick={() => { updateDaata() }}>Update</Button>
            </div>
        </form>

</div>
         */}

        <table className="table" width='100%'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">rating</th>
                    <th scope="col">UPDATE</th>

                </tr>
            </thead>
            <tbody>
                {pdata.map((cvl, indx) => {
                    return <>
                    
                        <tr key={cvl._id} onClick={() => { gtSingleData(cvl._id,cvl) }}>

                            <th scope="row" >{indx + 1}</th>
                            
                            {(hidee && cvl._id == updateData._id )?
                             <td style={{width:'20.5%'}}><input key={cvl._id} type='text' style={{ width: '100%', padding: '.5rem 1.5rem' ,border:'.1rem solid black'}} onChange={gtUpdateValue} value={updateData.title} name='title' placeholder='Enter Product Title' /></td>
                             :   
                             <td style={{width:'20.5%'}}>{cvl.title}</td>
                             }
                             {(hidee && cvl._id == updateData._id )?
                             <td style={{width:'20.5%'}}>  <input key={cvl._id} type='number' style={{ width: '100%', padding: '.5rem 1.5rem' ,border:'.1rem solid black'}} onChange={gtUpdateValue} value={updateData.stock} name='stock' placeholder='Enter Product Stock' /></td>
                             :   
                             <td style={{width:'20.5%'}}>{cvl.stock}</td>
                             }
                             {(hidee && cvl._id == updateData._id )?
                             <td style={{width:'20.5%'}}><input key={cvl._id} type='number' style={{ width: '100%', padding: '.5rem 1.5rem',border:'.1rem solid black' }} onChange={gtUpdateValue} value={updateData.price} name='price' placeholder='Enter Product Price' /></td>
                             :   
                             <td style={{width:'20.5%'}}>{cvl.price * 72}</td>
                             }
                             {(hidee && cvl._id == updateData._id )?
                             <td style={{width:'20.5%'}}> <input key={cvl._id} type='number' style={{ width: '100%', padding: '.5rem 1.5rem',border:'.1rem solid black' }} onChange={gtUpdateValue} value={updateData.rating} name='rating' placeholder='Enter Product rating' /></td>
                             :   
                             <td style={{width:'20.5%'}}>{cvl.rating}</td>
                             }
                             {(hidee && cvl._id == updateData._id )?
                             <td style={{width:'20.5%'}}> <Button key={cvl._id} type='submit' style={{ padding: '1.5rem /.1rem',fontSize:'1rem',fontWeight:'900' }} onClick={() => { updateDaata(cvl._id,cvl) }}>Update</Button>
                             </td>:<td style={{width:'20.5%'}}> <Button key={cvl._id} type='submit' style={{ padding: '1.5rem /.1rem',fontSize:'1rem',fontWeight:'900' }} >Update</Button></td>}
                            
                            {/* <td>{cvl.title}</td> */}
                            {/* <td>{cvl.stock}</td>
                            <td>{cvl.price * 72}</td>
                            <td>{cvl.rating}</td> */}
                            {/* <td key={cvl._id} >btn</td> */}

                        </tr>
                    </>
                })}


            </tbody>
        </table>

    </>

}
