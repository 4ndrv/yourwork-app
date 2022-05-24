import styled from "styled-components";
import Window from "../../Window/Window";
import { useState } from "react";
import { useSelector } from "react-redux";

const size = [800, 600];

const Browser = ({ rank, name }) => {
  const [link, setLink] = useState("https://www.google.com/search?igu=1");
  const [inputText, setInput] = useState("");
  const taskStatus = useSelector((state) =>
    state.tasks.runningTasks.find((task) => {
      return task.name === name;
    })
  );
  const searchText = (e) => {
    if (e.key === "Enter") {
      setLink(
        `https://www.google.com/search?igu=1&ei=&q=${encodeURIComponent(
          inputText
        )}`
      );
    }
  };
  return (
    <BrowserStyled>
      <Window
        rank={rank}
        size={size}
        name="Browser"
        minimize={taskStatus.minimize}
      >
        <div className="browser">
          <div className="toolbar">
            <div className="browser-navigate">
              <i className="fas fa-sync-alt"></i>
            </div>
            <div className="search-input">
              <input
                type="text"
                onKeyPress={(e) => searchText(e)}
                value={inputText}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Search Google something ..."
              />
            </div>
          </div>
          <div className="web-content">
            <iframe src={link} title="google-search"></iframe>
          </div>
        </div>
      </Window>
    </BrowserStyled>
  );
};

export default Browser;

const BrowserStyled = styled.div`
  opacity: 1;
  transition: all 1s ease-in;

  .browser {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .toolbar {
      height: 43px;
      width: 100%;
      display: flex;
      justify-content: stretch;
      align-items: center;
      padding: 0 40px 0px 20px;
      background: #2b587668;
      .browser-navigate {
        width: 100px;
        display: flex;
        justify-content: flex-start;
        i {
          font-size: 20px;
          color: #2b5876;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .search-input {
        width: 100%;
        input {
          width: 100%;
          height: 27px;
          padding: 0 25px;
          border-radius: 30px;
          border: none;
          outline: 0px;
          transition: all 0.2s ease-in-out;
          &:focus {
            outline: 3px solid #2b5876;
          }
        }
      }
    }
    .web-content {
      width: 100%;
      height: 100%;
      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }
`;
