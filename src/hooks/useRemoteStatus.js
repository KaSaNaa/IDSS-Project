import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Polls each module's `remoteEntry.js` (CORS-enabled) to show whether its dev
 * server is up. Purely informational — the actual load is still guarded by the
 * error boundary.
 */
const CHECK_INTERVAL_MS = 15000;

async function ping(port, signal) {
  try {
    const res = await fetch(`http://localhost:${port}/remoteEntry.js`, {
      method: 'GET',
      cache: 'no-store',
      signal,
    });
    return res.ok ? 'online' : 'offline';
  } catch {
    return 'offline';
  }
}

export default function useRemoteStatus(modules) {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(modules.map((m) => [m.id, 'checking'])),
  );
  const modulesRef = useRef(modules);
  modulesRef.current = modules;

  const check = useCallback(() => {
    const controller = new AbortController();
    Promise.all(
      modulesRef.current.map(async (m) => {
        const status = await ping(m.devPort, controller.signal);
        return [m.id, status];
      }),
    ).then((entries) => {
      if (!controller.signal.aborted) {
        setStatuses(Object.fromEntries(entries));
      }
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const abort = check();
    const timer = setInterval(check, CHECK_INTERVAL_MS);
    return () => {
      abort();
      clearInterval(timer);
    };
  }, [check]);

  return { statuses, refresh: check };
}
