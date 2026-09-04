import { lazy } from 'react';

/**
 * Single source of truth for the remote modules the host federates.
 *
 * `element` uses a static `import()` specifier so webpack Module Federation can
 * resolve each remote at build time. `remoteName` / `devPort` are only used for
 * diagnostics (health checks, error messages, the dev dashboard).
 */
const RouteOptimization = lazy(() => import('module1/App'));
const ResourceAllocation = lazy(() => import('module2/App'));
const NetworkAnalysis = lazy(() => import('module3/App'));
const IntelligentDecision = lazy(() => import('module4/App'));
const ResourceOptimization = lazy(() => import('module5/App'));

export const MODULES = [
  {
    id: 'route-optimization',
    path: '/route-optimization',
    label: 'Route Optimization',
    icon: '🗺️',
    summary:
      'Determine efficient routes within transportation, logistics, or communication networks.',
    remoteName: 'module_route_optimizer',
    devPort: 3001,
    Component: RouteOptimization,
  },
  {
    id: 'resource-allocation',
    path: '/resource-allocation',
    label: 'Resource Allocation',
    icon: '🧩',
    summary:
      'Allocate limited resources efficiently while satisfying defined constraints.',
    remoteName: 'module_resource_allocator',
    devPort: 3002,
    Component: ResourceAllocation,
  },
  {
    id: 'network-analysis',
    path: '/network-analysis',
    label: 'Network Analysis',
    icon: '🕸️',
    summary:
      'Analyze relationships within a network using graph analysis algorithms.',
    remoteName: 'module_network_analyzer',
    devPort: 3003,
    Component: NetworkAnalysis,
  },
  {
    id: 'intelligent-decision',
    path: '/intelligent-decision',
    label: 'Intelligent Decision',
    icon: '🧠',
    summary:
      'Support decision-making based on input data and heuristic techniques.',
    remoteName: 'module_intelligent_decisions',
    devPort: 3004,
    // This module also needs its API server (see `npm run dev:all`).
    needsApi: true,
    Component: IntelligentDecision,
  },
  {
    id: 'optimization',
    path: '/optimization',
    label: 'Optimization',
    icon: '⚙️',
    summary:
      'Solve computational optimization problems using exact, heuristic, and approximation algorithms.',
    remoteName: 'module_resource_optimizer',
    devPort: 3005,
    Component: ResourceOptimization,
  },
];

export default MODULES;
