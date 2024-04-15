import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { Login } from './Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardCom } from './CardCom';
import axios, { Axios } from 'axios';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { NavLink } from 'react-router-dom';
// import carousel from 'react-multi-carousel';
// import CardCarosul from './CardCarosul';
import { ButtonGroup } from '@mui/material';
import Seconsection from '../../Seconsection';
import './CardCom.css'
import { useDispatch, useSelector } from 'react-redux';
import { prodctData } from './Actions/indx';
import './Section.css'
import LinearIndeterminate from './Spinner'

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
const API = 'http://localhost:9000/product/'
const Section = () => {
  const [productAllData, setProductAllData] = useState([]);
  console.log(productAllData);
  const dataReducer = useSelector((state) => state.taskReducer);
  console.log(dataReducer);
  const dispatch = useDispatch()
  const [loding,setLoding]=useState(true)
  const appData = async (url) => {
    setLoding(true)
    // <LinearIndeterminate/>
    try {
      const daata = await axios.get(url)
      const data = daata.data
      console.log(data);
      setProductAllData(data);
      dispatch(prodctData(data))
      setLoding(false)
    } catch (error) {
      setLoding(true)
      console.log(error);
    }

  }
  useEffect(() => {
    appData(API)
  }, [])
  // useLayoutEffect(()=>{ <LinearIndeterminate/>},[])
  const responsive = {
    // superLargeDesktop: {
    //   // the naming can be any, depends on you.
    //   breakpoint: { max: 4000, min: 3000 },
    //   items: 5
    // },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      // slidesToSlide: 1,
      // infinite: true
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
    {/* {setTimeout(()=>{    */}
{loding?  
     <LinearIndeterminate/>:''}
{/* },2000)} */}
      <div className='heroSection'>
        <h1>Welcome to Shopcart</h1>





        <div className='hrerCard'
          style={{ width: '100%', height: '70vh', borderRadius: '1.6rem' }}
        >
          <div className="card bg-dark text-white" style={{ borderRadius: '1.6rem', position: 'relative' }} >
            <img src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg" alt="..." width='100%' height='515vh' style={{ objectFit: 'fill', borderRadius: '1.6rem' }} />
            <div className="card-img-overlay " style={{ position: 'absolute', top: '30rem', left: '2.5rem', color: 'white', fontFamily: 'sans-serif' }}>
              <h5 className="card-title" style={{ fontSize: '2.5rem' }} >i Phone 9</h5><br />
              <p className="card-text" style={{ fontSize: '1.4rem' }} >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text" style={{ fontSize: '1.4rem' }} >Last updated 3 mins ago</p>
            </div>
          </div>
        </div>



      </div>




      {/* <h1>here</h1> */}
      {/* <div> */}
      <br /><br /><br /><br />

      <Seconsection data={productAllData} />
      {/* // </div> */}















      {/* <div> */}

      <div className='sectnName'>
        {/* <div className='sapbA'> */}
        <p>
          <NavLink to='/home/products' className='active'>
            Show All Product <ArrowRightAltIcon />

          </NavLink>
        </p>
        {/* </div> */}
        <h2>TOP RATING</h2>
      </div>
      <div className='productContn'>
        {/* <div className='prodctDetl'> */}

        {
          productAllData.map((cvl) => {
            if (cvl.rating >= 4.60 && cvl.rating <= 4.99) {
              return <CardCom key={cvl.id} data={cvl} />

            }

          })
        }
        {/* </div> */}
      </div>
      {/* <ToastContainer /> */}

      {/* </div> */}

    </>)
}

export default Section