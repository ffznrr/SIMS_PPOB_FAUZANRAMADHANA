import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    profile: [],
    loading: false,
    error: ""
}

export const GetProfile = createSlice({
    name: "GetProfile",
    initialState,
    reducers: {
        fetchPending(state) {
            state.profile = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.profile = action.payload
            state.loading = false
            state.error = ""
        },
        fetchReject(state, action) {
            state.profile = ""
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchPending, fetchReject, fetchSuccess } = GetProfile.actions

export const fetchAsyncProfile = () => async (dispatch) => {
    try {
        dispatch(fetchPending())
        const token = JSON.parse(sessionStorage.getItem('token'))
        const response = await axios.get("https://take-home-test-api.nutech-integrasi.com/profile", {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        dispatch(fetchSuccess(response.data.data))
    } catch (err) {
        dispatch(fetchReject(err.response?.data?.message || "Error fetching data"));
    }
}

export default GetProfile.reducer