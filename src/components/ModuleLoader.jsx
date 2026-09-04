import React from 'react';

function ModuleLoader({ label }) {
  return (
    <div className="idss-loader" role="status" aria-live="polite">
      <div className="idss-loader__spinner" aria-hidden="true" />
      <p>Loading {label ? `“${label}”` : 'module'}…</p>
    </div>
  );
}

export default ModuleLoader;
