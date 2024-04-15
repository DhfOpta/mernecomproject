import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import  CcProvider  from './Contxt/contxt.jsx'
import { Provider } from 'react-redux'
import { Store } from './Store.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter><CcProvider>
  <Provider store={Store}>

    <React.StrictMode>
      <App />
      <ToastContainer />

      
    </React.StrictMode>  </Provider>

  </CcProvider>
  </BrowserRouter>
  

)
