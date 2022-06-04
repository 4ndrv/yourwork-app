import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeRunningTask,
  toggleMinimizeTask,
} from "../../../Redux/tasksSlice";

const WindowHeaderBar = ({ rank, name }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.runningTasks);
  const [isFullScreen, setFullScreen] = useState(false);
  const [windowTempPos, setWindowTempPos] = useState([]);
  const [isPressed, setPressed] = useState(false);
  const [startPoint, setStartPoint] = useState();

  useEffect(() => {
    const windowEl = document.querySelector(`.${name}`);
    const windowHeight = document
      .querySelector("body")
      .getBoundingClientRect().height;
    const windowWidth = document
      .querySelector("body")
      .getBoundingClientRect().width;
    const maxLeft = windowWidth / 2;
    const minLeft = windowWidth / 8;
    const maxTop = windowHeight / 4;
    const minTop = windowHeight / 10;
    const windowPos = JSON.parse(localStorage.getItem(`${name}`)) || {
      leftPos: Math.floor(Math.random() * (maxLeft - minLeft) + minLeft),
      topPos: Math.floor(Math.random() * (maxTop - minTop) + minTop),
    };
    windowEl.style.transform = `translate(${Math.abs(windowPos.leftPos)}px, ${
      windowPos.topPos
    }px)`;

    //set temp Pos
    localStorage.setItem(
      `${name}`,
      JSON.stringify({ leftPos: windowPos.leftPos, topPos: windowPos.topPos })
    );
  }, [name]);
  //close Task
  const closeTask = (taskName) => {
    if (tasks.findIndex((task) => task.name === taskName) !== -1) {
      dispatch(closeRunningTask(taskName));
      localStorage.removeItem(`${name}`);
    }
  };
  //set Press
  const dectectPressed = (e) => {
    setPressed(true);
    setStartPoint([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
  };
  // moving window
  const moveWindow = (e) => {
    e.preventDefault();
    if (!isPressed) return;

    const window = document.querySelector(`.window-${rank}`);
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;
    const leftPos =
      window.getBoundingClientRect().left + (offsetX - startPoint[0]);
    const topPos =
      window.getBoundingClientRect().top + (offsetY - startPoint[1]);
    window.style.transform = `translate(${leftPos}px, ${topPos}px)`;
    //set temp Pos
    setWindowTempPos([leftPos, topPos]);
  };
  // maximize button
  const changeFullScreen = () => {
    const window = document.querySelector(`.${name}`);
    window.style.transition = `all 0.2s ease-in-out`;
    if (!isFullScreen) {
      setFullScreen(true);
      window.classList.add("fullscreen");
    } else {
      window.classList.remove("fullscreen");
      setFullScreen(false);
      window.style.transform = `translate(${windowTempPos[0]}px, ${windowTempPos[1]}px)`;
    }
    setTimeout(() => {
      window.style.transition = "";
    }, 200);
  };
  // // minimize button
  const minimizeWindow = () => {
    dispatch(toggleMinimizeTask(name.toLowerCase()));
  };

  return (
    <WindowHeaderStyled
      className="window-header"
      onMouseDown={(e) => dectectPressed(e)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onMouseMove={(e) => {
        moveWindow(e);
      }}
    >
      <div className="header-name">{name}</div>
      <div className="header-tool">
        <i
          className="fas fa-minus minimize"
          onClick={() => minimizeWindow()}
        ></i>
        <i
          className="far fa-square maximize"
          onClick={() => changeFullScreen()}
        ></i>
        <i
          className="fas fa-times close-window"
          onClick={(e) => closeTask(name.toLowerCase())}
        ></i>
      </div>
    </WindowHeaderStyled>
  );
};

export default WindowHeaderBar;

const WindowHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  height: 40px;
  background: #2b5876;
  border-radius: 5px 5px 0px 0px;
  .header-name {
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #ffffffa9;
    font-family: "Fredoka";
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  .header-tool {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
      color: white;
      font-weight: bold;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      &:hover {
        background: #e0dddd44;
        border-radius: 50%;
      }
    }
  }
`;
