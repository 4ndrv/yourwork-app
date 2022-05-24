import { useDispatch } from "react-redux";
import styled from "styled-components";

import { deleteFolder, addPath } from "../../../../../Redux/filesSlice";
import { addRunningTask } from "../../../../../Redux/tasksSlice";

const ContextMenu = ({ pos, isIconClicked, setContextState, interactWith }) => {
  const dispatch = useDispatch();
  const onCreateFolder = () => {
    setContextState("create");
  };
  const onCreateTodo = () => {
    setContextState("create-todo");
  };
  const onDelete = () => {
    if (interactWith !== null) {
      dispatch(
        deleteFolder({
          id: interactWith._id,
          type: interactWith.type,
          containBy: interactWith.containBy,
        })
      );
    }
  };
  const onOpen = () => {
    switch (interactWith.type) {
      case "folder":
        dispatch(addPath(interactWith));
        break;
      case "todo":
        dispatch(addRunningTask("t" + interactWith._id));
        break;
      default:
        return;
    }
  };
  const onRename = () => {
    setContextState("rename");
  };
  return (
    <ContextMenuStyled
      style={{ top: pos[1], left: pos[0] }}
      className="context-menu"
    >
      <div
        className="context-1"
        style={{ display: `${isIconClicked ? "none" : "block"}` }}
      >
        <div className="context-item" onClick={() => onCreateTodo()}>
          Create Todo
        </div>
        <div className="context-item" onClick={() => onCreateFolder()}>
          Create Folder
        </div>
        <div className="context-item">Refresh</div>
      </div>
      <div
        className="context-2"
        style={{ display: `${isIconClicked ? "block" : "none"}` }}
      >
        <div className="context-item" onClick={() => onOpen()}>
          Open
        </div>
        <div className="context-item" onClick={() => onDelete()}>
          Delete
        </div>
        <div className="context-item" onClick={() => onRename()}>
          Rename
        </div>
      </div>
      <div className="context-item last-child">Properties</div>
    </ContextMenuStyled>
  );
};
export default ContextMenu;

const ContextMenuStyled = styled.div`
  position: absolute;
  z-index: 999999999;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 1px 0px;
  border-radius: 5px;
  overflow: hidden;
  .context-item {
    font-size: 14px;
    font-weight: medium;
    color: #2b5876e2;
    padding: 10px 25px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    &.last-child {
      margin-top: 15px;
      padding-bottom: 13px;
      border: none;
      border-top: 0.2px solid #dddddd7b;
    }
    &:hover {
      background: #67c2ff44;
      border-color: none;
    }
  }
  .name-input {
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    background-color: #fff;
  }
`;
