import { useEffect } from "react";
import styled from "styled-components";

const ExplorerTask = ({ status, onOpenTask, minimize }) => {
  return (
    <ExplorerStyled>
      <div
        onClick={() => onOpenTask("explorer")}
        id="btn-explorer-icon"
        className={`${status !== -1 ? "active" : ""}`}
      >
        <i className="fas fa-folder"></i>
      </div>
    </ExplorerStyled>
  );
};
export default ExplorerTask;

const ExplorerStyled = styled.div`
  height: 100%;
  #btn-explorer-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    i {
      font-size: 28px;
      font-smooth: 2px;
      color: #ffffffcf;
    }
    &.active {
      background: #ffffff22;
    }
    &:hover {
      background: #ffffff22;
    }
  }
`;
