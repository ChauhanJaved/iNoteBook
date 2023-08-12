import React, { useContext, useEffect, useRef, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import UpdateNoteModal from "./UpdateNoteModal";

export default function Notes() {
  //destructuring notes from NoteContext
  const { notes, getNotes } = useContext(NoteContext);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ref = useRef(null);  
  const [note, setNote] = useState({etitle: "", edescription: "", etag: ""});
  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };
  const handleClick = (e) => {
    console.log("Updating the note...", note);
    e.preventDefault();
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
        note={note}
        setNote={setNote}
        handleClick={handleClick}
      />
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note, index) => {
          return <NoteItem key={index} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
}
