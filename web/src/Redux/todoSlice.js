import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from './axiosConfig';

//get todo data 
export const getTodoData = createAsyncThunk(
    'todos/getdata',
    async (payload) => {
        const res = await api.get(`/todos/${payload}`)
        return await res.data;
    }
)
//add todo list
export const addListItem = createAsyncThunk(
    'todos/add',
    async (payload) => {
        let error = false;
        await api.post(`/todos/add`, {
            fileHandle: payload.fileHandle,
            todo: payload.todo
        }).catch(err => {
            error = true;
            alert("Your todo exists!")
        })
        if (!error) {
            return payload;
        }
    }
)
//delete todo list
export const deleteListItem = createAsyncThunk(
    'todos/delete',
    async (payload) => {

        await api.delete(`/todos/delete?fileHandle=${payload.fileHandle}&todo=${payload.todo}`)
        return payload;
    }
)
//set done todo
export const setDoneTodo = createAsyncThunk(
    'todos/done',
    async (payload) => {

        await api.put(`/todos/done?fileHandle=${payload.fileHandle}&done=${payload.done}&content=${payload.content}`)
        return payload;
    }
)
const initialData = {
    data: [

    ]
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialData,
    reducers: {
        renameTodo: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodoData.pending, state => {
                state.status = 'loading';
            })
            .addCase(getTodoData.fulfilled, (state, action) => {
                state.status = 'loaded';
                if (state.data.findIndex(todo => todo.fileHandle === action.payload.fileHandle) === -1) {
                    state.data = [...state.data, action.payload]
                }
            });
        builder
            .addCase(addListItem.pending, state => {
                state.status = 'loading';
            })
            .addCase(addListItem.fulfilled, (state, action) => {
                state.status = 'loaded';
                if (action.payload) {
                    state.data[state.data.findIndex(todo => todo.fileHandle === action.payload.fileHandle)].list.unshift({ content: action.payload.todo, done: false })
                }

            });
        builder
            .addCase(deleteListItem.pending, state => {
                state.status = 'loading';
            })
            .addCase(deleteListItem.fulfilled, (state, action) => {
                state.status = 'loaded';
                const dataTarget = state.data[state.data.findIndex(todo => todo.fileHandle === action.payload.fileHandle)]
                const newList = dataTarget.list.filter(todo => todo.content !== action.payload.todo);
                dataTarget.list = newList;
            });
        builder
            .addCase(setDoneTodo.pending, state => {
                state.status = 'loading';
            })
            .addCase(setDoneTodo.fulfilled, (state, action) => {
                state.status = 'loaded';
                const dataTarget = state.data[state.data.findIndex(todo => todo.fileHandle === action.payload.fileHandle)]
                dataTarget.list[dataTarget.list.findIndex(list => list.content === action.payload.content)].done = action.payload.done;
            });


    }
})

export const { addTodoData } = todoSlice.actions

export default todoSlice.reducer; 