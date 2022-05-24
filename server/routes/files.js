const router = require('express').Router();
const File = require('../models/File');
const Todo = require('../models/Todo');

//get user folder data
router.get('/', (req, res) => {
    try {
        File.find({ userHandle: req.userId }, (err, data) => {
            if (err) return res.status(400).json({ error: "Your account doesnt have any file in my system." });
            return res.status(200).json(data)
        });
    } catch (err) {
        console.log(err)
    }

})
//create file 
router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.type || !req.body.containBy) return res.status(400).json({ error: "Missing information!" })
    const newData = new File({
        name: req.body.name,
        type: req.body.type,
        containBy: req.body.containBy,
        userHandle: req.userId
    })
    const data = await newData.save();
    return res.status(200).json(data);

})
//delete file 
router.delete("/delete", (req, res) => {
    try {
        File.findByIdAndDelete(req.query.fileId, (err, data) => {
            File.deleteMany({ containBy: req.query.fileId }, (err, data) => {
            })
            Todo.deleteMany({ fileHandle: req.query.fileId }, (err, data) => {
            })
            if (err || data == null) return res.status(400).json({ error: "Data is not exits!" })
            return res.status(200).json({ message: "File deleted", data })
        });

    } catch (err) {
        console.log(err)
    }
})
// rename file
router.put("/rename", (req, res) => {
    try {
        File.findByIdAndUpdate(req.query.fileId, { name: req.query.fileName }, (err, data) => {
            if (err) return res.status(400).json({ error: "File is not exits!" })
            return res.status(200).json({ message: "File has been renamed" })

        });
        Todo.findOneAndUpdate({ fileHandle: req.query.fileId }, { name: req.query.fileName }, (err, data) => { });

    } catch (err) {
        console.log(err)
    }
})
// move file
router.put("/move", async (req, res) => {
    try {
        //check folder exits
        if (req.query.fileId === req.query.toId) return res.status(400).json({ error: "You cant change like this!" })
        console.log(req.query.toId);
        File.findById(req.query.toId, (err) => {
            if (err) return res.status(400).json({ error: "You cant move this file to the folder doesnt exist!" })
        });
        File.findByIdAndUpdate(req.query.fileId, { containBy: req.query.toId }, (err, data) => {
            if (err) return res.status(400).json({ error: "File not exits!" })
            return res.status(200).json({ message: "Path has been change", data })
        });

    } catch (err) {
        console.log(err)
    }
})





module.exports = router;

