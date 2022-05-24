import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from './axiosConfig';


const initialState = {
    data: [],
    path: [{ name: 'root', _id: "root" }]
}
//get folder data api
export const getFolderData = createAsyncThunk(
    'folders/getall',
    async () => {
        const res = await api.get('/folders')
        return await res.data;
    }
)
// create folder 
export const createFolderItem = createAsyncThunk(
    'folders/create',
    async (payload) => {
        const res = await api.post('/folders', {
            name: payload.name,
            type: payload.type,
            containBy: payload.path
        })
        const newItem = await res.data;
        if (payload.type === "todo") {
            const todoRes = await api.post("/todos/create", {
                name: payload.name,
                fileHandle: newItem._id
            })
            const todoData = await todoRes.data;

        }
        return newItem;
    }
)
// delete folder
export const deleteFolder = createAsyncThunk(
    'folders/delete',
    async (payload) => {
        await api.delete(`/folders/delete?fileId=${payload.id}&containBy=${payload.containBy}`)
        if (payload.type === "todo") {
            await api.delete(`/todos/delete/${payload.id}`)
        }
        return payload.id;
    }
)
// rename folder
export const renameFolder = createAsyncThunk(
    'folders/rename',
    async (payload) => {
        await api.put(`/folders/rename?fileId=${payload._id}&fileName=${payload.name}`)
        return payload;
    }
)
// rename folder
export const moveFolder = createAsyncThunk(
    'folders/move',
    async (payload) => {
        const res = await api.put(`/folders/move?fileId=${payload.fromFolderId}&toId=${payload.toPath}`)
        const data = await res.data;
        return payload;
    }
)
// create folder 
export const createTodo = createAsyncThunk(
    'todos/create',
    async (payload) => {
        const res = await api.post('/folders', {
            name: payload.name,
            type: "todo",
            containBy: payload.path
        })
        return await res.data;
    }
)

export const filesSlice = createSlice({
    name: "folderData",
    initialState,
    reducers: {
        //path
        addPath: (state, action) => {
            state.path = [...state.path, { name: action.payload.name, _id: action.payload._id }];
        },
        changePath: (state, action) => {
            // if (state.path.indexOf(action.payload) === -1) return;
            const updatedPath = state.path.slice(0, state.path.findIndex(data => data._id === action.payload) + 1);
            state.path = updatedPath;
        },
        prevPath: (state) => {
            if (state.path.length === 1) {
                return;
            }
            const updatedPath = state.path.slice(0, state.path.length - 1);
            state.path = updatedPath;
        },
        // folder
        moveFolder: (state, action) => {
            const fromPos = state.data.findIndex(data => data._id === action.payload.fromFolderId);
            state.data[fromPos].containBy = action.payload.toPath;

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getFolderData.pending, state => {
                state.status = 'loading';
            })
            .addCase(getFolderData.fulfilled, (state, action) => {
                state.status = 'loaded';

                state.data = action.payload;
            });

        //create folder
        builder
            .addCase(createFolderItem.pending, state => {
                state.status = 'loading';
            })
            .addCase(createFolderItem.fulfilled, (state, action) => {
                state.status = 'loaded';

                state.data.push(action.payload);
            });


        //delete folder
        builder
            .addCase(deleteFolder.pending, state => {
                state.status = 'loading';
            })
            .addCase(deleteFolder.fulfilled, (state, action) => {
                state.status = 'loaded';
                const updatedData = state.data.filter(file => file._id !== action.payload);
                state.data = updatedData;
            });
        //rename folder
        builder
            .addCase(renameFolder.pending, state => {
                state.status = 'loading';
            })
            .addCase(renameFolder.fulfilled, (state, action) => {
                state.status = 'loaded';
                const folderTarget = state.data.findIndex(data => data._id === action.payload._id);
                state.data[folderTarget] = { ...state.data[folderTarget], name: action.payload.name };
            });
        //move folder
        builder
            .addCase(moveFolder.pending, state => {
                state.status = 'loading';
            })
            .addCase(moveFolder.fulfilled, (state, action) => {
                state.status = 'loaded';
                const fromPos = state.data.findIndex(data => data._id === action.payload.fromFolderId);
                state.data[fromPos].containBy = action.payload.toPath;
            });

    }
})





//path
export const { addPath, changePath, prevPath } = filesSlice.actions;
//folder
export const { getData } = filesSlice.actions;



export default filesSlice.reducer