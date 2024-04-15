export const gtLoginFullData=(data,token)=>{
    return{
        type:"SET_LOGIN_FULL_DATA",
        payload:{data,token}
    }
}

export const logOutData=(data)=>{
    return{
        type:"SET_LOG_OUT",
        payload:data
    }
}




export const prodctData=(data)=>{
    console.log(data);
    return{
        type:"SET_ALL_PRODUCT_DATA",
        payload:data
    }
}



export const prodctDataByBTN=(data)=>{
    console.log(data);
    return{
        type:"SET_ALL_PRODUCT_DATA_BTN",
        payload:data
    }
}

export const addCart=(data)=>{
    console.log(data);
    return{
        type:"SET_TO_CART",
        payload:data
    }
}

// export const dynamicDataGet=(gtData)=>{
//     console.log(gtData);
//     return{
//         type:"SET_DYNAMIC_FIELD",
//         payload:gtData
//     }
// }