import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Alarm: AppRouteRecordRaw = {
  name: 'Alarm',
  path: '/alarm',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.alarm',
    icon: 'settings',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      name: 'Realtime',
      path: '/alarm/realtime',
      component: () => import('@/views/alarm/realtime/index.vue'),
      meta: {
        locale: 'menu.alarm.realtime.list',
        requiresAuth: true,
        theme: 'dark',
      },
    },
    {
      name: 'History',
      path: '/alarm/history',
      component: () => import('@/views/alarm/history/index.vue'),
      meta: {
        locale: 'menu.alarm.history.list',
        requiresAuth: true,
        theme: 'dark',
      },
    },
  ],
};

export default Alarm;
