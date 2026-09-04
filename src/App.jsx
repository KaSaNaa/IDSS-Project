import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import { MODULES } from './config/modules';
import ModuleErrorBoundary from './components/ModuleErrorBoundary';
import ModuleLoader from './components/ModuleLoader';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './styles/index.css';

function Navbar() {
  return (
    <nav className="idss-nav">
      <Link to="/" className="idss-nav__brand">
        <span className="idss-nav__brand-mark">IDSS</span>
        <span className="idss-nav__brand-sub">
          Intelligent Decision Support System
        </span>
      </Link>
      <ul className="idss-nav__links">
        <li>
          <NavLink to="/" end className="idss-nav__link">
            Home
          </NavLink>
        </li>
        {MODULES.map((m) => (
          <li key={m.id}>
            <NavLink to={m.path} className="idss-nav__link">
              <span className="idss-nav__link-icon" aria-hidden="true">
                {m.icon}
              </span>
              {m.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** A federated module renders its own full-page UI, so give it an isolated wrapper. */
function ModuleView({ module }) {
  const { label, Component } = module;
  return (
    <ModuleErrorBoundary module={module}>
      <Suspense fallback={<ModuleLoader label={label} />}>
        <div className="idss-viewport" data-module={module.id}>
          <Component />
        </div>
      </Suspense>
    </ModuleErrorBoundary>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="idss-shell">
        <Navbar />
        <main className="idss-main">
          <Routes>
            <Route path="/" element={<Home />} />
            {MODULES.map((m) => (
              <Route
                key={m.id}
                path={m.path}
                element={<ModuleView module={m} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="idss-footer">
          <span>IDSS &middot; Module Federation host</span>
          <span>{MODULES.length} modules integrated</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
