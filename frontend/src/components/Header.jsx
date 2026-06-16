import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header(props) {
  return (
    <header className="header">
      <h1>
        <HighlightIcon />
        Notes Keeper
      </h1>
      <div className="nav-buttons">
        <input
          type="text"
          placeholder="Search Notes..."
          onChange={(e) => props.setSearch(e.target.value)}
          className="search-input"
        />
        <button className="dark-btn" onClick={props.toggleDarkMode}>
          🌙
        </button>
        <button className="logout-btn" onClick={props.onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
