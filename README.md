# Dashboard App

A modern, responsive dashboard application built with React and Vite, featuring a flexible widget system and category-based organization.

## Features

- **Category/Group-Segmented Dashboard**
  - Organize widgets into logical categories
  - Drag-and-drop functionality for widget organization
  - Persistent category management

- **Rich Widget Collection**
  - Pie charts
  - Donut charts
  - Stacked bar charts
  - Text widgets
  - Empty state widgets
  - Customizable widget properties

- **Widget Management**
  - Add/remove widgets per category
  - Persistent drawer UI for widget configuration
  - Create new widgets via header "+ Add Widget" drawer
  - Assign widgets to any section
  - Drag-and-drop widget reordering

- **UI/UX Features**
  - Fully responsive design
  - Clean, modern theme
  - Consistent styling across all components
  - Smooth animations and transitions

- **State Management**
  - Local state managed with Zustand
  - Persistent storage
  - Efficient state updates with Immer

## Tech Stack

- **Core**
  - React 19.1.0
  - Vite 6.3.5
  - TypeScript

- **State Management**
  - Zustand 5.0.5
  - Immer 10.1.1

- **Data Visualization**
  - Recharts 2.15.3

- **Development Tools**
  - ESLint 9.25.0
  - TypeScript
  - Vite

## Project Structure

```
dashboard-app/
├── src/
│   ├── components/
│   │   ├── widgets/           # Widget components
│   │   ├── layout/           # Layout components
│   │   └── common/           # Shared components
│   ├── store/                # Zustand store
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom hooks
│   └── styles/               # Global styles
├── public/                   # Static assets
└── tests/                    # Test files
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
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Development

- Run the development server with hot reload:
  ```bash
  npm run dev
  ```

- Lint your code:
  ```bash
  npm run lint
  ```

- Preview the production build:
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
