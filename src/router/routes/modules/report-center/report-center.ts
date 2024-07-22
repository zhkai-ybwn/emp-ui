import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const OVERVIEW: AppRouteRecordRaw = {
  name: 'ReportCenter',
  path: '/report-center',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 998,
    theme: 'dark',
  },
  children: [
    {
      name: 'ManageReport',
      path: '/report-center/manage',
      component: () => import('@/views/report-center/manage/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'EnergyReport',
      path: '/report-center/energy',
      component: () => import('@/views/report-center/energy/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'OperationReport',
      path: '/report-center/operation',
      component: () => import('@/views/report-center/operation/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
  ],
};

export default OVERVIEW;
