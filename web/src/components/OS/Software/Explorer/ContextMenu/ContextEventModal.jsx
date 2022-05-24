import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  createFolderItem,
  renameFolder,
} from "../../../../../Redux/filesSlice";

const ContextEventModal = ({ interactWith, setContextState, contextState }) => {
  const dispatch = useDispatch();
  const currentPath = useSelector((state) => state.folderData.path);
  const [inputValue, setInputValue] = useState("");

  const enterInput = (e) => {
    if (e === "Enter") {
      actionControl();
    }
  };

  const actionControl = () => {
    if (inputValue === "") {
      alert("Please type name..");
    } else {
      switch (contextState) {
        case "create":
          onCreateFolder();
          break;
        case "rename":
          onRename();
          break;
        case "create-todo":
          onCreateTodo();
          break;
        default:
          return;
      }
    }
  };
  const onCreateFolder = () => {
    dispatch(
      createFolderItem({
        name: inputValue,
        path: currentPath[currentPath.length - 1]._id,
        type: "folder",
      })
    );
    setContextState(null);
  };
  const onRename = () => {
    dispatch(renameFolder({ _id: interactWith._id, name: inputValue }));
    setContextState(null);
  };

  const onCreateTodo = () => {
    dispatch(
      createFolderItem({
        name: inputValue,
        path: currentPath[currentPath.length - 1]._id,
        type: "todo",
      })
    );
    setContextState(null);
  };

  return (
    <ContextEventModalStyled>
      <div className="modal-container">
        <input
          value={inputValue}
          placeholder="Type Name.."
          maxLength={12}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          onKeyDown={(e) => enterInput(e.key)}
        />
        <button onClick={() => actionControl()}>{contextState}</button>
      </div>
    </ContextEventModalStyled>
  );
};

export default ContextEventModal;

const ContextEventModalStyled = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0000006c;
  .modal-container {
    display: flex;
    justify-content: space-between;
    margin-top: -300px;
    padding: 25px;
    align-items: center;
    background: white;
    border-radius: 8px;
    input {
      height: 30px;
      padding: 0 12px;
      outline-color: #2b587697;
    }
    button {
      height: 30px;
      background: #2b587697;
      color: white;
      cursor: pointer;
      text-transform: uppercase;
    }
  }
`;
