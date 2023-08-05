import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";

export default function AddNote() {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({title: "", description: "", tag: "default"})
  const onChange = (e) =>{
    setNote({...note,[e.target.name]: e.target.value})    
  };
  const handdleAddNote = (e) =>{
    e.preventDefault();    
    addNote(note.title, note.description, note.tag);
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
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handdleAddNote}>
          Submit
        </button>
      </form>
    </div>
  );
}
