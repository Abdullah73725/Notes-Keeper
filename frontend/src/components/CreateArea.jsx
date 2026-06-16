import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function CreateArea({ onAdd, onUpdate, editingNote }) {
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setNote({
        title: editingNote.title,
        content: editingNote.content,
      });
    }
  }, [editingNote]);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (editingNote) {
      onUpdate(note);
    } else {
      onAdd(note);
    }
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        <select
          className="category-select"
          name="category"
          value={note.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Shopping">Shopping</option>
          <option value="Personal">Personal</option>
        </select>

        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            {editingNote ? <EditIcon /> : <AddIcon />}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
