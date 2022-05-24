import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingStyled>
      <img src="images/misc/loading-spin.gif" alt="" />
    </LoadingStyled>
  );
};
export default Loading;

const LoadingStyled = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  z-index: 99999999999999;
  justify-content: center;
  align-items: center;
  background: #daf4ff70;
  img {
    margin: auto;
    max-width: 100px;
    max-height: 100px;
    background-color: transparent;
    color: transparent;
  }
`;
