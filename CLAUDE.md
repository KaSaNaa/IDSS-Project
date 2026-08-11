# Webpack Module Federation Host App Setup Agent

## Overview
This agent sets up a webpack module federation host application that can dynamically load 5 independent remote modules. The setup includes proper dependency management, webpack configuration, and a development server.

## Setup Instructions

### Step 1: Initialize the Host Repository
```bash
cd /path/to/host-repo
git init
```

### Step 2: Create package.json
Create `package.json` with the following content:
```json
{
  "name": "idss-host",
  "version": "1.0.0",
  "description": "Intelligent Decision Support System - Host Application",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "clean": "rm -rf dist"
  },
  "keywords": ["module-federation", "micro-frontend"],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/preset-react": "^7.23.0",
    "babel-loader": "^9.1.3",
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.3",
    "style-loader": "^3.3.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.1"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0"
  }
}
```

### Step 3: Create Directory Structure
```
host-repo/
├── src/
│   ├── index.jsx
│   ├── App.jsx
│   ├── bootstrap.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── Settings.jsx
│   └── styles/
│       └── index.css
├── public/
│   └── index.html
├── webpack.config.js
├── .gitignore
├── package.json
└── README.md
```

### Step 4: Create webpack.config.js
Create `webpack.config.js` with module federation configuration:
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'idss_host',
      filename: 'remoteEntry.js',
      remotes: {
        module1: 'module1@http://localhost:3001/remoteEntry.js',
        module2: 'module2@http://localhost:3002/remoteEntry.js',
        module3: 'module3@http://localhost:3003/remoteEntry.js',
        module4: 'module4@http://localhost:3004/remoteEntry.js',
        module5: 'module5@http://localhost:3005/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: false,
    }),
  ],
};
```

### Step 5: Create .babelrc
Create `.babelrc`:
```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

### Step 6: Create public/index.html
Create `public/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IDSS - Intelligent Decision Support System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### Step 7: Create src/bootstrap.jsx
Create `src/bootstrap.jsx`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Step 8: Create src/index.jsx
Create `src/index.jsx`:
```jsx
import('./bootstrap');
```

### Step 9: Create src/App.jsx
Create `src/App.jsx`:
```jsx
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/index.css';

const Home = lazy(() => import('./pages/Home'));

// Lazy load remote modules
const RouteOptimization = lazy(() => import('module1/App'));
const ResourceAllocation = lazy(() => import('module2/App'));
const NetworkAnalysis = lazy(() => import('module3/App'));
const IntelligentDecision = lazy(() => import('module4/App'));
const Optimization = lazy(() => import('module5/App'));

function App() {
  const [activeModule, setActiveModule] = useState('home');

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">IDSS</div>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setActiveModule('home')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/route-optimization" onClick={() => setActiveModule('module1')}>
                Route Optimization
              </Link>
            </li>
            <li>
              <Link to="/resource-allocation" onClick={() => setActiveModule('module2')}>
                Resource Allocation
              </Link>
            </li>
            <li>
              <Link to="/network-analysis" onClick={() => setActiveModule('module3')}>
                Network Analysis
              </Link>
            </li>
            <li>
              <Link to="/intelligent-decision" onClick={() => setActiveModule('module4')}>
                Intelligent Decision
              </Link>
            </li>
            <li>
              <Link to="/optimization" onClick={() => setActiveModule('module5')}>
                Optimization
              </Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Suspense fallback={<div className="loading">Loading module...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/route-optimization" element={<RouteOptimization />} />
              <Route path="/resource-allocation" element={<ResourceAllocation />} />
              <Route path="/network-analysis" element={<NetworkAnalysis />} />
              <Route path="/intelligent-decision" element={<IntelligentDecision />} />
              <Route path="/optimization" element={<Optimization />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

### Step 10: Create src/pages/Home.jsx
Create `src/pages/Home.jsx`:
```jsx
import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <h1>Intelligent Decision Support System</h1>
      <p>Welcome to the IDSS. Select a module from the navigation menu above.</p>
      
      <div className="modules-grid">
        <div className="module-card">
          <h3>Route Optimization</h3>
          <p>Determine efficient routes within transportation, logistics, or communication networks.</p>
        </div>
        <div className="module-card">
          <h3>Resource Allocation</h3>
          <p>Allocate limited resources efficiently while satisfying defined constraints.</p>
        </div>
        <div className="module-card">
          <h3>Network Analysis</h3>
          <p>Analyze relationships within a network using graph analysis algorithms.</p>
        </div>
        <div className="module-card">
          <h3>Intelligent Decision</h3>
          <p>Support decision-making based on input data and heuristic techniques.</p>
        </div>
        <div className="module-card">
          <h3>Optimization</h3>
          <p>Solve computational optimization problems using exact, heuristic, and approximation algorithms.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
```

### Step 11: Create src/styles/index.css
Create `src/styles/index.css`:
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --success-color: #27ae60;
  --border-radius: 8px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  color: #333;
  background: #f5f5f5;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--box-shadow);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  flex-wrap: wrap;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: background 0.3s;
}

.nav-links a:hover {
  background: var(--secondary-color);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.home-page {
  text-align: center;
}

.home-page h1 {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.home-page p {
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.module-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.module-card h3 {
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}

.module-card p {
  color: #666;
  line-height: 1.6;
}
```

### Step 12: Create .gitignore
Create `.gitignore`:
```
node_modules/
dist/
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
.env.local
.cache
.parcel-cache
dist/
```

### Step 13: Create README.md
Create `README.md`:
```markdown
# IDSS Host Application

This is the main host application for the Intelligent Decision Support System (IDSS), built with Webpack Module Federation.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm start
   \`\`\`

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

\`\`\`javascript
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
\`\`\`

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
```

---

## Execution Steps (for Claude Code)

Run these commands in order:

```bash
# 1. Navigate to host repo
cd /path/to/host-repo

# 2. Create directory structure
mkdir -p src/pages src/styles public

# 3. Create all files (list each file path and content from steps above)

# 4. Install dependencies
npm install

# 5. Verify setup
npm run build --dry-run
```

## Next Steps After Setup

1. **Create Module Templates**: Once the host is working, create a template repository for the 5 modules. Each should mirror the host's webpack config but expose their App component instead of consuming remotes.

2. **Test Integration**: Start the host (`npm start` on 3001) and verify it loads without errors. You'll see 404s for the remotes until they're created.

3. **Module Repository Setup**: For each of the 5 modules, replicate the template structure but adjust:
   - Port number (3001-3005)
   - Module name
   - Exposed exports (change `remotes` to `exposes`)

---

## Notes

- The setup uses React 18 with React Router for navigation
- Module Federation handles shared dependencies (React, React-DOM) automatically
- CORS headers are set in devServer for cross-origin module loading
- Each module runs on its own port for development isolation