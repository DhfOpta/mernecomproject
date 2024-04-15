import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminNavNAnvb = () => {
  return <>
         <div style={{display:'flex',flexDirection:'row',gap:'.4rem'}}>
         <NavLink to='/admin_Auth/Sales' >
         <Button variant="outlined"  value='smartphones'  >Sales </Button>

         </NavLink>
         <NavLink to='/admin_Auth/Upadte'>
         <Button variant="outlined"  value='smartphones' >Update Product</Button>

         </NavLink>
         <NavLink to='/admin_Auth/CahtRply'>
         <Button variant="outlined"  value='smartphones' >Caht Rply</Button>

         </NavLink>
      </div>
  </>
}
