// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="dashboard-searchbar-wrapper">
      <span className="dashboard-searchbar-icon">
        {/* Inline SVG */}
        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
          <circle cx="8" cy="8" r="7" stroke="#6473FC" strokeWidth="1.3"/>
          <path d="M15 15L12.2 12.2" stroke="#6473FC" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </span>
      <input
        className="dashboard-searchbar"
        placeholder="Search widgets…"
        value={value}
        onChange={e => onChange(e.target.value)}
        type="search"
        autoComplete="off"
      />
    </div>
  );
}