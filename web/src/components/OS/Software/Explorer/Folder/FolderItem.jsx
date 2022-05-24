import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addPath, moveFolder } from "../../../../../Redux/filesSlice";
import { addRunningTask } from "../../../../../Redux/tasksSlice";

const FolderItem = ({ dragged, setDragged, setInteractWith, data }) => {
  const dispatch = useDispatch();

  const dragStart = (e) => {
    const img = document.createElement("img");
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(img, 0, 0);
    e.target.style.opacity = "0.5";
    setDragged(e.target);
  };
  //detect folder
  const dragOver = (e) => {
    e.preventDefault();
    const folderHover = e.target;
    const offsetWidth = e.target.getBoundingClientRect().width / 2;
    const offsetMouse = e.nativeEvent.offsetX;

    if (offsetMouse > offsetWidth + offsetWidth / 2) {
      folderHover.classList.add("after");
      folderHover.classList.remove("before", "this");
    } else if (offsetMouse < offsetWidth - offsetWidth / 2) {
      folderHover.classList.add("before");
      folderHover.classList.remove("this", "after");
    } else {
      folderHover.classList.remove("before", "after");
      folderHover.classList.add("this");
    }
  };
  //leave
  const dragLeave = (e) => {
    e.target.classList.remove("this", "before", "after");
  };
  //end
  const dragEnd = (e) => {
    e.target.style.opacity = "1";
  };
  //drop folder
  const dropFolder = (e) => {
    e.preventDefault();
    const folderHover = e.target;
    const offsetWidth = e.target.getBoundingClientRect().width / 2;
    const offsetMouse = e.nativeEvent.offsetX;
    dragged.style.opacity = "1";
    e.target.classList.remove("this", "before", "after");
    if (e.target === dragged) return;
    if (offsetMouse > offsetWidth + offsetWidth / 2) {
      folderHover.parentNode.insertBefore(dragged, folderHover.nextSibling);
    } else if (offsetMouse < offsetWidth - offsetWidth / 2) {
      folderHover.parentNode.insertBefore(dragged, folderHover);
    } else {
      const fromFolderId = dragged.getAttribute("id");
      const toPath = data._id;
      //move data
      dispatch(moveFolder({ fromFolderId, toPath }));
    }
    setDragged(null);
  };

  //add Path location or open App
  const openFolder = () => {
    switch (data.type) {
      case "folder":
        dispatch(addPath({ ...data }));
        break;
      case "todo":
        dispatch(addRunningTask("t" + data._id));
        break;
      default:
        return;
    }
  };
  return (
    <FolderItemStyled
      className="icon"
      draggable={true}
      id={data._id}
      onDragStart={(e) => dragStart(e)}
      onDragOver={(e) => dragOver(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDrop={(e) => dropFolder(e)}
      onDragEnd={(e) => dragEnd(e)}
      onDoubleClick={() => openFolder()}
      onContextMenu={(e) => {
        e.isPropagationStopped();
        setInteractWith({ ...data });
      }}
    >
      <TypeIcon type={data.type} />
      <div className="name">{data.name}</div>
    </FolderItemStyled>
  );
};
export default FolderItem;

const TypeIcon = ({ type }) => {
  switch (type) {
    case "folder":
      return <i className="fas fa-folder"></i>;
    case "todo":
      return (
        <i style={{ color: "#67a4ab" }} className="fas fa-clipboard-list"></i>
      );
    default:
      return null;
  }
};

const FolderItemStyled = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2b5876e2;
  user-select: none;
  border-radius: 50%;
  /* pointer-events: ${(props) => (props.nameState ? "none" : "auto")}; */
  transition: background 0.3s ease-in;
  &.after::after {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    right: -7.5px;
    top: 35px;
    background: #ff8a8a;
    border-radius: 50%;
  }

  &.before::after {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: -7.5px;
    top: 35px;
    background: #ff8a8a;
    border-radius: 50%;
  }

  &.this {
    border-radius: 50%;
    background-color: #d65b4a9e;
    i {
      color: white;
    }
    div {
      color: white;
    }
  }
  background: transparent;
  i {
    position: relative;
    pointer-events: none;
  }

  .name {
    font-size: 14px;
    pointer-events: none;
    text-align: center;
    &.editing {
      padding: 5px 10px;
    }
  }
`;
