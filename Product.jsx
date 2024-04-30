import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './Product.css'
import { useDispatch, useSelector } from 'react-redux';
import { prodctData, prodctDataByBTN } from '../client/src/Component/Actions/indx';
import axios from 'axios';
import { CardCom } from '../client/src/Component/CardCom';
import LinearIndeterminate from './src/Component/Spinner';
import { useCustmHook } from './src/Contxt/contxt';

const API = 'http://localhost:9000/product/'

const Product = () => {

  const setData = useSelector((state) => state.taskReducer)
  console.log(setData);
  const dispatch = useDispatch()
  const [productAllData, setProductAllData] = useState([]);
  const [SearchTxt, setSearchTxt] = useState('');
  const [SearchTxtClk, setSearchTxtClk] = useState('');
  const { search } = useCustmHook()
  const [tempory, setTempory] = useState([])
  const [loding, setLoding] = useState(false)
  const [emporryNote, setTemporryNote] = useState(false)
const [btn,setBtn]=useState('All')
  
  const serchTxtGt = (e) => {
    setLoding(true)
    return setSearchTxt(e.target.value)
  }
  const gtBtnValue = (e) => {
    console.log(e.target.value);
    setLoding(true)
    dispatch(prodctDataByBTN(e.target.value))
    setLoding(false)
    setBtn(e.target.value)


  }

  const appData = async (url) => {
    setLoding(true)
    try {


     
        const daata = await axios.get(`http://localhost:9000/prodcts?title=${search}&category=${btn}`)
        const data = daata.data.msg
        console.log(data);
        // setProductAllData(data);
        dispatch(prodctData(data))
        setLoding(false)
        // setTempory([])
        // setTempory(data)
        setTempory(data)
        if(data.length==0){
          setTemporryNote(true)
        }else{
          setTemporryNote(false)
        }
    } catch (error) {
      setLoding(true)
      console.log(error);
    }

  }
  const searchd=async(search)=>{
    // alert('ok')
    try {
      const data=await axios.get(`http://localhost:9000/prodcts?title=${search}&category=${btn}`)
      console.log(data);
      setTempory(data.data.msg)
      if(data.data.msg.length==0){
        setTemporryNote(true)
      }else{
        setTemporryNote(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const gtBtnTxt = () => {
    setLoding(true)
    return setSearchTxtClk(SearchTxt), setLoding(false)
  }
  useEffect(() => {
    // if (search.length==0) {
      appData(API)
      // setTempory(productAllData)

    // }
    // else{
      // searchd(search)

    // }
  }, [search,btn])
  console.log(setData.DisplayProductData);
  console.log(productAllData);
  console.log(SearchTxt);
  console.log(tempory, 'tempory', search.length);
  return (
    <>
      {loding ?
        <LinearIndeterminate /> : ''}
      {/* },2000)} */}
      <div className='ProductFirstCont'>
        <Button variant="outlined" selected onClick={gtBtnValue} value='All' >All</Button>
        <Button variant="outlined" onClick={gtBtnValue} value='smartphones' >Smart Phones</Button>
        <Button variant="outlined" onClick={gtBtnValue} value='laptops'>Laptops</Button>
        <Button variant="outlined" onClick={gtBtnValue} value='fragrances'>Fragrances</Button>
        <Button variant="outlined" onClick={gtBtnValue} value='skincare'>Skincare</Button>
        <Button variant="outlined" onClick={gtBtnValue} value='groceries'>Groceries</Button>
        <Button variant="outlined" onClick={gtBtnValue} value='home-decoration'>Home-Decoration</Button>

      </div>
      <div style={{display:'none'}}>
        <input type='search' placeholder='searchh here...' onChange={serchTxtGt} name='search' value={SearchTxt} />

        <Button variant="outlined" onClick={gtBtnTxt} >Search</Button>
      </div>
      <div className='productContnr' >
        {
          emporryNote? <><div style={{ display: 'grid', placeItems: "center", height: '80vh' }}> <h2>No Data</h2></div></>:
          <>
          {tempory.map((cvl)=>{
            return<><CardCom data={cvl} /></>
          })}
          </>
          
        }
      </div>
    </>)
}

export default Product

{/* tempory.map((cvl) => {
          
            if (SearchTxt == '') {
              if (cvl.category == setData.btnValue) {
                return <CardCom data={cvl} />
              } else
                if (setData.btnValue == 'All') {
                  return <CardCom data={cvl} />
                }
            } else
              if (cvl.category == setData.btnValue && cvl.title == SearchTxtClk || SearchTxt.length == 0) {
                return <CardCom data={cvl} />
              } else
                if (setData.btnValue == 'All' && cvl.title == SearchTxtClk || SearchTxt.length == 0) {
                  return <CardCom data={cvl} />
                } else if (cvl.title !== SearchTxtClk) {
                  return console.log('no')
                }
          
          }) */}