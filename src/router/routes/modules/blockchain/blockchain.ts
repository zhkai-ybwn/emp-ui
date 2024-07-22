import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const BLOCKCHAIN: AppRouteRecordRaw = {
  name: 'BLOCKCHAIN',
  path: '/blockchain',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 999,
    theme: 'dark',
  },
  children: [
    {
      name: 'CoManagement',
      path: '/blockchain/management',
      component: () => import('@/views/blockchain/coManagement/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    {
      name: 'optimization',
      path: '/blockchain/optimization',
      component: () => import('@/views/blockchain/optimization/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
  ],
};

export default BLOCKCHAIN;
