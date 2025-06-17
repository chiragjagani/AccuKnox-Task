import React, { useState } from "react";
import { useDashboardStore } from "../store/dashboardStore";

export default function CreateWidgetDrawer({ open, onClose }) {
  const categories = useDashboardStore(s => s.categories);
  const addWidgetToCategory = useDashboardStore(s => s.addWidgetToCategory);
  const [category, setCategory] = useState(categories[0]?.id || "");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !category) return;
    addWidgetToCategory(category, {
      id: name.trim().toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name: name.trim(),
      type: "text",
      text: text,
    });
    setName("");
    setText("");
    setCategory(categories[0]?.id || "");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="drawer-overlay">
      <aside className="drawer">
        <div className="drawer-header">
          <h3>Add Widget</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Theme block bar */}
        <div className="drawer-create-subheader">
          <span className="drawer-create-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#2d44ec"><rect x="10" y="4" width="4" height="16" rx="2"/><rect x="4" y="10" width="16" height="4" rx="2"/></svg>
          </span>
          <span className="drawer-create-title">
            Create a custom widget
          </span>
        </div>

        <form className="drawer-create-form" onSubmit={handleSubmit}>
          <label>
            <span className="drawer-create-label">Category</span>
            <select
              value={category}
              className="drawer-create-input"
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option value={cat.id} key={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="drawer-create-label">Widget Name</span>
            <input
              className="drawer-create-input"
              type="text"
              value={name}
              maxLength={40}
              required
              placeholder="e.g. Business Overview"
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            <span className="drawer-create-label">Widget Description/Text</span>
            <textarea
              className="drawer-create-input"
              rows={4}
              maxLength={220}
              value={text}
              placeholder="Enter widget text or summary..."
              onChange={e => setText(e.target.value)}
            />
          </label>
        </form>

        {/* Actions (STICKY BOTTOM) */}
        <div className="drawer-actions sticky-bottom-actions">
          <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          <button className="drawer-confirm-btn" type="button" onClick={handleSubmit}>Add Widget</button>
        </div>
      </aside>
    </div>
  );
}