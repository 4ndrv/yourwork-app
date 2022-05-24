import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    runningTasks: [],
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addRunningTask: (state, action) => {
            state.runningTasks.push({ name: action.payload, minimize: false });

        },
        closeRunningTask: (state, action) => {

            const updatedTask = state.runningTasks.filter(task => task.name !== action.payload);
            state.runningTasks = updatedTask;
        },
        toggleMinimizeTask: (state, action) => {
            const taskTarget = state.runningTasks[state.runningTasks.findIndex(task => task.name === action.payload)];
            taskTarget.minimize = !taskTarget.minimize;
        }


    }
})

export const { addRunningTask, closeRunningTask, toggleMinimizeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
