import React,{useContext} from "react";
import NoteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const noteContext = useContext(NoteContext);
  const {deleteNote } = noteContext;
  const { noteItem , updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{noteItem.title}</h5>
          <pre className="card-text">
          {noteItem.description} 
          </pre>
          <i>{noteItem.tag}</i>
        </div>
        <div >
          <i className="fa-solid fa-trash my-2 mx-3" onClick={()=>{deleteNote(noteItem._id);
          props.showAlert("Deleted Successfully","success");}}></i> 
          <i className="fa-solid fa-pen-to-square my-2 mx-2" onClick={()=>{updateNote(noteItem)}} ></i>
        </div>
      </div>
    </div>
  );
}
