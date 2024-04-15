const initalVal = {
    curtUserPresnt: false,
    currntUserData: [],
    ProductAllData: [],
    DisplayProductData: [],
    btnValue: "All",
    CartQunt:0,
    authValidToken:''
}

export const taskReducer = (state = initalVal, action) => {
    switch (action.type) {
        case "SET_LOGIN_FULL_DATA":
            console.log(action.payload);
            return {
                ...state,
                currntUserData: action.payload.data,
                curtUserPresnt: true,
                authValidToken:action.payload.token
            }
        case "SET_LOG_OUT":
            return {
                ...state,
                currntUserData: [],
                curtUserPresnt: false,
                authValidToken:''


            }
        case "SET_ALL_PRODUCT_DATA":
            const dataa=initalVal.DisplayProductData.filter((cvl)=>{
                return console.log(cvl);
            })
            console.log(initalVal.DisplayProductData);
            return {
                ...state,
                ProductAllData: action.payload,
                DisplayProductData:action.payload
            }

        case "SET_ALL_PRODUCT_DATA_BTN":
           console.log(action.payload);
           console.log(initalVal.ProductAllData);

     const data= initalVal.ProductAllData.filter((cvl)=>{
      return console.log(cvl);

      })
      console.log(data);
      console.log('data');
            return {
                ...state,
                btnValue:action.payload,
                // DisplayProductData:


            }
            case 'SET_TO_CART':
                return{
                    ...state,
                    CartQunt:action.payload
                }

        default:
            return state
    }
}