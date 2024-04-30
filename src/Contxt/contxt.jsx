import React from "react"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreatContxt = createContext()

const CcProvider = ({ children }) => {
    const [admin, setAdmin] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [isChatRply, setIsChatRply] = useState(false)
    console.log(isChatRply);
    const [cartData, setCartData] = useState([])
    const [search, ssetSearch] = useState('')
    const [length, setCartLength] = useState(0)
    const [cartClick, setcartClick] = useState(false)
    const [datauser, setData] = useState('')
    const [datauserBuy, setDataBuy] = useState()

    console.log(datauser);
    const [tokn, setTOKN] = useState(localStorage.getItem('token'))
    const gtTokn = (tokn) => {
        console.log('ok');
        // setIsLogin(true)
        setTOKN(tokn)
        return localStorage.setItem('token', tokn)
    }
    const navgt = useNavigate()

    let isLogIn = tokn ? true : false
    console.log(isLogIn);

    const setLocaTokn = (tokn) => {
        console.log('ok');
        setTOKN('')
        // isLogIn = false
        setIsLogin(false)
        setAdmin(false)
        return localStorage.removeItem('token')
    }


    const data = async () => {
        try {
            const dataGt = await axios.get('http://localhost:5000/user', {
                headers: { 'Authorization': tokn }

            })
            console.log(dataGt, dataGt.data.msg.isAdmin, "userfn");


            setData(dataGt.data.msg)
            if (dataGt.data.msg.isAdmin == false) {
                setIsLogin(true)
                setAdmin(false)
            }
            else {
                setIsLogin(true)
                setAdmin(true)
            }
            // setAdmin(false)

            // setIsLogin(true)

            // return localStorage.setItem('userData',JSON.stringify(dataGt.data.msg))
        } catch (error) {
            console.log(error);
        }

    }


    console.log(datauser._id);

    const cartClickd = (tru) => {
        try {
            if (tru) {
                console.log('clk');
                setcartClick(true)

            }
        } catch (error) {
            console.log(error);
        }
    }
    const ftchCartdataUser = async (url) => {
        try {
            //   setLoding(true)
            const CartDatagt = await axios.get(`http://localhost:5000/Cartgt/${datauser._id}`)
            console.log(CartDatagt);
            //   setData(CartDatagt.data.msg)
            //   gtCartLngth(data.length)
            //   setLoding(false)
            setCartData(CartDatagt.data.msg)
            console.log(CartDatagt.data.msg.length, 'cartlngt');
            setCartLength(CartDatagt.data.msg.length)


            setcartClick(false)
        } catch (error) {
            console.log(error);
            //   setLoding(true)
        }


    }


    const searchData = (data) => {
        console.log(data);
        ssetSearch(data)
    }
    console.log(search, 'search');

    const chatDataGt = (tru) => {
        console.log(tru, 'hy....................');
        if (tru) {
            setIsChatRply(true)
        }

    }

    const dataUserBuy = (data) => {

        setDataBuy(data)

    }
    useEffect(() => {
        data()
    }, [tokn, isLogin])
    useEffect(() => {
        if (isLogin == true) {
            ftchCartdataUser()
            setCartLength(cartData.length)
            console.log(cartData.length);
        }
    }, [isLogin, cartClick])
    console.log(datauserBuy, 'datauserBuydatauserBuydatauserBuydatauserBuydatauserBuy');
    return (<CreatContxt.Provider value={{ tokn, gtTokn, setLocaTokn, isLogin, datauser, cartData, length, admin, cartClickd, search, searchData, chatDataGt, isChatRply, dataUserBuy, datauserBuy }}>{children}</CreatContxt.Provider>)
}


const useCustmHook = () => {
    const cphok = useContext(CreatContxt)
    return cphok
}
export default CcProvider
export { useCustmHook }