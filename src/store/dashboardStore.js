import { create } from "zustand";
import { produce } from "immer";

const initialData = [
  {
    id: "cspm",
    name: "CSPM Executive Dashboard",
    widgets: [
      {
        id: "cloud-accounts",
        name: "Cloud Accounts",
        type: "donut",
        data: [
          { name: "Connected", value: 2, color: "#5571eb" },
          { name: "Not Connected", value: 2, color: "#e6ebfa" },
        ],
        centerLabel: "2",
        centerSub: "Total"
      },
      {
        id: "cloud-risk-assessment",
        name: "Cloud Account Risk Assessment",
        type: "pie",
        data: [
          { name: "Failed", value: 1689, color: "#d32d2f" },
          { name: "Warning", value: 681, color: "#ffdf6b" },
          { name: "Not available", value: 36, color: "#edebeb" },
          { name: "Passed", value: 7253, color: "#44ae5c" }
        ],
        centerLabel: "9659",
        centerSub: "Total"
      }
    ]
  },
  {
    id: "cwpp",
    name: "CWPP Dashboard",
    widgets: [
      {
        id: "namespace-alerts",
        name: "Top 5 Namespace Specific Alerts",
        type: "empty"
      },
      {
        id: "workload-alerts",
        name: "Workload Alerts",
        type: "empty"
      }
    ]
  },
  {
    id: "registry",
    name: "Registry Scan",
    widgets: [
      {
        id: "image-risk",
        name: "Image Risk Assessment",
        type: "bar",
        data: [
          { name: "Critical", value: 9, color: "#ba262e" },
          { name: "High", value: 150, color: "#ed6c23" },
          { name: "Medium", value: 527, color: "#ffd132" },
          { name: "Low", value: 784, color: "#ededed" }
        ],
        mainValue: 1470,
        mainText: "Total Vulnerabilities"
      },
      {
        id: "image-security",
        name: "Image Security Issues",
        type: "bar",
        data: [
          { name: "Critical", value: 2, color: "#ba262e" },
          { name: "High", value: 2, color: "#ed6c23" },
          { name: "Medium", value: 7, color: "#ffd132" },
          { name: "Low", value: 9, color: "#ededed" }
        ],
        mainValue: 2,
        mainText: "Total Images"
      }
    ]
  }
];

// Helper: Start with all widgets visible
const allWidgetIdsByCat = {};
initialData.forEach(cat => {
  allWidgetIdsByCat[cat.id] = cat.widgets.map(w => w.id);
});

export const useDashboardStore = create((set, get) => ({
  categories: initialData,
  visibleWidgetIds: { ...allWidgetIdsByCat },

  setVisibleWidgetIds: (catId, widgetIdArray) =>
    set(
      produce(state => {
        state.visibleWidgetIds[catId] = widgetIdArray;
      })
    ),
  removeVisibleWidget: (catId, widgetId) =>
    set(
      produce(state => {
        state.visibleWidgetIds[catId] = (state.visibleWidgetIds[catId] || []).filter(id => id !== widgetId);
      })
    ),
  addWidgetToCategory: (catId, widget) =>
    set(
      produce(state => {
        const cat = state.categories.find(c => c.id === catId);
        if (cat) {
          cat.widgets.push(widget);
          if (!state.visibleWidgetIds[catId].includes(widget.id)) {
            state.visibleWidgetIds[catId].push(widget.id);
          }
        }
      })
    ),
}));