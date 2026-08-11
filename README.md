# IDSS Host Application

This is the main host application for the Intelligent Decision Support System (IDSS), built with Webpack Module Federation.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## Architecture

The host application uses Webpack Module Federation to dynamically load 5 independent remote modules:

- **Module 1 (Port 3001)**: Route Optimization
- **Module 2 (Port 3002)**: Resource Allocation
- **Module 3 (Port 3003)**: Network Analysis
- **Module 4 (Port 3004)**: Intelligent Decision
- **Module 5 (Port 3005)**: Optimization

Each module runs independently and exposes an `App` component that the host can consume.

## Adding a New Module

To add a new remote module:

1. Create a new repository for the module
2. Set up the module with the template configuration (see `module-template/`)
3. Update `webpack.config.js` in the host to include the new module in the `remotes` object
4. Update the navigation in `src/App.jsx` to route to the new module

## Module Configuration Template

Each remote module should have a similar webpack.config.js structure:

```javascript
const { ModuleFederationPlugin } = require('webpack').container;

new ModuleFederationPlugin({
  name: 'moduleName',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false },
  },
})
```

## Development

To work on the host app and a module simultaneously:

1. Terminal 1: `npm start` (in host repo, runs on 3000)
2. Terminal 2: `npm start` (in module repo, runs on its assigned port)

Changes to modules will hot-reload in the host application.

## Production Build

```bash
npm run build
```

Output will be in the `dist/` directory.
