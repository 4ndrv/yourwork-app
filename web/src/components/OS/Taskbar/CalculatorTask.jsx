import styled from "styled-components";

const CalculatorTask = ({ status, onOpenTask }) => {
  return (
    <CalculatorTaskStyled>
      <div
        onClick={() => onOpenTask("calculator")}
        id="btn-calculator-icon"
        className={`${status !== -1 ? "active" : ""}`}
      >
        <i className="fas fa-calculator"></i>
      </div>
    </CalculatorTaskStyled>
  );
};
export default CalculatorTask;

const CalculatorTaskStyled = styled.div`
  height: 100%;
  #btn-calculator-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    i {
      font-size: 26px;
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
