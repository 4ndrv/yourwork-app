
const userSignupCheck = (data) => {
    let err = {};
    data.userName && data.userName.length < 3 ? err.userName = "Username must be more than 3 characters!" : 1;
    data.password && data.password.length < 8 ? err.password = "Username must be more than 8 characters!" : 1;
    if (!err) return false;
    return err;
}
module.exports = { userSignupCheck };

