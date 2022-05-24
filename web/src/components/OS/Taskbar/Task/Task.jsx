import styled from "styled-components";

const Task = ({ name, onOpenTask, status }) => {
  switch (name) {
    case "browser":
      return (
        <TaskStyled>
          <div
            onClick={() => onOpenTask("browser")}
            className={`${status !== -1 ? "active" : ""} icon`}
          >
            <i className="fab fa-chrome"></i>
          </div>
        </TaskStyled>
      );
    case "calculator":
      return (
        <TaskStyled>
          <div
            onClick={() => onOpenTask("calculator")}
            className={`${status !== -1 ? "active" : ""} icon`}
          >
            <i className="fas fa-calculator"></i>
          </div>
        </TaskStyled>
      );
    case "explorer":
      return (
        <TaskStyled>
          <div
            onClick={() => onOpenTask("explorer")}
            className={`${status !== -1 ? "active" : ""} icon`}
          >
            <i className="fas fa-folder"></i>
          </div>
        </TaskStyled>
      );
    default:
      return;
  }
};

export default Task;

const TaskStyled = styled.div`
  height: 100%;
  .icon {
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
    .fa-calculator {
      margin-top: 2px;
      font-size: 24px;
    }
    &.active {
      background: #ffffff22;
    }
    &:hover {
      background: #ffffff22;
    }
  }
`;
