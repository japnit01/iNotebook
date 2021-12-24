import { useState } from "react";
import notecontext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinit = []

  const [notes, setnotes] = useState(notesinit)

  const getNotes = async () => {
    const url = `${host}/api/notes/fetchnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setnotes(json)
    // console.log(json)
  }

  const addNote = async(title, description, tag) => {
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    // console.log(note)
    setnotes(notes.concat(note))
  }

  const deleteNote = async(id) => {
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json)
  }

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    // console.log(json)

    for (let i = 0; i < notes.length; i++) {
      
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
        break;
      }
    }
    // console.log(notes)
    setnotes(notes)
  }

  return (

    <notecontext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </notecontext.Provider>

  )
}

export default NoteState;