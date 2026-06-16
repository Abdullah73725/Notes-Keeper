import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h3 className="category-tag">{props.category}</h3>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <small>Created: {new Date(props.createdAt).toLocaleString()}</small>
      <br />
      <small>Updated: {new Date(props.updatedAt).toLocaleString()}</small>
      <div className="note-buttons">
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>
        <button onClick={() => props.onEdit(props)}>
          <EditIcon />
        </button>
        <button onClick={() => props.onPin(props.id)}>
          <PushPinIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
