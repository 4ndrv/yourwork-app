import styled from "styled-components";
import { useEffect, useState } from "react";
import WindowHeaderBar from "./WindowHeaderBar";
import { useDispatch, useSelector } from "react-redux";
import { setTopWindow } from "../../../Redux/windowSlice";

const Window = ({ children, size, rank, name, minimize }) => {
  const [sizeBox, setSizeBox] = useState([size[0], size[1]]);
  const windowRank = useSelector((state) => state.window.TopWindow);
  const dispatch = useDispatch();
  useEffect(() => {
    //animation open
    setTimeout(() => {
      document.querySelector(`.window-${rank}`).style.opacity = "1";
    }, 100);
    document.querySelector(`.window-${rank}`).style.zIndex = `${
      windowRank + 1
    }`;
    return document.querySelector(`.window-${rank}`).style.zIndex;
  }, []);
  const setTop = () => {
    document.querySelector(`.window-${rank}`).style.zIndex = `${
      windowRank + 1
    }`;
    dispatch(setTopWindow());
  };
  return (
    <WindowStyled
      className={`window-${rank} ${name} ${minimize ? "minimize" : ""}`}
      style={{
        width: `${sizeBox[0]}px`,
        height: `${sizeBox[1]}px`,
      }}
      onClick={() => setTop()}
    >
      <WindowHeaderBar rank={rank} name={name} />
      {children}
    </WindowStyled>
  );
};

export default Window;

const WindowStyled = styled.div`
  position: absolute;
  background: #f3fdff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  &.minimize {
    display: none;
    transition: all 0.5s ease-ease-in-out;
  }
`;
