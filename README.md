# Dashboard App

A modern, responsive dashboard application built with React and Vite, featuring a flexible widget system and category-based organization.

## Features

- **Category/Group-Segmented Dashboard**
  - Widgets: pie, donut, stacked bar, text, empty state
  - Add/remove widgets per category, with persistent drawer UI
  - Create new widgets via header "+ Add Widget" drawer, assign to any section
  - Fully responsive, clean theme and styling
  - All local state managed with Zustand

- **Widget Collection**
  - Pie charts
  - Donut charts
  - Stacked bar charts
  - Text widgets
  - Empty state widgets

- **Widget Management**
  - Add/remove widgets per category
  - Persistent drawer UI for widget configuration
  - Create new widgets via header "+ Add Widget" drawer
  - Assign widgets to any section

- **UI/UX Features**
  - Fully responsive design
  - Clean, modern theme and styling

- **State Management**
  - Local state managed with Zustand

## Project Structure

```
dashboard-app/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx           # Main dashboard component
│   │   ├── WidgetCard.jsx          # Individual widget component
│   │   ├── AddWidgetDrawer.jsx     # Widget addition drawer
│   │   ├── CreateWidgetDrawer.jsx  # Widget creation drawer
│   │   └── SearchBar.jsx           # Search functionality
│   ├── store/
│   │   └── dashboardStore.js       # Zustand store for dashboard state
│   ├── styles/                     # Global styles
│   └── assets/                     # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd dashboard-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Development

- Run the development server:
  ```bash
  npm run dev
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Preview production build:
  ```bash
  npm run preview
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
