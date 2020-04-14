const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {

    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {

    const {title, description} = req.body;

    // Validation
    const errors = [];
    if(!title) {

        errors.push({text: 'Please write a title'});
    }
    if(!description) {

        errors.push({text: 'Please write a description'});
    }
    if(errors.length > 0) {

        res.render('notes/new-note', {

            errors,
            title,
            description
        });
    }else{

        const newNote = new Note({title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note added successfully');
        res.redirect('/notes');
    }
});

// New form to use handlebars hbs shows in this case ALL NOTES
router.get('/notes', isAuthenticated, async (req, res) => {

    // Get all items form the DB collection (notes)
    await Note.find({user: req.user.id}).sort({date: 'desc'})
    .then(documents => {

        // Create a context Object with 'notes' key
        const context = {

            notes: documents.map(document => {

                return {

                    title: document.title,
                    description: document.description,
                    _id: document._id
                };
            })
        };

        // Rendering (notes) from context Object in (all-notes.hbs) 
        res.render('notes/all-notes', {notes: context.notes});
    })
});

// Get the note id and send it to the edit note screen
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note});
});

// Update the note
router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {

    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});

    // Show the edit note message
    req.flash('success_msg', 'Note edited successfully');
    res.redirect('/notes');
});

// Delete the note
router.delete('/notes/delete/:id', isAuthenticated, async (req, res)=> {

    await Note.findByIdAndRemove(req.params.id);

    // Show the delete note message
    req.flash('success_msg', 'Note deleted successfully');
    res.redirect('/notes');
});

module.exports = router;