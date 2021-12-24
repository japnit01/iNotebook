const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Notes = require('../models/notes');
const { body, validationResult } = require('express-validator')

router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user });
        res.json(notes)
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Title is too small').isLength({ min: 3 }),
    body('description', 'Despcription is too small').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user
        })

        const savednote = await note.save();
        res.json(savednote)
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})

router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title is too small').isLength({ min: 3 }),
    body('description', 'Despcription is too small').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const newnote = {};

        if (title) {
            newnote.title = title;
        }

        if (description) {
            newnote.description = description;
        }

        if (tag) {
            newnote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found");
        }
        // console.log(note)
        if (note.user.toString() !== req.user) {
            return res.status(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json(note);
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }

});

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found");
        }
        // console.log(note)
        if (note.user.toString() !== req.user) {
            return res.status(404).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }

});


module.exports = router