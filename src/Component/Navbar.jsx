import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useCustmHook } from '../Contxt/contxt'
import axios from 'axios'
import PrimarySearchAppBar from './PrimarySearchAppBar'
const Navbar = () => {
  const [search, setSearch] = useState({ search: '' })
  const { isLogin, length ,searchData} = useCustmHook()
  console.log(isLogin);
  const locaton = useLocation()
  // const [admin, setAdmin] = useState(false)
  const navgt = useNavigate()
  const [admin, setAdmin] = useState(false)
  // const navgt = useNavigate()       
  const dataAdmin = async () => {
    const tokn = localStorage.getItem('token')
    console.log(tokn, 'tokn');
    if (tokn) {
      try {
        const dataAdmin = await axios.get('http://localhost:5000/user', {
          headers: {
            "Authorization": tokn
          }
        })
        console.log(dataAdmin);
        if (dataAdmin.data.msg.isAdmin) {
          setAdmin(true)
          // navgt('/admin_Auth')    
        } else if (dataAdmin.data.msg.isAdmin == false) {
          setAdmin(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      navgt('/')
    }

  }
  const gtDataSeacrvh = async(e) => {
    // navgt('/home/products')
    console.log(locaton.pathname, 'locaton');
    // if (locaton.pathname == '/home/' || locaton.pathname == '/home/Cart') {
      navgt('/home/products')
// 
    // }
    const name = e.target.name;
    const val = e.target.value
    console.log(search.search, 'search.search',e.target.value);
    setSearch((prv) => {
      return {
        ...prv,
        [name]: val
      }
    })
    if(locaton.pathname == '/home/products'){

      searchData(val)
    }
     

  }
  useEffect(() => {
    dataAdmin()
  }, [])
  console.log(admin);
  return (
    <>
      {/* <header>
        <div><h4>MyCart</h4></div>
        <nav>
          <ul>


            {isLogin ? <>
            
                  <li><NavLink className='navLnk' to={'/home/'}>Home{admin}</NavLink></li>
                  <li><NavLink className='navLnk' to={'/home/products'}>Product</NavLink></li>
                  <li><NavLink className='navLnk' to={'/home/Cart'}>Cart<span style={{ backgroundColor: 'skyblue', padding: '.5rem .8rem', width: '50%', borderRadius: '50%', fontFamily: 'sans-serif', fontWeight: '500' }}>{length}</span></NavLink></li>
                  <li><NavLink className='navLnk' to={'/home/logout'}>Logout</NavLink></li></>
             : <>
              <li><NavLink className='navLnk' to={'/Signup'}>Signup</NavLink></li>
              <li><NavLink className='navLnk' to={'/'}>Log In</NavLink></li>
            </>}


          </ul>
        </nav>
      </header> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <NavLink className='navLnk' to={'/home/'} style={{color:'black',textDecoration:'none',fontFamily:'sans-serif',fontSize:'1.7rem',fontWeight:'600'}}>Shopcart</NavLink>

          {/* <a className="navbar-brand" href="#">Shopcart</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          {isLogin ? <>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className=" ulCalss navbar-nav me-auto mb-2 mb-lg-0">


                <li className=" collapseLi nav-item">
                  <NavLink className='navLnk' to={'/home/'}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='navLnk' to={'/home/products'}>Product</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className='navLnk' to={'/home/Cart'}>Cart<span style={{ backgroundColor: '#b2bbbe', padding: '.5rem .8rem', width: '50%', borderRadius: '50%', fontFamily: 'serif', fontWeight: '500' ,marginLeft:'.1rem'}}>{length}</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='navLnk' to={'/home/logout'}>Logout</NavLink>
                </li>

              </ul>

              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={gtDataSeacrvh} name='search' value={search.search} autoComplete='off'/>
                {/* <button className="btn btn-outline-success" type="submit" onSubmit={(e) => { e.preventDefault() }}>Search</button> */}
              </form>



            </div></> :
            <>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className=" ulCalss navbar-nav me-auto mb-2 mb-lg-0">


                  <li className="nav-item">
                    <NavLink className='navLnk' to={'/Signup'}>Signup</NavLink>        </li>
                  <li className="nav-item">
                    <NavLink className='navLnk' to={'/'}>Log In</NavLink>
                  </li>


                </ul></div>
            </>}

        </div>
      </nav>


      {/* <PrimarySearchAppBar/> */}
    </>)
}

export default Navbar