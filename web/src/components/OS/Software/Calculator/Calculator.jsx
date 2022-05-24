import styled from "styled-components";
import Window from "../../Window/Window";
import { useState } from "react";
import { processor } from "./processor";
import { useSelector } from "react-redux";

const size = [350, "auto"];

const Calculator = ({ rank, name }) => {
  const [display, setDisplay] = useState([]);

  const taskStatus = useSelector((state) =>
    state.tasks.runningTasks.find((task) => {
      return task.name === name;
    })
  );
  const numPress = (e) => {
    const data = e.target.getAttribute("data");
    const newDisplay = processor(display, data);
    setDisplay(newDisplay);
  };
  return (
    <CalculatorStyled prop={`.window-${rank}`}>
      <Window
        rank={rank}
        size={size}
        name="Calculator"
        minimize={taskStatus.minimize}
      >
        <div className="calculator">
          <div className="cal-display">
            {display.length === 0 ? "0" : display.join("")}
          </div>
          <div className="cal-num" onClick={(e) => numPress(e)}>
            <div className="num" data="c">
              C
            </div>
            <div className="num" data="del">
              del
            </div>
            <div className="num" style={{ width: "165px" }} data="equal">
              <i className="fas fa-equals"></i>
            </div>
            <div className="num" data="7">
              7
            </div>
            <div className="num" data="8">
              8
            </div>
            <div className="num" data="9">
              9
            </div>
            <div className="num" data="+">
              +
            </div>
            <div className="num" data="4">
              4
            </div>
            <div className="num" data="5">
              5
            </div>
            <div className="num" data="6">
              6
            </div>
            <div className="num" data="-">
              -
            </div>
            <div className="num" data="1">
              1
            </div>
            <div className="num" data="2">
              2
            </div>
            <div className="num" data="3">
              3
            </div>
            <div className="num" data="*">
              *
            </div>

            <div className="num" style={{ width: "165px" }} data="0">
              0
            </div>
            <div className="num" data=".">
              .
            </div>

            <div className="num" data="/">
              /
            </div>
          </div>
        </div>
      </Window>
    </CalculatorStyled>
  );
};

export default Calculator;

const CalculatorStyled = styled.div`
  .maximize {
    display: none !important;
  }
  ${(props) => props.prop} {
    background: #335158f0;
    .window-header {
      background: #00000024;
    }
  }
  user-select: none;
  .calculator {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .cal-display {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 20px;
      font-weight: bold;
      font-size: 30px;
      color: white;
      overflow-wrap: anywhere;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: #ffffff;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #ffaf8aee;
        border-radius: 10px;
        border: 0px solid #ffffff;
      }
    }
    .cal-num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 5px;
      .num {
        width: 80px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: bold;
        background: #8f8f8f2d;
        cursor: pointer;
        margin: 2.5px;
        border-radius: 5px;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: #bebebe89;
        }
        i {
          pointer-events: none;
        }
      }
    }
  }
`;
