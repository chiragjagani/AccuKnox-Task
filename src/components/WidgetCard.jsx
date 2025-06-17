import React from "react";
import { useDashboardStore } from "../store/dashboardStore";
import { PieChart, Pie, Cell } from "recharts";

// Custom Stacked Bar (matches Registry Scan UI in your screenshot)
function BarStack({ data }) {
  const total = data.reduce((sum, seg) => sum + seg.value, 0) || 1;
  return (
    <div style={{ margin: "22px 0 8px 0" }}>
      <div
        style={{
          display: "flex",
          borderRadius: 7,
          overflow: "hidden",
          height: 14,
          background: "#ebeef5",
          minWidth: 0
        }}
      >
        {data.map((seg, idx) => (
          <div
            key={seg.name}
            style={{
              width: `${(seg.value / total) * 100}%`,
              background: seg.color,
              height: "100%"
            }}
            title={`${seg.name}: ${seg.value}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WidgetCard({ widget, categoryId }) {
  const removeWidget = useDashboardStore((s) => s.removeVisibleWidget);

  // Chart renderers
  function renderChart() {
    if (widget.type === "donut" || widget.type === "pie") {
      return (
        <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
          <PieChart width={120} height={120}>
            <Pie
              data={widget.data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {widget.data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <text
              x={60}
              y={60}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                fill: "#5776e4"
              }}
            >
              {widget.centerLabel}
            </text>
            <text
              x={60}
              y={80}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "1.07rem",
                fontWeight: "400",
                fill: "#8492c4"
              }}
            >
              {widget.centerSub}
            </text>
          </PieChart>
          {/* Legend */}
          <div style={{ marginLeft: 22 }}>
            {widget.data.map((seg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 6,
                  color: "#34466c",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    background: seg.color,
                    borderRadius: "50%",
                    marginRight: 8,
                    border: "1px solid #dae2ef"
                  }}
                />
                <span>
                  {seg.name} ({seg.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (widget.type === "bar") {
      return (
        <div style={{ marginTop: 6 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#23243c" }}>
            {widget.mainValue}
            <span
              style={{
                fontWeight: 400,
                color: "#8b98b9",
                fontSize: 15,
                marginLeft: 9
              }}
            >
              {widget.mainText}
            </span>
          </div>
          <BarStack data={widget.data} />
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 18,
              flexWrap: "wrap"
            }}
          >
            {widget.data.map((seg) => (
              <div
                key={seg.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 14,
                  color: "#3c4251",
                  gap: 3
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    background: seg.color,
                    borderRadius: 3,
                    display: "inline-block",
                    marginRight: 5,
                    border: "1px solid #e3e9f7"
                  }}
                />
                {seg.name} ({seg.value})
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (widget.type === "empty") {
      return (
        <div style={{ textAlign: "center", color: "#9aa4b2", marginTop: 24 }}>
          <svg width="48" height="48" fill="none" style={{ opacity: 0.28 }}>
            <rect x="10" y="30" width="6" height="13" rx="2" fill="#9aa4b2" />
            <rect x="21" y="24" width="6" height="19" rx="2" fill="#9aa4b2" />
            <rect x="32" y="18" width="6" height="25" rx="2" fill="#9aa4b2" />
          </svg>
          <div style={{ marginTop: 8 }}>No Graph data available!</div>
        </div>
      );
    }

    // Fallback for custom widgets
    return <div className="widget-card-content">{widget.text}</div>;
  }

  return (
    <div className="widget-card">
      <div className="widget-card-header">
        <span className="widget-title">{widget.name}</span>
        <button
          className="widget-remove-btn"
          title="Remove Widget"
          onClick={() => removeWidget(categoryId, widget.id)}
        >
          ×
        </button>
      </div>
      {renderChart()}
    </div>
  );
}