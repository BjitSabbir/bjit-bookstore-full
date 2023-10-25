import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import compareSlice from './slices/compareSlice'

const store = configureStore({
    reducer: {
        cart: cartSlice,
        compare: compareSlice
    }
})

export default store
