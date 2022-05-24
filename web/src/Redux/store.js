import { configureStore } from '@reduxjs/toolkit';

import filesSlice from './filesSlice';
import tasksSlice from './tasksSlice';
import todoSlice from './todoSlice';
import usersSlice from './usersSlice';
import windowSlice from './windowSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        folderData: filesSlice,
        window: windowSlice,
        todos: todoSlice,
        users: usersSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})