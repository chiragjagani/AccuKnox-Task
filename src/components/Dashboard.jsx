import React, { useState, useMemo } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import WidgetCard from "./WidgetCard";
import SearchBar from "./SearchBar";
import AddWidgetDrawer from "./AddWidgetDrawer";
import CreateWidgetDrawer from "./CreateWidgetDrawer";

export default function Dashboard() {
  const categories = useDashboardStore((s) => s.categories);
  const visibleWidgetIds = useDashboardStore((s) => s.visibleWidgetIds);
  const [selectDrawerOpen, setSelectDrawerOpen] = useState(false); // for check/uncheck
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false); // for create form
  const [search, setSearch] = useState("");

  // Memoize filtered categories to prevent unnecessary recalculations
  const filteredCategories = useMemo(() => 
    categories.map(cat => ({
      ...cat,
      widgets: cat.widgets.filter(
        w =>
          (visibleWidgetIds[cat.id] || []).includes(w.id) &&
          (search ? w.name.toLowerCase().includes(search.toLowerCase()) : true)
      )
    }))
  , [categories, visibleWidgetIds, search]);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header-bar">
        <nav className="breadcrumb">
          <span>Home</span> {" > "} <span className="highlight">Dashboard V2</span>
        </nav>
        <div className="dashboard-header-search">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>
      <div className="dashboard-title-row">
        <h2>CNAPP Dashboard</h2>
        <div className="dashboard-actions">
          <button
            className="add-widget-btn"
            onClick={() => setCreateDrawerOpen(true)}
            title="Add Widget"
          >+ Add Widget</button>
        </div>
      </div>
      <div className="dashboard-categories">
        {filteredCategories.map((cat) => (
          <div className="dashboard-category" key={cat.id}>
            <h3 className="category-title">{cat.name}</h3>
            <div className="dashboard-widgets">
              {cat.widgets.map((widget) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                  categoryId={cat.id}
                />
              ))}
              <button
                className="widget-card add-widget-card"
                onClick={() => setSelectDrawerOpen(true)}
                type="button"
              >+ Add Widget</button>
            </div>
          </div>
        ))}
      </div>
      <AddWidgetDrawer open={selectDrawerOpen} onClose={() => setSelectDrawerOpen(false)} />
      <CreateWidgetDrawer open={createDrawerOpen} onClose={() => setCreateDrawerOpen(false)} />
    </div>
  );
}