import React, { useState } from 'react'
import { CardCom } from '../client/src/Component/CardCom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import '../client/src/Component/CardCom.css'
import './Seconsection.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
const Seconsection = ({ data }) => {
    console.log(data);
    const [count,setCount]=useState(1)

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 ,// optional, default to 1.
            partialVisible:true,
            autoPlay:true,
            // autoPlaySpeed:1665
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
            swipeable:true
        }
    };
    const addCart = async (_id, img, price, description, brand, title, category,countt) => {
        try {
          console.log(_id, img, price, description, brand);
          const dataCart = {
            _id: _id,
            img: img,
            price: price,
            description: description,
            brand: brand,
            title: title,
            category: category,
            qunt: countt
    
          }
          console.log(dataCart);
          const dataPost = await axios.post('http://localhost:9800/cartData/', dataCart)
          console.log(dataPost);
          if (dataPost.statusText == "OK") {
            // setCount(count+1)
            const dataPost = await axios.get(`http://localhost:9800/cartData/${_id}`)
            console.log(dataPost);
            const dataa = await dataPost.data
            console.log('ok');
            console.log(dataa[0].img);
            const dataCartt = {
              _id: dataa[0]._id,
              img: dataa[0].img,
              price: dataa[0].price,
              description: dataa[0].description,
              brand: dataa[0].brand,
              title: dataa[0].title,
              category: dataa[0].category,
              qunt: dataa[0].qunt + 1
            }
            const data = await axios.patch(`http://localhost:9800/cartData/${_id}`, dataCartt)
            console.log('comn', count);
            console.log(data);
          }
          // nvgt('/Cart')
        } catch (error) {
          console.log(error);
        }
    
        //  dispatch(addCart(dataCart))
      }
    return (
        <>
            <div className='Contner'>


                <div className='cardContnr'>
                    <div className='contnrDtl' >
                        <h2>Trending</h2>
                    </div>
                    <div className='containerClass' >
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            //   ssr={true} // means to render carousel on server-side.
                            infinite={true}
                              autoPlay={true}
                            // slidesToSlide={0}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}
                            customTransition="all 2s"
                            transitionDuration={3000}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            //   deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="imgg"
                        >
                            {
                                data.map((cvl) => {
                                    if(cvl.rating>4.50 && cvl.rating<4.99){
                                        return <Card className='cardCont'>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={`${cvl.img}`}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {`${cvl.title}`}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {`${cvl.description.slice(0, 75)}...`}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className='carPRC'  >
                                            <div className='carPRCc'>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <StarIcon style={{ color: '#FFE234' }} />{`${cvl.rating}`}

                                                </div>
                                                {/* <br /> */}
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <CurrencyRupeeIcon />{`${cvl.price * 72}`}

                                                </div>

                                            </div>
                                            {/* <Button variant="outlined" onClick={()=>addCart(cvl._id,cvl.img,cvl.price,cvl.description,cvl.brand,cvl.title,cvl.category,count)}>Cart</Button> */}
                                        </CardActions>
                                    </Card>



                                    }
                                    

                                })
                            }

                        </Carousel>
                    </div>
                </div>
            </div>
        </>)
}

export default Seconsection