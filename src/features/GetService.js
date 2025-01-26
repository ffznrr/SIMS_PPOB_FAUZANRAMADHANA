import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    loading: false,
    error: ""
}

export const GetService = createSlice({
    name: 'GetService',
    initialState,
    reducers: {
        fetchPending(state) {
            state.todos = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.todos = action.payload
            state.loading = false
            state.error = ""
        },
        fetchReject(state, action) {
            state.todos = ""
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchPending, fetchReject, fetchSuccess } = GetService.actions

export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const token = JSON.parse(sessionStorage.getItem('token'))
        const response = await axios.get("https://take-home-test-api.nutech-integrasi.com/services", {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        dispatch(fetchSuccess(response.data))
    } catch (err) {
        dispatch(fetchReject(err.response.data.message))
    }

}

export default GetService.reducer


