import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Admin from './Admin';

export default function BasicBars() {

    const [cartData, setCartData] = useState([])


    const [smartPhone, setSmartPhone] = useState([])
    const [Laptop, setLaptop] = useState([])
    const [fragrances, setfragrances] = useState([])
    const [groceries, setgroceries] = useState([])
    const [skincare, setskincare] = useState([])
    const [homedecoration, sethomedecoration] = useState([])

    const gtAllCartData = async () => {
        try {
            const data = await axios.get('http://localhost:5000/Cart')
            console.log(data);
            const res = await data.data.msg
            setCartData(res)
            setSmartPhone(res.smartPhone
            )
            setLaptop(res.laptop)
            setfragrances(res.fragrances)
            setgroceries(res.groceries)
            setskincare(res.skincare)

            sethomedecoration(res.homeDecoration)
        } catch (error) {
            console.log(error);
        }
    }



    const arr = []
    // console.log(data);
    // const distriButData = () => {
    //     setSmartPhone(cartData.smartPhone)
    //     setLaptop(cartData.laptop)
    //     setfragrances(cartData.fragrances)
    //     setgroceries(cartData.groceries)
    //     setskincare(cartData.skincare)

    //     sethomedecoration(cartData.homeDecoration)

    // }
    // React.useEffect(() => {
    //     distriButData()
    // }, [data])
    useEffect(() => {
        gtAllCartData()
        // distriButData()
    }, [])

    console.log(cartData);

    console.log(smartPhone.length);
    // console.log(arr);
    return<>
        {/* <Admin/> */}
        <BarChart
            xAxis={[{
                scaleType: 'band', data: ['smartPhone', 'Laptop', 'fragrances', 'groceries', "skincare", "homedecoration"
                ]
            }]}
            // series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            series={[{ data:[smartPhone.length,0,0,0,0,0]}, { data: [0,Laptop.length,0,0,0,0] }, { data: [0,0,fragrances.length,0,0,0] },{ data: [0,0,0,groceries.length,0,0] },{ data: [0,0,0,0,skincare.length,0] },{ data: [0,0,0,0,0,homedecoration.length] }]}
            width={1000}
            height={300}
        />

        </>
    
}