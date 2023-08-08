import React, { createContext, useState } from "react";

export const NoteContext = createContext();
export const NoteProvider = (props) => {

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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMWQ4MjY0MmEzMmJiMWM3MDZmZTYyIn0sImlhdCI6MTY5MTQ3Mzk3NH0.LRJa_aeb6UFTCfti8I2oypNxqTyLoI60Zn4oqrBcSA8",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }; 

  
  const addNote = (title, description, tag) => {
    const note = {
      _id: "61322f19553781a8ca8d0e07",
      user: "6131dc5e3e4037cd4734a067",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-07T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id));
  };
  const updateNote = (id, title, description, tag) => {
    console.log(id + " " + title + " " + description + " " + tag);
    const updatedNotes = [...notes];
    const index = notes.findIndex((note) => note._id === id);
    if (index !== -1) {
      updatedNotes[index].title = title;
      updatedNotes[index].description = description;
      updatedNotes[index].tag = tag;
      setNotes(updatedNotes);
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};