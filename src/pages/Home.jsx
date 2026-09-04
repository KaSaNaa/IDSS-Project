import React from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../config/modules';
import useRemoteStatus from '../hooks/useRemoteStatus';

const STATUS_LABEL = {
  online: 'Online',
  offline: 'Offline',
  checking: 'Checking…',
};

function Home() {
  const { statuses, refresh } = useRemoteStatus(MODULES);
  const onlineCount = Object.values(statuses).filter((s) => s === 'online').length;

  return (
    <div className="idss-home">
      <header className="idss-home__hero">
        <h1>Intelligent Decision Support System</h1>
        <p>
          A unified shell for five independent decision-support modules, composed
          at runtime with Webpack Module Federation.
        </p>
        <div className="idss-home__status">
          <span
            className={
              onlineCount === MODULES.length
                ? 'idss-pill idss-pill--ok'
                : 'idss-pill idss-pill--warn'
            }
          >
            {onlineCount}/{MODULES.length} modules online
          </span>
          <button className="idss-btn idss-btn--ghost idss-btn--sm" onClick={refresh}>
            Refresh status
          </button>
        </div>
      </header>

      <div className="idss-grid">
        {MODULES.map((m) => {
          const status = statuses[m.id] ?? 'checking';
          return (
            <Link key={m.id} to={m.path} className="idss-card">
              <div className="idss-card__top">
                <span className="idss-card__icon" aria-hidden="true">
                  {m.icon}
                </span>
                <span
                  className={`idss-status idss-status--${status}`}
                  title={STATUS_LABEL[status]}
                >
                  {STATUS_LABEL[status]}
                </span>
              </div>
              <h3>{m.label}</h3>
              <p>{m.summary}</p>
              <span className="idss-card__cta">Open module →</span>
            </Link>
          );
        })}
      </div>

      <p className="idss-home__footnote">
        Modules run on ports 3001–3005. Start everything at once with{' '}
        <code className="idss-code">npm run dev:all</code>.
      </p>
    </div>
  );
}

export default Home;
