import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from '../Context/notes/Notecontext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const context = useContext(notecontext);
    const { notes, getNotes,editNote } = context;
    const history = useNavigate();
    const [note,setnote] = useState({etitle:"",edescription:"",etag:""})

    useEffect(() => {
        if(localStorage.getItem('token'))
            getNotes();

        //eslint-disable-next-line
    })

    const ref = useRef(null);
    const refclose = useRef(null);
    const updatingNote = (currentnote) => {
        ref.current.click();
        setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }

    const handleClick = (e) =>{
        // e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        // console.log("clicked")
    }

    const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" ref = {refclose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                    
                            <form>
                                <div className="my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <h3>My Notes</h3>
                <div className="container">{!localStorage.getItem('token') && "Kindly Login"}</div>
                <div className="container">{localStorage.getItem('token') && notes.length === 0 && "No notes to display"}</div>
                <div className="row">
                    {notes.map((note) => {
                        return <NoteItem updating={updatingNote} key={note._id} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
