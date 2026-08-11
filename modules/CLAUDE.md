# Module Template Setup Agent

This template is for setting up each of the 5 individual module repositories. Run this template once for each module, adjusting the port number and module name.

---

## Module Mapping

| Module Name | Repo | Port | Description |
|-------------|------|------|-------------|
| route_optimizer | module-route-optimizer | 3001 | Intelligent Route Optimization |
| resource_allocator | module-resource-allocator | 3002 | Intelligent Resource Allocation |
| network_analyzer | module-network-analyzer | 3003 | Network Analysis (Your module) |
| intelligent_decisions | module-intelligent-decisions | 3004 | Intelligent Decision Module |
| resource_optimizer | module-resource-optimizer | 3005 | Optimization Module |

---

## Setup Steps (Repeat for Each Module)

### Step 1: Navigate to Module Repository

```bash
cd /path/to/module-route-optimizer
# or whichever module you're setting up
```

### Step 2: Create package.json

Create `package.json`:

```json
{
  "name": "module-route-optimizer",
  "version": "1.0.0",
  "description": "Route Optimizer Module for IDSS",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "clean": "rm -rf dist"
  },
  "keywords": ["module-federation", "route-optimization"],
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
    "react-dom": "^18.2.0"
  }
}
```

**Note:** Update the `name` and `description` for each module.

### Step 3: Create .babelrc

Create `.babelrc`:

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

### Step 4: Create webpack.config.js

**For module-route-optimizer (Port 3001):**

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
    port: 3001,
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
      name: 'module_route_optimizer',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
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

**For module-resource-allocator (Port 3002):**
- Change `port: 3002`
- Change `name: 'module_resource_allocator'`

**For module-network-analyzer (Port 3003):**
- Change `port: 3003`
- Change `name: 'module_network_analyzer'`

**For module-intelligent-decisions (Port 3004):**
- Change `port: 3004`
- Change `name: 'module_intelligent_decisions'`

**For module-resource-optimizer (Port 3005):**
- Change `port: 3005`
- Change `name: 'module_resource_optimizer'`

### Step 5: Create Directory Structure

```bash
mkdir -p src/styles public
```

### Step 6: Create public/index.html

Create `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module - IDSS</title>
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

### Step 7: Create src/index.jsx

Create `src/index.jsx`:

```jsx
import('./bootstrap');
```

### Step 8: Create src/bootstrap.jsx

Create `src/bootstrap.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Step 9: Create src/App.jsx

**For module-route-optimizer:**

```jsx
import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="module-container">
      <h1>Route Optimization Module</h1>
      <p>This module determines efficient routes within transportation, logistics, or communication networks.</p>
      
      <div className="module-content">
        <h2>Features</h2>
        <ul>
          <li>Graph-based route analysis</li>
          <li>Algorithm comparison</li>
          <li>Performance evaluation</li>
          <li>Scalability testing</li>
        </ul>
        
        <div className="placeholder">
          <p>Route optimization content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

**For module-resource-allocator:**

```jsx
import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="module-container">
      <h1>Resource Allocation Module</h1>
      <p>This module allocates limited resources efficiently while satisfying defined constraints.</p>
      
      <div className="module-content">
        <h2>Features</h2>
        <ul>
          <li>Constraint satisfaction</li>
          <li>Optimization algorithms</li>
          <li>Resource scheduling</li>
          <li>Solution quality evaluation</li>
        </ul>
        
        <div className="placeholder">
          <p>Resource allocation content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

**For module-network-analyzer:**

```jsx
import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="module-container">
      <h1>Network Analysis Module</h1>
      <p>This module analyzes relationships within a network using graph analysis algorithms.</p>
      
      <div className="module-content">
        <h2>Features</h2>
        <ul>
          <li>Graph data structure implementation</li>
          <li>Centrality analysis</li>
          <li>Community detection</li>
          <li>Network performance metrics</li>
        </ul>
        
        <div className="placeholder">
          <p>Network analysis content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

**For module-intelligent-decisions:**

```jsx
import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="module-container">
      <h1>Intelligent Decision Module</h1>
      <p>This module supports decision-making based on input data and heuristic techniques.</p>
      
      <div className="module-content">
        <h2>Features</h2>
        <ul>
          <li>Decision tree algorithms</li>
          <li>Classification techniques</li>
          <li>Ranking and recommendation</li>
          <li>Decision quality assessment</li>
        </ul>
        
        <div className="placeholder">
          <p>Intelligent decision content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

**For module-resource-optimizer:**

```jsx
import React from 'react';
import './styles/index.css';

function App() {
  return (
    <div className="module-container">
      <h1>Optimization Module</h1>
      <p>This module solves computational optimization problems using exact, heuristic, and approximation algorithms.</p>
      
      <div className="module-content">
        <h2>Features</h2>
        <ul>
          <li>Exact algorithms</li>
          <li>Heuristic approaches</li>
          <li>Approximation methods</li>
          <li>Solution quality comparison</li>
        </ul>
        
        <div className="placeholder">
          <p>Optimization content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

### Step 10: Create src/styles/index.css

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

.module-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.module-container h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 2rem;
}

.module-container > p {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.module-content {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.module-content h2 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.module-content ul {
  list-style-position: inside;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.module-content li {
  color: #555;
  margin-bottom: 0.5rem;
}

.placeholder {
  background: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  color: #999;
  margin-top: 2rem;
}

.placeholder p {
  font-style: italic;
}
```

### Step 11: Create .gitignore

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
```

### Step 12: Create README.md

Create `README.md`:

```markdown
# Module Name - IDSS

This is a module for the Intelligent Decision Support System (IDSS), built with Webpack Module Federation.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm start
   \`\`\`

   The module will run on http://localhost:300X (see webpack.config.js for port)

## Module Details

- **Exposed Component:** App (from src/App.jsx)
- **Shared Dependencies:** React, React-DOM (singleton)

## Development

The module exposes its App component via Module Federation. The host application will consume this dynamically.

## Build

```bash
npm run build
```

Output will be in the `dist/` directory.
```

### Step 13: Initialize Git and Push

```bash
# Initialize git (if not already done)
cd /path/to/module-route-optimizer
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial module setup with webpack federation"

# Add remote and push
git remote add origin https://github.com/KaSaNaa/module-route-optimizer.git
git push -u origin main
```

---

## Quick Setup Script (Optional)

To speed things up, you can create a bash script that automates most of the setup:

Create `setup-module.sh` in your host repo root:

```bash
#!/bin/bash

# Usage: ./setup-module.sh <module-name> <port>
# Example: ./setup-module.sh module-route-optimizer 3001

MODULE_NAME=$1
PORT=$2
MODULE_SNAKE=$(echo $MODULE_NAME | sed 's/-/_/g')

if [ -z "$MODULE_NAME" ] || [ -z "$PORT" ]; then
  echo "Usage: ./setup-module.sh <module-name> <port>"
  echo "Example: ./setup-module.sh module-route-optimizer 3001"
  exit 1
fi

cd modules/$MODULE_NAME

# Create directories
mkdir -p src/styles public

# Create package.json
cat > package.json << EOF
{
  "name": "$MODULE_NAME",
  "version": "1.0.0",
  "description": "$MODULE_NAME for IDSS",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "clean": "rm -rf dist"
  },
  "keywords": ["module-federation"],
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
    "react-dom": "^18.2.0"
  }
}
EOF

echo "Created package.json for $MODULE_NAME"
echo "Next steps:"
echo "1. Update webpack.config.js with port: $PORT"
echo "2. Create src files"
echo "3. Run: npm install"
echo "4. Run: npm start"
```

Make it executable:
```bash
chmod +x setup-module.sh
```

Then run for each module:
```bash
./setup-module.sh module-route-optimizer 3001
./setup-module.sh module-resource-allocator 3002
# etc.
```

---

## Setup Checklist for Each Module

- [ ] Created `package.json`
- [ ] Created `.babelrc`
- [ ] Created `webpack.config.js` (with correct port and module name)
- [ ] Created `public/index.html`
- [ ] Created `src/index.jsx`
- [ ] Created `src/bootstrap.jsx`
- [ ] Created `src/App.jsx`
- [ ] Created `src/styles/index.css`
- [ ] Created `.gitignore`
- [ ] Created `README.md`
- [ ] Ran `npm install`
- [ ] Tested: `npm start` runs on correct port
- [ ] Pushed to GitHub

---

## Port Summary

| Module | Port |
|--------|------|
| route_optimizer | 3001 |
| resource_allocator | 3002 |
| network_analyzer | 3003 |
| intelligent_decisions | 3004 |
| resource_optimizer | 3005 |

---

## Next Steps

1. Set up each of the 5 modules using this template
2. Add all modules as submodules to the host repo
3. Start the host on port 3000
4. Start each module on its assigned port
5. Verify the host can load modules from localhost URLs
6. Begin implementing the DSA tasks within each module