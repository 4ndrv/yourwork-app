import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signOut } from "../../../../Redux/usersSlice";
import Account from "./Account";
import Setting from "./Setting";
import AppInfo from "./AppInfo";
import { useState } from "react";

const StartModal = ({ setModalActive }) => {
  const dispatch = useDispatch();
  const [contentState, setContentState] = useState(1);
  return (
    <StartModalStyled>
      <div
        className="start-modal-background"
        onClick={() => setModalActive(false)}
      ></div>

      <div className="start-modal-inner">
        <div className="close-btn" onClick={() => setModalActive(false)}>
          X
        </div>
        <div className="start-nav">
          <div className="start-item" onClick={() => setContentState(1)}>
            Account
          </div>
          <div className="start-item" onClick={() => setContentState(2)}>
            Setting
          </div>
          <div className="start-item" onClick={() => setContentState(3)}>
            App Information
          </div>

          <div
            rel="stylesheet"
            className="signout-btn"
            onClick={() => dispatch(signOut())}
          >
            <div className="">Sign out</div>
          </div>
        </div>
        <div className="start-content">
          {contentState === 1 && <Account />}
          {contentState === 2 && <Setting />}
          {contentState === 3 && <AppInfo />}
        </div>
      </div>
    </StartModalStyled>
  );
};

export default StartModal;

const StartModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1b1a1a47;

  .start-modal-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  .start-modal-inner {
    position: relative;
    background: white;
    width: 60%;
    height: 50%;
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      color: grey;
      border: 1px solid grey;
      border-radius: 50%;
      cursor: pointer;
    }
    .start-nav {
      width: 30%;
      height: 100%;
      padding: 20px;
      background: #434385;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      .start-item {
        display: inline;
        color: white;
        line-height: 29px;
        cursor: pointer;

        div {
          display: inline;
        }
      }
      .signout-btn {
        margin-top: auto;
        width: 100%;
        background: #b17171;
        text-align: center;
        border-radius: 5px;
        padding: 5px 0 8px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
          background: #704848;
        }
      }
    }
    .start-content {
      width: 70%;
      height: 100%;
      padding: 20px;
    }
  }
`;
