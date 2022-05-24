import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addRunningTask, toggleMinimizeTask } from "../../../Redux/tasksSlice";

import Start from "./Start/Start";
import Task from "./Task/Task";
import { setTopWindow } from "../../../Redux/windowSlice";

const Taskbar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.runningTasks);
  const openTask = (taskName) => {
    if (tasks.findIndex((task) => task.name == taskName) === -1) {
      dispatch(addRunningTask(taskName));
    }
    if (tasks.findIndex((task) => task.name == taskName) !== -1) {
      dispatch(toggleMinimizeTask(taskName));
      dispatch(setTopWindow());
    }
  };

  return (
    <TaskbarStyled id="taskbar">
      <Start />
      <Task
        name="explorer"
        onOpenTask={(e) => openTask(e)}
        status={tasks.findIndex((task) => task.name == "explorer")}
      />
      <Task
        name="browser"
        onOpenTask={(e) => openTask(e)}
        status={tasks.findIndex((task) => task.name == "browser")}
      />
      <Task
        name="calculator"
        onOpenTask={(e) => openTask(e)}
        status={tasks.findIndex((task) => task.name == "calculator")}
      />
    </TaskbarStyled>
  );
};

export default Taskbar;

const TaskbarStyled = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  z-index: 9999999;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 800px;
  height: 50px;
  background: #2b5876; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2b5876,
    #4e4376
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2b5876,
    #4e4376
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 50px;
`;
