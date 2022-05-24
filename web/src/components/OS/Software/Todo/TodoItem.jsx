import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteListItem, setDoneTodo } from "../../../../Redux/todoSlice";

const TodoItem = ({ todo, fileHandle }) => {
  const dispatch = useDispatch();

  return (
    <TodoItemStyled>
      <div
        className="item-name"
        style={{ textDecoration: `${todo.done ? "line-through" : "none"}` }}
      >
        {todo.content}
      </div>
      <div className="item-tools">
        <i
          className={`far ${todo.done ? "fa-check-square" : "fa-square"}`}
          onClick={() =>
            dispatch(
              setDoneTodo({
                fileHandle,
                done: !todo.done,
                content: todo.content,
              })
            )
          }
        ></i>
        <i
          className="fas fa-trash"
          onClick={() =>
            dispatch(deleteListItem({ fileHandle, todo: todo.content }))
          }
        ></i>
      </div>
    </TodoItemStyled>
  );
};

export default TodoItem;

const TodoItemStyled = styled.div`
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
`;
