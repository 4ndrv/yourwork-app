import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Taskbar from "../Taskbar/Taskbar";
import Software from "../Software/Software";
import Loading from "../../Misc/Loading";
import { getFolderData } from "../../../Redux/filesSlice";

const DesktopManager = () => {
  const dispatch = useDispatch();
  const folderStatus = useSelector((state) => state.folderData.status);
  const todoStatus = useSelector((state) => state.todos.status);
  useEffect(() => {
    dispatch(getFolderData());
  }, [dispatch]);

  return (
    <div className="desktop-m">
      {(folderStatus === "loading" && <Loading />) ||
        (todoStatus === "loading" && <Loading />)}
    </div>
  );
};
const Desktop = () => {
  const tasks = useSelector((state) => state.tasks.runningTasks);
  return (
    <DesktopStyled>
      <DesktopManager />
      <img src="images/wallpapers/wall1.png" alt="Background" />
      <Taskbar />
      {tasks.map((task, index) => (
        <Software key={index} rank={index} task={task} />
      ))}
    </DesktopStyled>
  );
};
export default Desktop;

const DesktopStyled = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  .desktop-m {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

  img {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    margin: auto;
    height: 100%;
    z-index: -15;
    background-repeat: none;
    background-position: center;
    background-size: cover;
  }
`;
