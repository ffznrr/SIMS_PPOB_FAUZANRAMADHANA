import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    banner: [],
    loading: false,
    error: ""
}

const GetBanner = createSlice({
    name: "Get Banner",
    initialState,
    reducers: {
        fetchPending(state) {
            state.banner = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.banner = action.payload
            state.loading = false
            state.error = ""
        },
        fetchReject(state, action) {
            state.banner = ""
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchPending, fetchReject, fetchSuccess } = GetBanner.actions

export const fetchAsyncBanner = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const token = JSON.parse(sessionStorage.getItem('token'))
        const response = await axios.get("https://take-home-test-api.nutech-integrasi.com/banner", {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        dispatch(fetchSuccess(response.data))
    } catch (err) {
        dispatch(fetchReject(err.response?.data?.message || "Error fetching data"));
    }
}

export default GetBanner.reducer