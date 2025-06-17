import React, { useState, useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";

export default function AddWidgetDrawer({ open, onClose }) {
  const categories = useDashboardStore(s => s.categories);
  const visibleWidgetIds = useDashboardStore(s => s.visibleWidgetIds);
  const setVisibleWidgetIds = useDashboardStore(s => s.setVisibleWidgetIds);

  const [tab, setTab] = useState(categories[0]?.id || "");
  const [checked, setChecked] = useState({});

  // Sync local checked state any time drawer opens
  useEffect(() => {
    if (open && categories.length > 0) {
      const snap = {};
      categories.forEach(cat => {
        snap[cat.id] = [...(visibleWidgetIds[cat.id] || [])];
      });
      setChecked(snap);
      setTab(categories[0].id);
    }
  }, [open, categories, visibleWidgetIds]);

  const toggleCheck = (catId, widgetId) => {
    setChecked(prev => ({
      ...prev,
      [catId]: prev[catId].includes(widgetId)
        ? prev[catId].filter(id => id !== widgetId)
        : [...prev[catId], widgetId],
    }));
  };

  const handleConfirm = () => {
    // Save selection (only checked widgets will show on dashboard)
    Object.entries(checked).forEach(([catId, widgetIds]) =>
      setVisibleWidgetIds(catId, widgetIds)
    );
    onClose();
  };

  if (!open) return null;

  const selectedCat = categories.find(c => c.id === tab) || {};

  return (
    <div className="drawer-overlay">
      <aside className="drawer">
        <div className="drawer-header">
          <h3>Add Widget</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="drawer-title">
          Personalise your dashboard by adding the following widget
        </div>
        {/* Tabs */}
        <div className="drawer-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`drawer-tab${tab === cat.id ? " active" : ""}`}
              onClick={() => setTab(cat.id)}
              type="button"
            >
              {cat.name.replace(/ Dashboard.*/i, "").replace(/Executive /, "")}
            </button>
          ))}
        </div>
        {/* Widget Checkbox List */}
        <div className="drawer-widget-list">
          {(selectedCat.widgets || []).map(widget => (
            <label key={widget.id} className="drawer-widget-item">
              <input
                type="checkbox"
                checked={checked[selectedCat.id]?.includes(widget.id) || false}
                onChange={() => toggleCheck(selectedCat.id, widget.id)}
              />
              <span className="drawer-widget-name">{widget.name}</span>
            </label>
          ))}
          {selectedCat.widgets?.length === 0 && (
            <div style={{ padding: 32, color: "#a7aac0" }}>
              No widgets available in this section.
            </div>
          )}
        </div>
        {/* Actions */}
        <div className="drawer-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="drawer-confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}