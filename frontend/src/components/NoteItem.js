import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export default function NoteItem(props) {
  const { deleteNote } = useContext(NoteContext)
  const { note, openEditNoteModal } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="far fa-edit mx-2" onClick={()=>{openEditNoteModal(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
