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
