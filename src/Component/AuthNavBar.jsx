import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
const AuthNavBar = () => {
  
        
    return <>
    <header>
        <div><h4>MyCart</h4></div>
        <nav>
          <ul>


          <li><NavLink className='navLnk' to={'/admin_Auth'}>Admin</NavLink></li>
              <li><NavLink className='navLnk' to={'/admin_Auth/logout'}>LogOut</NavLink></li>


          </ul>
        </nav>
      </header>
    {/* {admin? <> */}
            {/* <li><NavLink className='navLnk' to={'/admin_Auth'}>Admin</NavLink></li>
              <li><NavLink className='navLnk' to={'/admin_Auth/logout'}>LogOut</NavLink></li> */}

    {/* </>:<><li><NavLink className='navLnk' to={'/Signup'}>Signup</NavLink></li>
              <li><NavLink className='navLnk' to={'/'}>Log In</NavLink></li></>} */}

    </>
}

export default AuthNavBar