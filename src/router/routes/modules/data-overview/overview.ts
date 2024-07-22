import { SCREEN_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const OVERVIEW: AppRouteRecordRaw = {
  name: 'DataOverview',
  path: '/data-overview',
  component: SCREEN_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 998,
  },
  children: [
    {
      name: 'Home',
      path: 'home',
      component: () => import('@/views/data-overview/home/Home.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
        nav: 0,
      },
    },

    {
      name: 'DeviceMonitor',
      path: 'deviceMonitor',
      component: () =>
        import('@/views/data-overview/energy-plant/device-monitor/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
        nav: 0,
      },
    },
    {
      name: 'PlantMonitor',
      path: 'plantMonitor',
      component: () =>
        import('@/views/data-overview/energy-plant/plant-monitor/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
        nav: 0,
      },
    },
    {
      name: 'PvPower',
      path: 'pvPower',
      component: () =>
        import('@/views/data-overview/energy-plant/pv-power/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
        nav: 0,
      },
    },
    {
      name: 'MetroHome',
      path: 'MetroHome',
      component: () => import('@/views/data-overview/metro-home/MetroHome.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
        nav: 0,
        light: 5,
      },
    },
  ],
};

export default OVERVIEW;
