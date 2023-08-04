import React, { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import NoteItem from './NoteItem';


export default function Notes() {    
  //destructuring notes from NoteContext
    const { notes } = useContext(NoteContext);    
  return (    
    <div className="row my-3">
        <h2>Your Notes</h2>
        {
            notes.map((note, index) =>{
                return <NoteItem key={index} note={note}/>
            })
        }
    </div>
  )
}
