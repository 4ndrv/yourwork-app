import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/usersSlice";
const Login = () => {
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        userName: e.target.userName.value.trim(),
        password: e.target.password.value.trim(),
      })
    );
  };
  return (
    <LoginStyled>
      <div className="login-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120.438"
          height="120.43"
          viewBox="0 0 194.438 194.43"
        >
          <g
            id="Group_11591"
            data-name="Group 11591"
            transform="translate(6 6)"
          >
            <g id="profile-user" transform="translate(0 0)">
              <path
                id="Path_23422"
                data-name="Path 23422"
                d="M91.219,0a91.215,91.215,0,1,0,91.219,91.215A91.22,91.22,0,0,0,91.219,0Zm0,27.274A30.171,30.171,0,1,1,61.052,57.446,30.173,30.173,0,0,1,91.219,27.275ZM91.2,158.582a66.946,66.946,0,0,1-43.594-16.075,12.857,12.857,0,0,1-4.512-9.773,30.428,30.428,0,0,1,30.576-30.42h35.108a30.384,30.384,0,0,1,30.528,30.42A12.825,12.825,0,0,1,134.8,142.5,66.922,66.922,0,0,1,91.2,158.582Z"
                transform="translate(0 -0.001)"
                fill="none"
                stroke="#fff"
                strokeWidth="12"
              />
            </g>
          </g>
        </svg>
      </div>
      <form className="login-form" onSubmit={(e) => login(e)}>
        <div className="form-control">
          <label htmlFor="">User name:</label>
          <input type="text" name="userName" />
        </div>
        <div className="form-control">
          <label htmlFor="">Password:</label>
          <input type="password" name="password" />
        </div>

        <div className="account-box">
          <button type="submit" className="btn-sign-in">
            Sign In
          </button>
          <div className="btn-sign-up">
            <Link to="/signup">If you don't have account, Signup Here!</Link>
          </div>
        </div>
      </form>
    </LoginStyled>
  );
};

export default Login;

const LoginStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #0b1d51;
  .login-form {
    margin-top: 30px;
    color: white;
    min-width: 340px;
    .form-control {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      label {
        margin-bottom: 10px;
      }
      input {
        height: 40px;
        outline: none;
        border: none;
        color: white;
        background: #0000005c;
        padding: 15px 20px;
        &:focus {
          outline: 2px solid #fff;
          outline-offset: -4px;
        }
      }
    }
    .account-box {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      .btn-sign-in {
        height: 40px;
        font-size: 20px;
        font-weight: bold;
        padding: 0px 10px;
        width: 100%;
        cursor: pointer;
        color: white;
        border-radius: 5px;
        border: none;
        background: #274191;
      }

      .btn-sign-up {
        margin: 20px auto;

        a {
          cursor: pointer;
          color: #ffffff6f;
          text-decoration: underline;
        }
      }
    }
  }
`;
