const notesCtrl = {};
const Note = require('../models/notes')

notesCtrl.renderNoteForm = (req, res) => {
    res.render("notes/new-note");
};

notesCtrl.createNewNote = async(req, res) => {
    const {title,description} = req.body;
    const newNote = new Note({title,description});
    newNote.user = req.user.id;
    await newNote.save();    
    req.flash('success_msg',"Se ha añadido una nueva Nota!");
    res.redirect("/notes");
};

notesCtrl.renderNotes = async(req,res)=>{
    const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
    res.render('notes/all-notes',{notes});
}

notesCtrl.renderEditForm = async(req,res)=>{
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        req.flash('error_msg','No estas autorizado');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note',{note});
}

notesCtrl.updateNote = async (req,res)=>{
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg',"Se ha actualizado una Nota!");
    res.redirect('/notes');
}

notesCtrl.deleteNote = async(req,res)=>{
    await Note.findOneAndDelete(req.params.id);
    req.flash('success_msg',"Se ha eliminado una Nota!");
    res.redirect('/notes');
}


module.exports = notesCtrl;