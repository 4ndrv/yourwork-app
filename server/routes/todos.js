const router = require('express').Router();
const Todo = require('../models/Todo');


//check data entry
const todoCheck = require("../utils/todoCheck");

//get todo
router.get('/:filehanlde', (req, res) => {
    try {
        console.log(req.params.filehanlde)
        Todo.findOne({ fileHandle: req.params.filehanlde }, (err, data) => {
            if (err) return res.status(400).json({ error: "Your Todo file does not exist" });
            console.log(data)
            return res.status(200).json(data);
        })
    } catch (err) {
        console.log(err)
    }
})
//create todo data
router.post('/create', (req, res) => {
    try {
        //check data entry
        let err = {}
        if (!req.body.name) err.name = "Missing";
        if (!req.body.fileHandle) err.fileHandle = "Missing";
        if (Object.keys(err).length > 0) return res.status(400).json(err);
        //check exists
        Todo.findOne({ fileHandle: req.body.fileHandle }, async (err, data) => {
            if (!data) {
                const newTodo = new Todo({
                    name: req.body.name,
                    fileHandle: req.body.fileHandle,
                    userHandle: req.userId
                })
                await newTodo.save();
                return res.status(200).json({ message: "Create todo successfully!" })
            } else return res.status(400).json({ error: "Todo data exist!", data })
        })
    } catch (err) {
        console.log(err)
    }
})
//add todo list 
router.post('/add', (req, res) => {
    try {
        //check data entry
        if (Object.keys(todoCheck(req.body)).length > 0) return res.status(400).json(todoCheck(req.body));
        //check exists
        Todo.findOne({ fileHandle: req.body.fileHandle }, async (err, data) => {
            if (data) {
                if (data.list.findIndex(list => list.content === req.body.todo) !== -1) return res.status(400).json({ error: "Your todo exists!" })
                const newTodo = {
                    content: req.body.todo,
                    done: false
                }
                Todo.findByIdAndUpdate(data._id, { list: [...data.list, newTodo] }, (err, data) => {
                    if (err) res.status(400).json(err);
                    return res.status(200).json({ message: "Add success!" })
                })
            } else return res.status(400).json({ error: "Todo file does not exist!" })
        })
    } catch (err) {
        console.log(err)
    }
})
//delete todo 
router.delete('/delete', (req, res) => {
    try {
        //check data entry
        if (Object.keys(todoCheck(req.query)).length > 0) return res.status(400).json(todoCheck(req.query));
        //check exists
        Todo.findOne({ fileHandle: req.query.fileHandle }, async (err, data) => {
            if (data) {
                const newlist = data.list.filter(todo => todo.content !== req.query.todo);
                Todo.findByIdAndUpdate(data._id, { list: newlist }, (err, data) => {
                    if (err) res.status(400).json(err);
                    return res.status(200).json({ message: "Remove success!" })
                })
            } else return res.status(400).json({ error: "Todo file does not exist!" })
        })
    } catch (err) {
        console.log(err)
    }
})


//toggle done todo 
router.put("/done", (req, res) => {
    try {
        //check data entry
        //if (Object.keys(todoCheck(req.query)).length > 0) return res.status(400).json(todoCheck(req.body));
        //check exists
        console.log(req.query.done)
        Todo.findOne({ fileHandle: req.query.fileHandle }, async (err, data) => {
            if (data) {
                console.log(req.query)
                const indexListItem = data.list.findIndex(todo => todo.content == req.query.content);

                Todo.findByIdAndUpdate(data._id, { "$set": { [`list.${indexListItem}.done`]: req.query.done === "true" } }, (err, data) => {
                    if (err) res.status(400).json(err);
                    return res.status(200).json({ message: "toggle Done success!" })
                })
            } else return res.status(400).json({ error: "Todo file does not exist!" })
        })
    } catch (err) {
        console.log(err)
    }
})

//delete todo data 
router.delete('/delete/:filehanlde', (req, res) => {
    try {
        Todo.findOneAndDelete({ fileHandle: req.params.filehanlde }, (err, data) => {
            if (err) return res.status(400).json({ error: "Your Todo data does not exist" });
            return res.status(200).json({ message: "Delete success" });
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;