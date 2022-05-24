import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";

import FolderItem from "./FolderItem";
import ContextMenu from "../ContextMenu/ContextMenu";
import ContextEventModal from "../ContextMenu/ContextEventModal";

const FolderContainer = () => {
  //get historyPath to display data
  const path = useSelector((state) => {
    if (state.folderData.path)
      return state.folderData.path[state.folderData.path.length - 1];
  });
  const data = useSelector((state) => {
    if (state.folderData.data)
      return state.folderData.data.filter(
        (data) => data.containBy === path._id
      );
  });
  const [isIconClicked, setIconClicked] = useState(false);
  const [dragged, setDragged] = useState(null);
  const [isContext, setIsContext] = useState(false);
  const [contextPos, setContextPos] = useState([]);
  const [contextState, setContextState] = useState(null);
  const [interactWith, setInteractWith] = useState(null);

  //Context menu function
  const contextMenu = (e) => {
    e.preventDefault();
    //Return when right click on context Menu
    if (e.target.classList.contains("context-item")) return;
    //calculate context menu if folder Clicked
    const containerPos = document
      .querySelector(".folder-container")
      .getBoundingClientRect();
    const iconPos = e.target.getBoundingClientRect();
    const offsetIconPos = [
      iconPos.x - containerPos.x,
      iconPos.y - containerPos.y,
    ];
    //check if folder Clicked
    if (e.target.classList.contains("icon")) {
      setContextPos([
        offsetIconPos[0] + e.nativeEvent.offsetX,
        offsetIconPos[1] + e.nativeEvent.offsetY,
      ]);
      setIconClicked(true);
      setIsContext(true);
    } else {
      setContextPos([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
      setIconClicked(false);
      setIsContext(true);
    }
    //turn of context menu
    window.addEventListener("click", () => setIsContext(false));
    window.addEventListener("drag", () => setIsContext(false));
  };

  return (
    <FolderContainerStyled
      onContextMenu={(e) => contextMenu(e)}
      className="folder-container"
    >
      {data.length > 0 ? (
        data.map((data) => (
          <FolderItem
            key={data._id}
            _id={data._id}
            data={data}
            setInteractWith={setInteractWith}
            name={data.name}
            type={data.type}
            dragged={dragged}
            setDragged={setDragged}
          />
        ))
      ) : (
        <div className="notthing-notify">
          Nothing here !! <br /> Right click to Create new todo or folder!
        </div>
      )}
      {/* Display on/of context menu */}
      {isContext ? (
        <ContextMenu
          isIconClicked={isIconClicked}
          interactWith={interactWith}
          setContextState={setContextState}
          pos={contextPos}
        />
      ) : null}
      {/* detect context event */}
      {contextState !== null ? (
        <ContextEventModal
          contextState={contextState}
          setContextState={setContextState}
          interactWith={interactWith}
        />
      ) : null}
    </FolderContainerStyled>
  );
};

export default FolderContainer;

const FolderContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
  width: 100%;
  height: 100%;
  position: relative;
  align-content: flex-start;
  .notthing-notify {
    user-select: none;
    pointer-events: none;
    font-size: 17px;
    margin: 20% auto auto;
    opacity: 0.5;
  }
`;
