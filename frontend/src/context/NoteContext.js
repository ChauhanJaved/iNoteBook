import React, { createContext, useState, useContext } from "react";
import { AlertContext } from "./AlertContext";
export const NoteContext = createContext();
export const NoteProvider = (props) => {
  const { showAlert } = useContext(AlertContext);
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")       },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    if (json.success) {
      // Logic to add in client
      const note = json.note;
      setNotes(notes.concat(note));
      showAlert("Note added successfully", "success");
    } else {
      showAlert(json.error, "danger");      
    }
  };
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();
    if (json.success) {
      // Logic to delete in client
      setNotes(notes.filter((note) => note._id !== id));      
      showAlert("Note deleted successfully", "success");
    } else {
      showAlert(json.error, "danger");      
    }    
    
  };
  const updateNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    if (json.success) {
      // Logic to update in client
      const note = json.note;
      const index = notes.findIndex((note) => note._id === id);
      const updatedNotes = [...notes];
      updatedNotes[index] = note;
      setNotes(updatedNotes);
      showAlert("Note updated successfully", "success");
    } else {
      showAlert(json.error, "danger");      
    }    
 
  };
  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
