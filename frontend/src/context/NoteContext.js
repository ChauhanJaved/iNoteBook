import React, { createContext, useState } from 'react';


export const NoteContext = createContext();
export const NoteProvider = (props) =>{
    
  const notesInitial = [
    {
        "_id": "61322f19553781a8ca8d0e01",
        "user": "6131dc5e3e4037cd4734a061",
        "title": "Morning Reminder",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2021-09-01T14:20:09.509Z",
        "__v": 0
    },
    {
        "_id": "61322f19553781a8ca8d0e02",
        "user": "6131dc5e3e4037cd4734a062",
        "title": "Grocery Shopping",
        "description": "Buy milk, bread and vegetables",
        "tag": "shopping",
        "date": "2021-09-02T14:20:09.668Z",
        "__v": 0
    },
    {
        "_id": "61322f19553781a8ca8d0e03",
        "user": "6131dc5e3e4037cd4734a063",
        "title": "Meeting Notes",
        "description": "Review the notes from the last meeting",
        "tag": "work",
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
    },
    {
        "_id": "61322f19553781a8ca8d0e04",
        "user": "6131dc5e3e4037cd4734a064",
        "title": "Exercise Routine",
        "description": "Do 30 minutes of yoga",
        "tag": "health",
        "date": "2021-09-04T14:20:09.668Z",
        "__v": 0
    },
    {
        "_id": "61322f19553781a8ca8d0e05",
        "user": "6131dc5e3e4037cd4734a065",
        "title": "Book Recommendation",
        "description": "Read '1984' by George Orwell",
        "tag": "books",
        "date": "2021-09-05T14:20:09.668Z",
        "__v": 0
    },
    {
        "_id": "61322f19553781a8ca8d0e06",
        "user": "6131dc5e3e4037cd4734a066",
        "title": "Visit Doctor",
        "description": "Regular health check-up next week",
        "tag": "health",
        "date": "2021-09-06T14:20:09.668Z",
        "__v": 0
    },
    {
        "_id": "61322f19553781a8ca8d0e07",
        "user": "6131dc5e3e4037cd4734a067",
        "title": "Study Time",
        "description": "Study for the test tomorrow",
        "tag": "study",
        "date": "2021-09-07T14:20:09.668Z",
        "__v": 0
    },
]

    const [notes, setNotes] = useState(notesInitial)
    const addNote = (title, description, tag) =>{
        const note = {
            "_id": "61322f19553781a8ca8d0e07",
            "user": "6131dc5e3e4037cd4734a067",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-07T14:20:09.668Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    };
    const deleteNote = (id) => {        
        setNotes(notes.filter(note=>note._id!==id))
    };
    const updateNote = (id, title, description, tag) => {
        console.log(id + " " + title + " " + description + " " + tag)
    };
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};
