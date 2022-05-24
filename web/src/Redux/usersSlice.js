import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from './axiosConfig'

//user login
export const userLogin = createAsyncThunk(
    'users/userlogin',
    async (payload) => {
        let error;
        const res = await api.post(`/users/login`, {
            userName: payload.userName,
            password: payload.password
        }).catch(err => error = err.response);
        if (error) {
            return error.data;
        } else return await res.data;
    }
)
//user signup
export const userSignup = createAsyncThunk(
    'users/usersignup',
    async (payload) => {
        let error;
        const res = await api.post(`/users/signup`, {
            userName: payload.userName,
            password: payload.password
        }).catch(err => error = err.response);
        if (error) {
            return { ...error.data, error: true };
        } else return await res.data;
    }
)
//get UserInfo
export const getUser = createAsyncThunk(
    'users/',
    async (payload) => {
        const res = await api.get('/users/');
        return await res.data
    }
)
export const changeUserPassword = createAsyncThunk(
    'users/password',
    async (payload) => {

        const res = await api.put(`/users/password?value=${payload}`);
        return await res.data;
    }
)


const initialData = {
    error: [

    ],
    user: [

    ],
    token: localStorage.getItem('userToken')
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialData,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        signOut: (state) => {
            localStorage.removeItem('userToken');
            state.token = null;
            window.location.reload();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, state => {
                state.status = 'loading';
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'loaded';
                if (action.payload.error) {
                    alert(action.payload.error)
                } else {
                    state.token = action.payload.token;
                    localStorage.setItem("userToken", action.payload.token);
                    window.location.reload();
                }


            });
        builder
            .addCase(userSignup.pending, state => {
                state.status = 'loading';
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.status = 'loaded';

                if (action.payload.error) {
                    let newErr = [];
                    for (let err in action.payload) {
                        newErr.push(action.payload[err]);
                    }
                    state.error = newErr;
                } else {
                    alert("Create Success! Go to login >>")
                    window.location.reload();
                }
            });
        builder
            .addCase(getUser.pending, state => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.user = action.payload
            });
        builder
            .addCase(changeUserPassword.pending, state => {
                state.status = 'loading';
            })
            .addCase(changeUserPassword.fulfilled, (state, action) => {
                state.status = 'loaded';
                alert('Change Password Success!')
            });


    }
})

export const { setToken, signOut } = usersSlice.actions

export default usersSlice.reducer; 