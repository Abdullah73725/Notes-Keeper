import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [notes, setNotes] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const token = localStorage.getItem("token");

  // Load notes from backend when component mounts
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8080/notes/fetch", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, [token]);

  // Add a note (POST request)
  function addNote(newNote) {
    fetch("http://localhost:8080/notes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newNote),
    });
    toast
      .success("Note added successfully")
      .then((res) => res.json())
      .then((savedNote) => {
        setNotes((prevNotes) => [...prevNotes, savedNote]);
      })
      .catch((err) => console.error("Error adding note:", err));
  }

  function editNote(note) {
    setEditingNote(note);
  }

  async function updateNote(updatedNote) {
    fetch(`http://localhost:8080/notes/update/${editingNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });
    toast.info("Note updated");
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingNote.id ? { ...note, ...updatedNote } : note,
      ),
    );
    setEditingNote(null);
  }

  async function pinNote(id) {
    const response = await fetch(`http://localhost:8080/notes/pin/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.status);
    window.location.reload();
  }

  // Delete a note (DELETE request)
  async function deleteNote(id) {
    try {
      await fetch(`http://localhost:8080/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error("Note deleted");
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )}

        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Create Account" : "Already have an account"}
        </button>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header
        onLogout={logout}
        toggleDarkMode={toggleDarkMode}
        search={search}
        setSearch={setSearch}
      />

      <CreateArea
        onAdd={addNote}
        onUpdate={updateNote}
        editingNote={editingNote}
      />

      <div className="category-filters">
        <button onClick={() => setSelectedCategory("All")}>All</button>
        <button onClick={() => setSelectedCategory("Work")}>Work</button>
        <button onClick={() => setSelectedCategory("Study")}>Study</button>
        <button onClick={() => setSelectedCategory("Shopping")}>
          Shopping
        </button>
        <button onClick={() => setSelectedCategory("Personal")}>
          Personal
        </button>
      </div>
      <div className="notes-container">
        {Array.isArray(notes) &&
          notes
            .filter((note) => {
              const matchesSearch =
                search === "" ||
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase());

              const matchesCategory =
                selectedCategory === "All" ||
                note.category === selectedCategory;
              return matchesSearch && matchesCategory;
            })
            .sort((a, b) => b.pinned - a.pinned)
            .map((noteItem) => (
              <Note
                key={noteItem.id}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                createdAt={noteItem.createdAt}
                updatedAt={noteItem.updatedAt}
                category={noteItem.category}
                onDelete={deleteNote}
                onEdit={editNote}
                onPin={pinNote}
                pinned={noteItem.pinned}
              />
            ))}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
