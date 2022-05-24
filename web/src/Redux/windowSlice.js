import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TopWindow: 50
}

const windowSlice = createSlice({
    name: "window",
    initialState,
    reducers: {
        setTopWindow: (state) => {
            state.TopWindow += 1;
        }
    }
})

export const { setTopWindow } = windowSlice.actions;
export default windowSlice.reducer;