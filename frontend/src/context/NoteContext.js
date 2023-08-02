import React, { Children, createContext, useState } from 'react';

export const NoteContext = createContext();
export const NoteProvider = () =>{
    const name ="sf";
    return(
        <NoteContext.Provider value={{name}}>
            {Children}
        </NoteContext.Provider>
    );
};
