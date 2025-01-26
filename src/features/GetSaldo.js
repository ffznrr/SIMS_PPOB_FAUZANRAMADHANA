import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    saldo: [],
    loading: false,
    error: ""
}


export const GetSaldo = createSlice({
    name: "GetSaldo",
    initialState,
    reducers: {
        fetchPending(state) {
            state.saldo = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.saldo = action.payload
            state.loading = false
            state.error = ""
        },
        fetchReject(state, action) {
            state.saldo = ""
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchPending, fetchReject, fetchSuccess } = GetSaldo.actions

export const fetchAsyncSaldo = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const token = JSON.parse(sessionStorage.getItem('token'))
        const response = await axios.get("https://take-home-test-api.nutech-integrasi.com/balance", {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        dispatch(fetchSuccess(response.data.data))
    } catch (err) {
        console.log(err)
        dispatch(fetchReject(err.response?.data?.message || "Error fetching data"));
    }
}
export default GetSaldo.reducer