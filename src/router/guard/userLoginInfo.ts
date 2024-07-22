import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore, useAppStore } from '@/store';
import { isLogin } from '@/utils/auth';

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    const appStore = useAppStore();
    appStore.init();
    if (to.name === 'NewHome') {
      next();
    } else if (isLogin()) {
      const name = localStorage.getItem('name');
      if (to.name === 'login' && name !== 'super_admin') {
        next({ name: 'EnergyMonitor' });
        NProgress.done();
        return;
      }
      if (userStore.roles[0]) {
        next();
      } else {
        try {
          await userStore.getInfo();

          next();
        } catch (error) {
          await userStore.logoutCallBack();
          next({
            name: 'login',
            query: {
              // redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
        }
      }
    } else {
      if (to.name === 'login' || to.name === 'SocialCallback') {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          // redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
    next();
  });
}
