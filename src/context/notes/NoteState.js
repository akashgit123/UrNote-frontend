import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const host = window.env.BASE_URL;
    const notesInitial =[];

    const [notes,setNotes] = useState(notesInitial);

    // Fetch all notes
    const fetchNotes = async() =>{
        // call fetch note api
        console.log(host);
        const response = await fetch(`${host}/api/notes/fetchAllNotes`,{
            method:"GET",
            headers :{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
        const data = await response.json();
        // console.log(data);
        setNotes(data); 
    }

    // Add a note
    const addNote = async(title,description,tag) =>{
        // call add note api
        const response = await fetch(`${host}/api/notes/addNote`,{
            method:"POST",
            headers :{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const resp = await response.json();
        console.log(resp._id);
        const id = resp._id;
        const userId = resp.user;

        const note = {
            "_id": id,
            "user": userId,
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async(id) =>{
        // call delete note api
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`,{
        method:"DELETE",
        headers :{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        }
        });
        const resp = response.json()
        console.log(resp);

        console.log("Deleting note...."+id);
        const newNotes = notes.filter((note)=>{
            return note._id !== id ;
        })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async(id,title,description,tag) =>{
        // Api call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`,{
            method:"PUT",
            headers :{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);

        // Logic to edit in client side
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;

                break;
            }
            setNotes(newNotes);    
        }
    }

    return(
        <NoteContext.Provider  value={{notes,addNote,deleteNote,editNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;