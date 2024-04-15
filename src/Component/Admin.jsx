import React, { useEffect, useState } from 'react'
import StackedAreaChart from './StackedAreaChart'
import axios from 'axios'
import { Button } from '@mui/material'
import { AdminNavNAnvb } from './AdminNavNAnvb'

const Admin = () => {
  return (
    <>
      <div>Admin</div>
    
      <StackedAreaChart />
    </>
  )
}

export default Admin