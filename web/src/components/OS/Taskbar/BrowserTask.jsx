import styled from "styled-components";
const BrowserTask = ({ status, onOpenTask }) => {
  return (
    <BrowserTaskStyled>
      <div
        onClick={() => onOpenTask("browser")}
        id="btn-browser-icon"
        className={`${status !== -1 ? "active" : ""}`}
      >
        <i className="fab fa-chrome"></i>
      </div>
    </BrowserTaskStyled>
  );
};
export default BrowserTask;

const BrowserTaskStyled = styled.div`
  height: 100%;
  #btn-browser-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    i {
      font-size: 28px;
      font-smooth: 2px;
      color: #ffffffcf;
    }
    &.active {
      background: #ffffff22;
    }
    &:hover {
      background: #ffffff22;
    }
  }
`;
