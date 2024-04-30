import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Component/Home'
import About from './Component/About'
import Contct from './Component/Contct'
import Navbar from './Component/Navbar'
import Signup from './Component/Signup'
import Login from './Component/Login'
import Logout from './Component/AdminLogout.jsx'
import { useCustmHook } from './Contxt/contxt'
import { Protect_Rour } from './Component/Protect_Rour.jsx'
import Admin from './Component/Admin.jsx'
import Product from '../Product.jsx'
import SingleProdctData from '../src/Component/SingleProdctData.jsx'
import Cart from '../src/Component/Cart.jsx'
import Protct_User_Rout from './Component/Protct_User_Rout.jsx'
import { ToastContainer } from 'react-toastify'
import { Protect_Auth_ROut } from './Component/Protect_Auth_ROut.jsx'
import AuthNavBar from './Component/AuthNavBar.jsx'
import StackedAreaChart from './Component/StackedAreaChart.jsx'
import { AdminNavNAnvb } from './Component/AdminNavNAnvb.jsx'
import { UpdateValuueAdmin } from './Component/UpdateValuueAdmin.jsx'
import { NotFound } from './Component/NotFound.jsx'
import {Chat} from './Component/Chat.jsx'
import CahtRply from './Component/CahtRply.jsx'
import { Buy } from './Component/Buy.jsx'
function App() {
  const { datauser, isLogin, admin } = useCustmHook()
  // const nvgt=useNavigate()  const { isLogin, length } = useCustmHook()
  console.log(isLogin);
  // const navgt = useNavigate()

  console.log(navigator.geolocation.getCurrentPosition((e) => console.log(e.coords), (e) => console.log(e)));
  useEffect(()=>{
      
  let x=5
  if('a'=='a'){
  x=6
  }
  console.log(x,'var')

  },[])
  return (
    <>

      {admin && isLogin ? <>     <AuthNavBar /> <AdminNavNAnvb/>
      </> : <>      <Navbar />

      {/* <Chat/> */}
      </>}


      <Routes>
        <Route path='/' element={<Protect_Auth_ROut />}>

          <Route path='/Signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
        </Route>

        <Route path='/home' element={<Protct_User_Rout />}>
          <Route path='/home/' element={<Home />} />

          <Route path='/home/products' element={<Product />} />

          <Route path='Contact' element={<Contct />} />
          <Route path='/home/SingleProdctData/:id' element={<SingleProdctData />} />
          <Route path='/home/Cart' element={<Cart />} />
          <Route path='/home/Buy' element={<Buy />} />
          <Route path='/home/logout' element={<Logout />} />
        </Route>
        <Route path='/admin_Auth' element={<Protect_Rour />}>

          <Route path='/admin_Auth' element={<Admin />} />
          <Route path='/admin_Auth/Sales' element={<StackedAreaChart />} />
          
          <Route path='/admin_Auth/Upadte' element={<UpdateValuueAdmin />} />

          {/* <Route path='/admin_Auth/CahtRply' element={<CahtRply />}/> */}
            
          
          <Route path='/admin_Auth/logout' element={<Logout />}></Route>

        </Route>
        <Route path='*' element={<NotFound />} />

      </Routes>
      
    </>
  )
}

export default App
