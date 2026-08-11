import React from 'react';

class ModuleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(`Failed to load module "${this.props.moduleName}":`, error, info);
  }

  handleRetry = () => {
    // React.lazy caches a failed import forever, so only a full reload re-triggers it
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="module-error">
          <h2>Module Unavailable</h2>
          <p>
            The "{this.props.moduleName}" module could not be loaded. It may be
            offline or still starting up.
          </p>
          <button className="module-error-retry" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModuleErrorBoundary;
