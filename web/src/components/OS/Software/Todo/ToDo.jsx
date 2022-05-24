import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Window from "../../Window/Window";
import TodoItem from "./TodoItem";
import { getTodoData } from "../../../../Redux/todoSlice";
import Loading from "../../../Misc/Loading";
import TodoInput from "./TodoInput";

const size = [500, "auto"];

const ToDo = ({ rank, name }) => {
  const dispatch = useDispatch();
  const fileHandle = name.slice(1);
  const data = useSelector((state) =>
    state.todos.data.find((todo) => {
      return todo.fileHandle === fileHandle;
    })
  );
  const taskStatus = useSelector((state) =>
    state.tasks.runningTasks.find((task) => {
      return task.name === name;
    })
  );
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    dispatch(getTodoData(fileHandle));
  };

  return (
    <ToDoStyled prop={`.window-${rank}`}>
      {data ? (
        <Window
          rank={rank}
          size={size}
          name={name}
          minimize={taskStatus.minimize}
        >
          <div className="todo-container">
            <div className="todo-name">{data.name}</div>
            <div className="todo-today-text">Today i need to:</div>
            <div className="todo-item-container">
              {data.list.map((todo, index) => (
                <TodoItem key={index} fileHandle={fileHandle} todo={todo} />
              ))}
              {/* <TodoItem /> */}
            </div>
            <TodoInput fileHandle={fileHandle} />
          </div>
        </Window>
      ) : (
        <Loading />
      )}
    </ToDoStyled>
  );
};

export default ToDo;

const ToDoStyled = styled.div`
  ${(props) => props.prop} {
    border-radius: 8px !important;
    box-shadow: -20px -20px 0px 0px rgb(100 100 100 / 60%);
    background: #67a4ab;
    .window-header {
      cursor: all-scroll;
      border-radius: 0px;
      height: 60px;
      background: transparent;
      .header-name {
        opacity: 0;
      }
      .minimize {
        display: none;
      }
      .maximize {
        display: none;
      }
      i {
        cursor: pointer;
        background: #ca5050;
        border-radius: 50%;
        &:hover {
          background: #faaeae;
        }
      }
    }
    .todo-container {
      padding: 0 52px 60px 52px;
      color: #fff;
      .todo-name {
        font-family: "Pacifico";
        font-size: 36px;
        font-style: italic;
        letter-spacing: 2.5px;
      }
      .todo-today-text {
        font-size: 20px;
        line-height: 36px;
        width: 100%;
        border-bottom: 1px solid #ffffff53;
        margin-bottom: 45px;
      }
      .todo-item-container {
        margin: 0 -52px;
        max-height: 258px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }

        &::-webkit-scrollbar {
          width: 3px;
          background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #fff;
        }
        /* .todo-item {
          transition: transform 1s ease-in-out;
          padding: 18px 52px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:last-child {
            margin-bottom: 0px;
          }
          .item-name {
            font-size: 19px;
          }
          .item-tools {
            cursor: pointer;
            display: flex;
            align-items: center;
            i {
              cursor: pointer;
              font-size: 18px;
              margin-left: 15px;
              &:first-child {
                font-size: 20px;
              }
            }
          }
        } */
      }
    }
  }
`;
