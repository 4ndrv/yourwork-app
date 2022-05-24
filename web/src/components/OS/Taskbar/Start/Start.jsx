import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signOut } from "../../../../Redux/usersSlice";
import StartModal from "./StartModal";
import { useState } from "react";
const Start = () => {
  const dispatch = useDispatch();
  const [isModalActive, setModalActive] = useState(false);

  return (
    <StartStyled>
      <div id="btn-start-icon" onClick={() => setModalActive(true)}>
        <i className="fab fa-buysellads"></i>
      </div>
      {isModalActive && <StartModal setModalActive={setModalActive} />}
    </StartStyled>
  );
};
export default Start;

const StartStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #btn-start-icon {
    padding-right: 50px;
    margin-right: 20px;
    i {
      font-size: 28px;
      font-smooth: 2px;
      color: #ffffffcf;
    }
    border-right: 1px solid #ffffff5e;
  }
`;
