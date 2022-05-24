import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePath, prevPath } from "../../../../Redux/filesSlice";

const HistoryPath = ({ name, _id, onHistoryPathClick }) => {
  return (
    <div className="path-item" onClick={() => onHistoryPathClick(_id)}>
      {name === "root" ? "root:/" : `${name.toLowerCase()}/`}
    </div>
  );
};

const HeaderTools = () => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.folderData.path);
  const [history, setHistory] = useState(path);

  //detect path change
  useEffect(() => {
    setHistory(path);
    return () => {
      setHistory(path);
    };
  }, [path]);
  const historyPathClick = (_id) => {
    dispatch(changePath(_id));
  };
  return (
    <HeaderStyled>
      <i className="fas fa-arrow-left" onClick={() => dispatch(prevPath())}></i>
      <div className="history-location">
        {history !== undefined &&
          history.map((data, index) => (
            <HistoryPath
              key={index}
              _id={data._id}
              name={data.name}
              onHistoryPathClick={(_id) => historyPathClick(_id)}
            />
          ))}
      </div>
    </HeaderStyled>
  );
};

export default HeaderTools;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  background: #2b587697;
  i {
    font-size: 20px;
    cursor: pointer;
    margin-right: 30px;
    font-weight: bold;
    color: white;
  }

  .history-location {
    background-color: #ffffff78;
    color: #2e2e2ec0;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 18px;
    font-weight: 600;
    padding: 0 20px;
  }
  .path-item {
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
`;
