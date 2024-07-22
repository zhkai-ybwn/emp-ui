import {
  createRouter,
  createWebHistory,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { useAppStore } from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import { DashboardRecentlyVisitedRecord } from '@/api/common/dashboard';
import {
  appRoutes,
  fixedRoutes,
  demoRoutes,
  dataOverviewRoutes,
  analysisRoutes,
  monitorRoutes,
  reportCenterRoutes,
  blockchainRoutes,
  smartRoutes,
  projectRoutes,
} from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE, DEFAULT_LAYOUT } from './routes/base';
import createRouteGuard from './guard';

const smartModules = import.meta.glob(
  '../../src/views/smart-maintenance/health-diagnosis/*/*.vue',
  {
    eager: true,
  }
);

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: `/login`,
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
        theme: 'dark',
      },
    },
    {
      path: '/social/callback',
      name: 'SocialCallback',
      component: () => import('@/views/login/social/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...appRoutes,
    ...fixedRoutes,
    ...demoRoutes,
    ...dataOverviewRoutes,
    ...analysisRoutes,
    ...monitorRoutes,
    ...reportCenterRoutes,
    ...blockchainRoutes,
    ...smartRoutes,
    ...projectRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

const loadAsyncRoutes = async () => {
  try {
    const newRoute =
      // @ts-ignore
      JSON.parse(window.localStorage.getItem('newRoute'));
    if (newRoute) {
      // @ts-ignore
      const child = [];
      // @ts-ignore
      newRoute.children.forEach((el) => {
        child.push({
          name: el.name,
          path: el.path,
          // @ts-ignore
          component: smartModules[`../views/${el.component}.vue`].default,
          meta: el.meta,
        });
      });
      const smart: RouteRecordRaw = {
        name: 'addRoute',
        component: DEFAULT_LAYOUT,
        path: '',
        meta: {
          requiresAuth: true,
          order: 997,
          theme: 'dark',
        },
        children: [
          {
            name: 'HealthDiagnosis',
            path: '/smart-maintenance/health-diagnosis',
            // @ts-ignore
            component: null,
            meta: {
              requiresAuth: false,
              roles: ['*'],
              theme: 'dark',
            },
            // @ts-ignore
            children: child,
          },
        ],
      };

      router.addRoute(smart);
    }
  } catch (error) {
    // @ts-ignore
    console.log(error.stack);
  }
};

loadAsyncRoutes();

router.beforeEach(() => {
  loadAsyncRoutes();
});
router.afterEach((to) => {
  const allMenuList = useAppStore().appAsyncMenusAll as RouteRecordNormalized[];
  const toMenu = allMenuList.find((m) => to.path === m.path) || undefined;
  if (toMenu === undefined) {
    return;
  }

  const recentlyVisitedList = window.localStorage.getItem('recently-visited');
  let copyRecentlyVisitedList: DashboardRecentlyVisitedRecord[];
  if (recentlyVisitedList === null) {
    copyRecentlyVisitedList = [];
  } else {
    copyRecentlyVisitedList = JSON.parse(recentlyVisitedList);
  }

  // 是否有重复点击的菜单
  copyRecentlyVisitedList.forEach(
    (item: DashboardRecentlyVisitedRecord, index: number) => {
      if (item.path === to.path) {
        copyRecentlyVisitedList.splice(index, 1);
      }
    }
  );

  // 最多存储 3 个
  const menuMeta = toMenu?.meta;
  const recentlyVisited: DashboardRecentlyVisitedRecord = {
    title: menuMeta?.locale,
    path: to.path,
    icon: menuMeta?.icon,
  };
  copyRecentlyVisitedList.reverse();
  copyRecentlyVisitedList.push(recentlyVisited);
  copyRecentlyVisitedList.reverse();
  if (copyRecentlyVisitedList.length >= 4) {
    copyRecentlyVisitedList = copyRecentlyVisitedList.splice(0, 3);
  }
  window.localStorage.setItem(
    'recently-visited',
    JSON.stringify(copyRecentlyVisitedList)
  );
});

router.onError((error, to) => {
  console.log(error, to);
});

export default router;
