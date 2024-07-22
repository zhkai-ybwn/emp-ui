import { NEW_SCREEN_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const Home: AppRouteRecordRaw = {
  name: 'Overview',
  path: '/overview',
  component: NEW_SCREEN_LAYOUT,
  meta: {
    requiresAuth: false,
    order: 998,
  },
  children: [
    {
      name: 'NewHome',
      path: 'newhome',
      component: () => import('@/views/data-overview/home/NewHome.vue'),
      meta: {
        requiresAuth: false,
        roles: ['*'],
        theme: 'dark',
        nav: 0,
      },
    },
  ],
};
export default Home;
