import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

export default function AddNote() {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({title: "", description: "", tag: "General"})
  const [isValid, setIsValid] = useState(false);

  const onChange = (e) =>{
    const updatedNote = { ...note, [e.target.name]: e.target.value };
    setNote(updatedNote);
    validateForm(updatedNote);    
  };
  
  // validate form
  const validateForm = (updatedNote) =>{    
    if(updatedNote.title.length >= 3 && updatedNote.description.length >= 6){
      setIsValid(true);
    }else{
      setIsValid(false);
    }
  };
  
  // adding notes in client side and database
  const handdleAddNote = (e) =>{
    e.preventDefault();    
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: "General"});    
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"   
            onChange={onChange}
            minLength={3}
            value={note.title}                     
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={6}
            value={note.description}            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handdleAddNote} disabled={!isValid}>
          Add Note
        </button>
      </form>
    </div>
  );
}
