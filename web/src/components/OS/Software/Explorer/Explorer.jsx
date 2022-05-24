import styled from "styled-components";
import Window from "../../Window/Window";
import FolderContainer from "./Folder/FolderContainer";
import HeaderTools from "./HeaderTools";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const size = [810, 610];
const Explorer = ({ rank, name }) => {
  const taskStatus = useSelector((state) =>
    state.tasks.runningTasks.find((task) => {
      return task.name === name;
    })
  );

  return (
    <ExplorerStyled>
      <Window
        name="Explorer"
        size={size}
        rank={rank}
        minimize={taskStatus.minimize}
      >
        <div className="explorer-content">
          <HeaderTools />
          <FolderContainer />
        </div>
      </Window>
    </ExplorerStyled>
  );
};

export default Explorer;

const ExplorerStyled = styled.div`
  .explorer-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 50px;
  }
`;
