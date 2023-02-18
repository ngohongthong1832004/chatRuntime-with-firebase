import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name : 'Anonymous',
    avatar : '',
}

export const authenticationSlice = createSlice({
    name : 'authentication',
    initialState,
    reducers : {
        loadState : (state, action ) => {
             state = {...state}
        }
    },
    // extraReducers : builder => {
    //     builder
    //         .addCase()
    // }
    
})