import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const OVERVIEW: AppRouteRecordRaw = {
  name: 'IntegratedMonitor',
  path: '/integrated-monitor',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 998,
    theme: 'dark',
  },
  children: [
    {
      name: 'EnergyMonitor',
      path: '/integrated-monitor/energy-monitor',
      component: () =>
        import('@/views/integrated-monitor/energy-monitor/EnergyMonitor.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'ConditioningTerminal',
      path: '/integrated-monitor/conditioning-terminal',
      component: () =>
        import(
          '@/views/integrated-monitor/conditioning-terminal/ConditioningTerminal.vue'
        ),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
  ],
};

export default OVERVIEW;
