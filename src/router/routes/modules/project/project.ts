import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const PROJECT: AppRouteRecordRaw = {
  name: 'Project',
  path: '/project',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 999,
    theme: 'dark',
  },
  children: [
    {
      name: 'ProjectModel',
      path: '/project/model',
      component: () => import('@/views/project/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
  ],
};

export default PROJECT;
