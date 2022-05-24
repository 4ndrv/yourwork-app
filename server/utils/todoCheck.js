const todoCheck = (body) => {
    let err = {};
    console.log(body)
    if (!body.fileHandle) err.fileHandle = "Missing";
    if (!body.todo) err.todo = "Missing";
    return err;
}
module.exports = todoCheck;