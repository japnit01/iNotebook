import React,{useContext,useState} from 'react'
import notecontext from '../Context/notes/Notecontext'

function AddNote(props) {
    const context = useContext(notecontext)
    const {addNote} = context;
    
    const [note,setnote] = useState({title:"",description:"",tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        // console.log("clicked")
        addNote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
    }

    const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
    <>
    <div className='container'>
        <h3 className='my-3'>Add Note</h3>
            <form>
                <div className="my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description"  value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-success" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    </>
    )
}

export default AddNote
