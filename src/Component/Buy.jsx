import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Buy.css'
import { useCustmHook } from '../Contxt/contxt'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import buylogo  from '/public/buy.gif'
import card from '/public/Screenshot_39.png'
export const Buy = () => {
  const dataRedux = useSelector((state) => state.taskReducer)
  console.log(dataRedux, 'rdux');
  const nvgt = useNavigate()
  const { datauserBuy, datauser } = useCustmHook()
  console.log(datauserBuy, 'datauserBuydatauserBuydastauserBuy');
  const [thnky,setthnky]=useState(false)

  const [dataUser, setdataUser] = useState(
    {
      UserName: '',
      UserId: '',
      date: new Date(),
      ProductTitle: "",
      Pprice: '',
      Pquntt: '',
      Address: "",
      City: "",
      State: "",
      ZipCode: "",
      CardName: "",
      CardNumbr: "",
      Expmnth: "",
      Expyear: "",
      cvv: ""
    }
  )
 
  const gtTxt = (e) => {
    const name = e.target.name
    const value = e.target.value
    setdataUser((prv) => {
      return {
        ...prv, [name]: value
      }
    })
  }
  

  const dataBuy = async () => {
    console.log("first")
    setdataUser({
      UserName: datauser.name,
      UserId: datauser._id,
      ProductTitle: datauserBuy.Ptitle,
      Pprice: datauserBuy.Pprice,
      Pquntt: datauserBuy.Pquntt
    })
  }
  // console.log(detal, 'detaldetaldetal');
  useEffect(() => {
    if (!datauserBuy) {
      nvgt('/home/Cart')
    }
    dataBuy()

  }, [])
  console.log(dataUser, 'detaldetaldetaldetal');
  const paymntBtn = async (e) => {
    e.preventDefault()
    console.log(dataUser,'dataUserdataUserdataUser');
    try {

      console.log(dataUser, 'buy');
      
      const dataPost = await axios.post('http://localhost:5000/BuyData', dataUser
        , {
          headers: {
            'Content-Type': "application/json"
          }
        }
      )
      console.log(dataPost.data.msg, 'dadataPost');
      toast.success(dataPost.data.msg)
      setthnky(true)
      setTimeout(()=>{
nvgt('/home')
      },7000)
      setdataUser(  {
        UserName: '',
        UserId: '',
        date:'',
        ProductTitle: "",
        Pprice: '',
        Pquntt: '',
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        CardName: "",
        CardNumbr: "",
        Expmnth: "",
        Expyear: "",
        cvv: ""
      })
    } catch (error) {
      toast.warn('fill all data')
    }
  }
  return (
    <>
      {
        !thnky?
      
      <div className="container">
        <form action="#">
          <div className="row">
            <div className="col">
              <h3 className="title">
                Billing Address
              </h3>
              <div className="inputBox">
                <label htmlFor="name">
                  Full Name:
                </label>
                <input type="text" id="name" placeholder="Enter your full name"  value={dataUser.UserName} readOnly required />
              </div>
              <div className="inputBox">
                <label htmlFor="email">
                  Product:
                </label>
                <input type="text" id="ProductTitle" placeholder="Enter ProductTitle "  value={dataUser.ProductTitle} readOnly required />
              </div>
              <div className="inputBox">
                <label htmlFor="email">
                  Product Quntity:
                </label>
                <input type="text" id="ProductTitle" placeholder="Enter Pquntt "  value={dataUser.Pquntt} readOnly required />
              </div>
              <div className="inputBox">
                <label htmlFor="email">
                  Product Price:
                </label>
                <input type="text" id="ProductTitle" placeholder="Enter Price "  value={dataUser.Pprice} readOnly required />
              </div>
              <div className="inputBox">
                <label htmlFor="address">
                  Address:
                </label>
                <input type="text" id="address" placeholder="Enter address" name='Address' value={dataUser.Address} onChange={gtTxt} required />
              </div>
              <div className="inputBox">
                <label htmlFor="city">
                  City:
                </label>
                <input type="text" id="city" placeholder="Enter city" name='City' value={dataUser.City} onChange={gtTxt} required />
              </div>
              <div className="flex">
                <div className="inputBox">
                  <label htmlFor="state">
                    State:
                  </label>
                  <input type="text" id="state" placeholder="Enter state" name='State' value={dataUser.State} onChange={gtTxt} required />
                </div>
                <div className="inputBox">
                  <label htmlFor="zip">
                    Zip Code:
                  </label>
                  <input type="number" id="zip" placeholder="123 456" name='ZipCode' value={dataUser.ZipCode} onChange={gtTxt} required />
                </div>
              </div>
            </div>
            <div className="col">
              <h3 className="title">Payment</h3>
              <div className="inputBox">
                <label htmlFor="name">
                  Card Accepted:
                </label>
                <img src={card} alt="credit/debit card image" />
              </div>
              <div className="inputBox">
                <label htmlFor="cardName">
                  Name On Card:
                </label>
                <input type="text" id="cardName" placeholder="Enter card name" name='CardName' value={dataUser.CardName} onChange={gtTxt} required />
              </div>
              <div className="inputBox">
                <label htmlFor="cardNum">
                  Credit Card Number:
                </label>
                <input type="number" id="cardNum" placeholder="1111-2222-3333-4444" maxLength={19} name='CardNumbr' value={dataUser.CardNumbr} onChange={gtTxt} required />
              </div>
              <div className="inputBox">
                <label htmlFor>Exp Month:</label>
                <select name='Expmnth' value={dataUser.Expmnth} onChange={gtTxt}>
                  <option value>Choose month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div className="flex">
                <div className="inputBox">
                  <label htmlFor>Exp Year:</label>
                  <select name='Expyear' value={dataUser.Expyear} onChange={gtTxt}>
                    <option value>Choose Year</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>
                <div className="inputBox">
                  <label htmlFor="cvv">CVV</label>
                  <input type="number" id="cvv" placeholder={1234} name='cvv' value={dataUser.cvv} onChange={gtTxt} required />
                </div>
              </div>
            </div>
          </div>
          <input type="submit" defaultValue="Proceed to Checkout" className="submit_btn" onClick={paymntBtn} />
        </form>
      </div>:
      <div style={{display:'grid',placeItems:'center',height:"80vh",gap:'1rem',textAlign:'center'}}> 
     <div>
     <img src={buylogo} alt="loading..." />
     <h1 style={{textAlign:'center'}}>
 Thank you for purchasing Product From Shopcart ,<br/> visit again</h1></div>

      </div>}
    </>
  )
}
