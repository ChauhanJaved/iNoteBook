import React, { useContext, useEffect, useRef, useState  } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import UpdateNoteModal from "./UpdateNoteModal";

export default function Notes() {
  const ref = useRef(null);
  const refClose = useRef(null);
  //destructuring notes from NoteContext
  const { notes, getNotes, updateNote } = useContext(NoteContext);
  const [editNote, setEditNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
  
  useEffect(() => {
    getNotes();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  
  

  const openEditNoteModal = (currentNote) => {        
    //code to update state
    setEditNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    ref.current.click();
  };
 
  const handleClick = (e) => {
    updateNote(editNote.id, editNote.etitle, editNote.edescription, editNote.etag);
    e.preventDefault();
    refClose.current.click();
}
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateModal"
      >
        Update Note
      </button>      
      <UpdateNoteModal      
        editNote={editNote}
        setEditNote={setEditNote}
        handleClick={handleClick}
        refClose={refClose}
      />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note, index) => {
          return <NoteItem key={index} note={note} openEditNoteModal={openEditNoteModal} />;
        })}
      </div>
    </>
  );
}
