import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUserInfos: (state, action) => {
            state = Object.assign(state, action.payload)
        }
    }
})

export default configureStore({
    reducer: {
        user: userSlice.reducer
    },
})

export const { setUserInfos } = userSlice.actions