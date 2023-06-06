import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk(
    "product/get-products",
    async (thunkAPI) => {
        try {
            const products = await productService.getProducts();
            console.log(products); // Check the returned data
            return products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAProduct = createAsyncThunk(
    "product/get-product",
    async (id, thunkAPI) => {
        try {
            return await productService.getAProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateAProduct = createAsyncThunk(
    "product/update-product",
    async (productData, thunkAPI) => {
        console.log(productData);
        try {
            return await productService.updateProduct(productData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createProduct = createAsyncThunk(
    "product/create-products",
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/delete-products",
    async (id, thunkAPI) => {
        try {
            return await productService.deleteAProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const resetState = createAction("Reset_all");

const initialState = {
    products: [], // Initialize as an empty array
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    productnameid: "",
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productnameid = action.payload;
            })
            .addCase(updateAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updateProduct = action.payload;
            })

            .addCase(updateAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteProduct = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;


