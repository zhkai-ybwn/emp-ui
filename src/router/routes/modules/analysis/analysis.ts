import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const ANALYSIS: AppRouteRecordRaw = {
  name: 'ANALYSIS',
  path: '/analysis',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 999,
    theme: 'dark',
  },
  children: [
    {
      name: 'LoadForecast',
      path: '/analysis/load-forecast',
      component: () =>
        import('@/views/energy-analysis/load-forecast/LoadForecast.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'ConsumptionPanel',
      path: '/analysis/consumption-panel',
      component: () =>
        import(
          '@/views/energy-analysis/consumption-panel/ConsumptionPanel.vue'
        ),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'Calendar',
      path: '/analysis/calendar',
      component: () => import('@/views/energy-analysis/calendar/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'EnergyQuery',
      path: '/analysis/query',
      component: () => import('@/views/energy-analysis/query/EnergyQuery.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'EnergyRank',
      path: '/analysis/rank',
      component: () => import('@/views/energy-analysis/rank/EnergyRank.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
  ],
};

export default ANALYSIS;
