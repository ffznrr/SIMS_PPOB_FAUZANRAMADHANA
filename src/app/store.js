import { configureStore } from '@reduxjs/toolkit'
import GetService from '../features/GetService'
import GetBanner from '../features/GetBanner'
import GetProfile from '../features/GetProfile'
import GetSaldo from '../features/GetSaldo'



export const store = configureStore({
    reducer: {
        GetService,
        GetBanner,
        GetProfile,
        GetSaldo
    },
})