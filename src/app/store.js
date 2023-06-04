import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import customerReducer from "../features/Customers/customerSlice";
import productReducer from "../features/Product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";



export const store = configureStore({
    reducer: { auth: authReducer, 
        customer: customerReducer, 
        product: productReducer ,
        upload : uploadReducer

    },
})