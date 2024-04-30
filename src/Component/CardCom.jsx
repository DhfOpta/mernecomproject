import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import './CardCom.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { useCustmHook } from '../Contxt/contxt';
import { ToastContainer, toast } from 'react-toastify';
import { Buy } from './Buy';
export const CardCom = ({ data }) => {
  const [mouse, setMouse] = useState(false)
  let [quntt, setqunt] = useState(0);
  // let [qunttUpDate, setquntUpDate] = useState(quntt)
  const { datauser, cartClickd,dataUserBuy } = useCustmHook()
  // const [count, setCount] = useState(1)
  // const setData = useSelector((state) => state.taskReducer)
  // console.log(count);
  const nvgt = useNavigate()
  // const dispatch = useDispatch()
  // let [countt, setCountt] = useState(0)

  console.log(datauser);


  //Update Data

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



  ///////////


  const inCrmntQunt = () => {
    return setqunt(quntt + 1)
  }
  const deCrmntQunt = () => {
    setqunt(quntt - 1)
    if (quntt <= 0) {
      setqunt(0)
    }
  }
  // const nvgt=useNavigate()
  const gtProdctData =
    (id) => {
      return nvgt('/home/SingleProdctData/' + id)

    }

  // let quntt = 1
  const addCart = async (_id, img, price, description, brand, title, category, countt) => {
    try {
      console.log(_id, img, price, description, brand);
      const dataCart = {
        _id: _id,
        img: img,
        price: price * countt,
        description: description,
        brand: brand,
        title: title,
        category: category,
        qunt: countt
      }

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
      const dataCartUserData = await axios.post(`http://localhost:5000/Cart`, dataCartUser, {
        headers: {
          'Content-Type': "application/json"
        }
      })
      console.log(dataCartUserData);

      // if (dataCartUserData.status == 201) {
      //   toast.warn(dataCartUserData.data.msg)
      // }

      // console.log(dataCart);
      cartClickd(true)
      const dataPost = await axios.post('http://localhost:9800/cartData/', dataCart)
      console.log(dataPost);

    } catch (error) {
      console.log(error);
    }

    //  dispatch(addCart(dataCart))
  }
  console.log(data);
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

  const postBuyData=async(_id, img, price, description, brand, title, category, countt,rating)=>{
console.log(_id, img, price, description, brand, title, category, countt,'detaldetal');
console.log(datauser);

const dataBuyUser = {
  UserId: datauser._id,
  UserName:datauser.name,
  date:new Date(),
  prodct_id: _id,
  // img: img,
  Pprice: (price * 72)*quntt,
  // description: description,
  // brand: brand,
  Ptitle: title,
  Prating:rating,
  // category: category,
  Pquntt: quntt,
  UserAddress:"a"

}

  }
  const stockOut=(stock)=>{
    setqunt(0)
    toast.warn('Product stock is'+stock)
    

  }
  return <>
    <ToastContainer />

    <Card className='cardCont' >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${data.img}`}
          alt="green iguana"
          className='immggg'
          onClick={() => gtProdctData(data._id)}
          style={{ objectFit: 'fill' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${data.title}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${data.description.slice(0, 75)}...`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className='carPRC'  >
        <div className='carPRCc'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <StarIcon style={{ color: '#FFE234' }} />{`${data.rating}`}

          </div>
          {/* <br /> */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <CurrencyRupeeIcon />{`${data.price * 72}`}

          </div>

        </div>
        <div className='CardBtn'>
          <div className='CartQuntCont' onClick={mousEnter} onMouseLeave={mousOut}>
            <div className={mouse ? 'cardQuntBtn show' : 'cardQuntBtn hide'}>

              <Button variant="outlined" onClick={() => {
                // {quntt>0?}
                // addCart(data._id, data.img, data.price, data.description, data.brand, data.title, data.category, quntt - 1);
                decrMntCount(data._id, quntt, data.price),

                  deCrmntQunt();
              }}>-</Button>
              {quntt > data.stock ? stockOut(data.stock) : quntt}
              <Button variant="outlined" onClick={() => { inCrmntQunt(); addCart(data._id, data.img, data.price, data.description, data.brand, data.title, data.category, quntt); }}  >+</Button>


            </div>

            <div className={mouse ? 'CartBtn hide' : 'CartBtn show'} >
              <Button variant="outlined"  >Cart</Button>
            </div>


          </div>
          <div>
          {/* <Button variant="outlined"  onClick={()=>{postBuyData(data._id, data.img, data.price, data.description, data.brand, data.title, data.category, quntt,data.rating)}}>Buy</Button> */}

            {/* <Buy   /> */}
          </div>
        </div>

      </CardActions>
    </Card>
  </>;
}

// export default CardCom;