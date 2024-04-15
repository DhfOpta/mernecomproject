import axios from 'axios';
import './Cart.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import DataTable from './EnhancedTable';
// import { Table } from '@mui/material';
// import CustomizedTables from './EnhancedTable';
// import EnhancedTable from './EnhancedTable';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { addCart } from '../Component/Actions/indx';
import MediaControlCard from './MediaControlCard';
import { useCustmHook } from '../Contxt/contxt';
import { Button } from '@mui/material';
import LinearIndeterminate from './Spinner';
let API = `http://localhost:5000/Cartgt/`
const Cart = () => {
  const [data, setData] = useState([])
  let [count, setCount] = useState(1)
  console.log(count);
  const dataRedux = useSelector((state) => state.taskReducer)
  console.log(dataRedux);
  const { datauser, gtCartLngth, cartClickd } = useCustmHook()
  console.log(datauser);
  const [click, setClick] = useState(false)
  const dispatch = useDispatch()
  const [loding, setLoding] = useState(false)

  const incrMntCount = async (prodct_idQ, dataQ, dataP) => {
    // setCount(count+1)
    // var sum = 0
    // const orignalPrice = dataP
    console.log(prodct_idQ);
    console.log(dataQ);
    try {
      // setLoding(true)

      // sum = sum + (orignalPrice * dataQ);
      // sum = Math.round(sum * 100) / 100;
      const dataQunt = {
        // user_id: datauser._id,
        // prodct_id: prodct_idQ,
        _id: prodct_idQ,
        QunIncmnt: dataQ,
        price: (dataP / (dataQ - 1)) * dataQ
        // price:sum
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
  const decrMntCount = async (prodct_idQ, dataQ, dataP) => {
    // setCount(count - 1)
    // if (dataQ<1) {
    //   return setCount(1)
    //  }

    console.log(prodct_idQ);
    console.log(dataQ);
    console.log(count);

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
  const ftchCartdata = async (url) => {
    try {
      const dataCart = await axios.get(url);
      console.log(dataCart);
      const data = await dataCart.data
      console.log(data);
      setData(data)
      dispatch(addCart(data.length))
    } catch (error) {
      console.log(error);

    }
  }
  const ftchCartdataUser = async (url) => {
    try {
      setLoding(true)
      const CartDatagt = await axios.get(`http://localhost:5000/Cartgt/${datauser._id}`)
      console.log(CartDatagt);
      setData(CartDatagt.data.msg)
      // gtCartLngth(data.length)
      setLoding(false)

    } catch (error) {
      console.log(error);
      setLoding(true)
    }


  }

  const deleteCartdataUser = async (id) => {
    setLoding(true)

    console.log(id);
    try {
      const CartDatagt = await axios.delete(`http://localhost:5000/Cart/${id}`, { headers: { 'Content-Type': 'application/json' } })
      console.log(CartDatagt);
      setClick(false)
      setLoding(false)
      cartClickd(true)
    } catch (error) {
      console.log(error);
    }

    // setData(CartDatagt.data.msg)
  }
  // gtCartLngth(data.length)
  useEffect(() => {
    // ftchCartdata(API)
    ftchCartdataUser(API)

  }, [datauser, click])
  console.log(data);
  return (
    <>

      {loding ?
        <LinearIndeterminate /> : ''}
      {/* },2000)} */}
      {data.length == 0 ? <><div style={{ display: 'grid', placeItems: "center", height: '90vh' }}> <h2>No Data</h2></div></> :
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>

          {data.map((data) => {
            return <><Card sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'justify' }} className='cartBox'>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 ' }} >
                  <Typography component="div" variant="h5" >
                    {data.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div" >
                    {data.description}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }} className='pq'>
                  <div style={{ fontSize: '1.5rem', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                    Quntity:  <IconButton aria-label="previous" onClick={() => { decrMntCount(data._id, data.Qunt, data.price), setCount(data.Qunt--), setClick(true), data.Qunt <= 0 ? deleteCartdataUser(data._id) : style = { display: 'block' } }} >
                      -
                      {/* // style={style={data.Qunt == 1 ? { visibility: 'hidden' } : { display: 'block' } } */}
                    </IconButton>
                    {data.Qunt}
                    {/* {data.Qunt <= 0 ? data.Qunt = 1 : data.Qunt} */}
                    <IconButton aria-label="previous" onClick={() => { setCount(data.Qunt++), incrMntCount(data._id, data.Qunt, data.price), setClick(true) }} >+</IconButton>
                  </div>

                  <div>
                    <IconButton aria-label="next">Price:{data.price}
                    </IconButton>
                  </div>

                </Box>


              </Box>
              <CardMedia
                component="img"
                sx={{ width: 200, objectFit: 'fill' }}
                image={data.img}
                alt="Live from space album cover"
                className='imggggg'
              />
              <div className='delteBtn'>
                <button onClick={() => { deleteCartdataUser(data._id), setClick(true) }}>delete</button>
              </div>


            </Card>
            </>

          })}
        </div>}
    </>)
}

export default Cart


