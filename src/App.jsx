import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ModuleErrorBoundary from './components/ModuleErrorBoundary';
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
              <Route
                path="/route-optimization"
                element={
                  <ModuleErrorBoundary moduleName="Route Optimization">
                    <RouteOptimization />
                  </ModuleErrorBoundary>
                }
              />
              <Route
                path="/resource-allocation"
                element={
                  <ModuleErrorBoundary moduleName="Resource Allocation">
                    <ResourceAllocation />
                  </ModuleErrorBoundary>
                }
              />
              <Route
                path="/network-analysis"
                element={
                  <ModuleErrorBoundary moduleName="Network Analysis">
                    <NetworkAnalysis />
                  </ModuleErrorBoundary>
                }
              />
              <Route
                path="/intelligent-decision"
                element={
                  <ModuleErrorBoundary moduleName="Intelligent Decision">
                    <IntelligentDecision />
                  </ModuleErrorBoundary>
                }
              />
              <Route
                path="/optimization"
                element={
                  <ModuleErrorBoundary moduleName="Optimization">
                    <Optimization />
                  </ModuleErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
