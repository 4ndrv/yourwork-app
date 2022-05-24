import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeUserPassword, getUser } from "../../../../Redux/usersSlice";

const Account = () => {
  const dispatch = useDispatch();
  const [isChangePass, setChangePass] = useState(false);

  const user = useSelector((state) => state.users.user);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const changePassword = (e) => {
    e.preventDefault();
    const oldPass = e.target.oldPass.value.replace(/\s/g, "");
    const newPass = e.target.newPass.value.replace(/\s/g, "");
    if (oldPass == user.password) {
      dispatch(changeUserPassword(newPass));
    }
  };
  return (
    <AccountStyled>
      <i className="far fa-user user-icon"></i>
      <div className="user-infor">
        <div>User Name:</div>
        <div>{user.length !== 0 && user.userName}</div>
      </div>
      <div className="user-infor">
        <div>Created At:</div>
        <div>{user.length !== 0 && user.createdAt.substring(0, 7)}</div>
      </div>
      <div className="user-infor">
        <div>Change Password:</div>
        <button onClick={() => setChangePass(true)}>Change</button>
      </div>

      {isChangePass && (
        <div className="password-modal">
          <form onSubmit={(e) => changePassword(e)}>
            <div className="form-group">
              <label htmlFor="old-password">Old Password</label>
              <input
                required
                maxLength={16}
                minLength={8}
                type="text"
                name="oldPass"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                required
                maxLength={16}
                minLength={8}
                type="text"
                name="newPass"
              />
            </div>
            <div className="form-group">
              <button type="submit">Change</button>
              <div
                className="close-change"
                onClick={() => setChangePass(false)}
              >
                Close
              </div>
            </div>
          </form>
        </div>
      )}
    </AccountStyled>
  );
};

export default Account;

const AccountStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .user-icon {
    height: 80px;
    width: 80px;
    border: 3px solid #434385;
    border-radius: 50%;
    color: #434385;
    font-size: 42px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .user-infor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    margin-bottom: 10px;
    div:first-child {
      font-weight: bold;
      color: #434385;
    }
    button {
      cursor: pointer;
      background: none;
      border: 2px solid #434385;
      padding: 5px 10px;
      transition: all 0.3s ease;
      border-radius: 5px;
      &:hover {
        background: #434385;
        color: white;
      }
    }
  }
  .password-modal {
    position: fixed;
    z-index: 99999;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #434385;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      background: white;
      padding: 60px 80px;
      width: 100%;
      max-width: 400px;
      border-radius: 5px;

      .form-group {
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          height: 30px;
        }
        button {
          width: 100%;
          height: 30px;
          cursor: pointer;
          background: #434385;
          color: #fff;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .close-change {
          margin-left: auto;
          margin-right: 30px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
`;
