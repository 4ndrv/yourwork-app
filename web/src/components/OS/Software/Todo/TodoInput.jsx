import styled from "styled-components";
import { addListItem } from "../../../../Redux/todoSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TodoInput = ({ fileHandle }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue !== "") {
      dispatch(addListItem({ fileHandle, todo: inputValue }));
    }
    setInputValue("");
  };
  return (
    <TodoInputStyled>
      <div className="title">Add todo</div>
      <div className="add-tool">
        <input
          type="text"
          maxLength={32}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-btn" onClick={() => addTodo()}>
          ADD
        </button>
      </div>
    </TodoInputStyled>
  );
};

export default TodoInput;

const TodoInputStyled = styled.div`
  margin-top: 52px;
  .title {
    font-size: 24px;
    letter-spacing: 1.2px;
    margin-bottom: 14px;
  }
  .add-tool {
    display: flex;
    justify-content: space-between;
    input {
      border: none;
      height: 52px;
      outline-color: #266369;
      width: 75%;
      padding: 0 20px;
      font-size: 20px;
      color: #356a70;
    }
    button {
      width: 25%;
      cursor: pointer;
      border: none;
      background: #ca5050;
      color: white;
      font-size: 18px;
      &:hover {
        background: #963232;
      }
    }
  }
`;
