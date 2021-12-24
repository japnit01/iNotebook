import React,{useContext} from 'react'
import notecontext from '../Context/notes/Notecontext';
function NoteItem(props) {
    const context = useContext(notecontext);
    const {editNote,deleteNote} = context;

    const { note,updating } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex justify-content-between mb-3'>
                        <h5 className="me-auto card-title align-self-center">{note.title}</h5>
                        <i className="far fa-edit mx-2 align-self-center" onClick={()=>updating(note)} style={{color:"#ffc107"}}></i>
                        <i className="fas fa-trash-alt mx-2 align-self-center" onClick={()=>deleteNote(note._id)} style={{color:"#dc3545"}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default NoteItem;
