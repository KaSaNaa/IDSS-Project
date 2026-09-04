import React from 'react';

/**
 * Catches load/render failures from a federated remote so one broken or offline
 * module never takes down the whole host shell.
 */
class ModuleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    const name = this.props.module?.label ?? 'unknown';
    console.error(`[IDSS host] module "${name}" failed to load:`, error, info);
  }

  componentDidUpdate(prevProps) {
    // Recover automatically when navigating to a different module.
    if (prevProps.module?.id !== this.props.module?.id && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleRetry = () => {
    // React.lazy caches a rejected import, so a full reload is the reliable reset.
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const { module } = this.props;
    const label = module?.label ?? 'This';
    const port = module?.devPort;

    return (
      <div className="idss-error">
        <div className="idss-error__icon" aria-hidden="true">
          ⚠️
        </div>
        <h2>{label} module is unavailable</h2>
        <p>
          The host could not load this remote. Its dev server may be offline or
          still starting up
          {port ? ` (expected on port ${port})` : ''}.
        </p>
        {module?.needsApi && (
          <p className="idss-error__hint">
            This module also needs its API server. Run{' '}
            <code className="idss-code">npm run dev:all</code> from the host to
            start everything.
          </p>
        )}
        {this.state.error?.message && (
          <pre className="idss-error__detail">{this.state.error.message}</pre>
        )}
        <div className="idss-error__actions">
          <button className="idss-btn idss-btn--primary" onClick={this.handleRetry}>
            Reload host
          </button>
          {port && (
            <a
              className="idss-btn idss-btn--ghost"
              href={`http://localhost:${port}`}
              target="_blank"
              rel="noreferrer"
            >
              Open module directly
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default ModuleErrorBoundary;
