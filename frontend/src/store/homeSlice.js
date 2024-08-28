import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name : 'home',
    initialState : {
        url: {},
        genres : {},
        list : {}
    },

    reducers : {
        getConfigApi : (state, action) => {
            state.url = action.payload
        },

        getGenre : (state, action) => {
            state.genres = action.payload
        },

        getList : (state,action) => {
            state.list = action.payload
        }
    }
})

export const {getConfigApi, getGenre, getList} = homeSlice.actions;
export default homeSlice.reducer

