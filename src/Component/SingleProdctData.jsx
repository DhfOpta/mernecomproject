import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './SingleProdctData.css'
import { useCustmHook } from '../Contxt/contxt';
import { ToastContainer, toast } from 'react-toastify';
import './CardCom.css'

const API = 'http://localhost:9000/product/65e40c7dd16741dd4ae88d9f'

const SingleProdctData = () => {
    const [mouse, setMouse] = useState(false)

    const [productAllData, setProductAllData] = useState([]);
    const [count, setCount] = useState(1)
    let [quntt, setqunt] = useState(0);
    const { datauser, cartClickd } = useCustmHook()

    // const { datauser } = useCustmHook()
    console.log(datauser);
    const id = useParams()
    console.log(id.id);


    const decrMntCount = async (prodct_idQ, dataQ, dataP) => {
        // setCount(count - 1)
        // if (dataQ<1) {
        //   return setCount(1)
        //  }
    
        console.log(prodct_idQ);
        console.log(dataQ);
        // console.log(count);
    
        try {
          // setLoding(true)
          const dataQunt = {
            // user_id: datauser._id,
            // prodct_id: prodct_idQ,
            _id: prodct_idQ,
            QunIncmnt: dataQ - 1,
            price: (dataP / dataQ) * (dataQ - 1)
    
          }
          const dataQuntUpte = await axios.patch('http://localhost:5000/Cart/' + prodct_idQ, dataQunt, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          console.log(dataQuntUpte);
          setClick(false)
          // setLoding(false)
    
        } catch (error) {
          console.log(error);
          setLoding(true)
    
        }
    
    
      }
      
  const inCrmntQunt = () => {
    return setqunt(quntt + 1)
  }
  const deCrmntQunt = () => {
    setqunt(quntt - 1)
    if (quntt <= 0) {
      setqunt(0)
    }
  }
  
    


    const appData = async (url) => {
        try {
            // http://localhost:9000/product/65e40c7dd16741dd4ae88d9f/
            const daata = await axios.get(`http://localhost:9000/product/${id.id}`)
            const data = daata.data
            console.log(data);
            setProductAllData(data);
            //   dispatch(prodctData(data))
        } catch (error) {
            console.log(error);
        }

    }
    const addCart = async (_id, img, price, description, brand, title, category, countt) => {
        try {
            console.log(_id, img, price, description, brand);
            // const dataCart = {
            //     _id: _id,
            //     img: img,
            //     price: price,
            //     description: description,
            //     brand: brand,
            //     title: title,
            //     category: category,
            //     qunt: countt

            // }

         
      const dataCartUser = {
        user_id: datauser._id,
        prodct_id: _id,
        img: img,
        price: (price * 72) * (countt + 1),
        description: description,
        brand: brand,
        title: title,
        // category: category,
        Qunt: countt + 1

      }


            //dataCartUser:)
            const dataCartUserData = await axios.post(`http://localhost:5000/Cart`, dataCartUser,{headers:{
                'Content-Type':"application/json"
            }})
            // console.log('comn', count);
            // console.log(data);
            console.log(dataCartUserData);
            // if(dataCartUserData.data.msg=''){

            // }
            cartClickd(true)
            if(dataCartUserData.status==201){
                setTimeout(() => {
                    toast.warn(dataCartUserData.data.msg)
    
                }, 1000)
            }

        } catch (error) {
            console.log(error);
        }

    }
    const mousEnter = () => {
        setMouse(true)
        // alert('')
        console.log('mouseIN');
      }
      const mousOut = () => {
        setMouse(true)
        // alert('ok')
        if (quntt == 0) {
          setMouse(false)
    
        }
        console.log('mouseOUT');
    
      }
    useEffect(() => {
        appData(API)
    }, [])
    return (
        <>
            <div className='Contnr'>
                {
                    productAllData.map((cvl) => {
                        return <>
                            <div className='imgCnt'>
                                <img src={cvl.img} alt='img' />
                            </div>
                            <div className='prdctDtl'>
                                <h3>{cvl.brand}</h3>

                                <h3>{cvl.title}</h3>

                                <h4>{cvl.description}</h4>
                                <h3>{cvl.category}</h3>
                                <h3>{cvl.rating}</h3>
                                <h3>{cvl.stock}</h3>

                                <h3>{cvl.price}</h3>
                            </div>
                            {/* <div className=''> */}
                                {/* <Button variant="contained">Buy</Button> */}
                                {/* <Button variant="outlined" onClick={() => addCart(cvl._id, cvl.img, cvl.price, cvl.description, cvl.brand, cvl.title, cvl.category, count)}>Cart</Button>
                            </div> */}

                            {/* // */}
                            <div className='CartQuntCont' onClick={mousEnter} onMouseLeave={mousOut}>
          <div className={mouse ? 'cardQuntBtn show' : 'cardQuntBtn hide'}>

            <Button variant="outlined" onClick={() => { 
              // {quntt>0?}
              addCart(data._id, data.img, data.price, data.description, data.brand, data.title, data.category, quntt - 1);
            // /  decrMntCount(cvl._id, quntt, cvl.price),
              
               deCrmntQunt(); }}>-</Button>
            {quntt > cvl.stock ? alert('Product is not more than') : quntt}
            <Button variant="outlined" onClick={() => { inCrmntQunt(); addCart(cvl._id, cvl.img, cvl.price, cvl.description, cvl.brand, cvl.title, cvl.category, quntt); }}  >+</Button>


          </div>

          <div className={mouse ? 'CartBtn hide' : 'CartBtn show'} >
            <Button variant="outlined"  >Cart</Button>
          </div>

        </div>
                        </>
                    })
                }

{/* <ToastContainer/> */}
            </div>
        </>)
}

export default SingleProdctData