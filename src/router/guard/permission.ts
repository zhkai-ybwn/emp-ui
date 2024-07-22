import type { Router, RouteRecordNormalized } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import usePermission from '@/hooks/permission';
import { useUserStore, useAppStore, useNavStore } from '@/store';
import { fixedRoutes, demoRoutes, dataOverviewRoutes } from '../routes';

import { WHITE_LIST, NOT_FOUND } from '../constants';

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const Permission = usePermission();
    const navStore = useNavStore();
    const permissionsAllow = Permission.accessRouter(to);

    if (to.meta.nav === 0) {
      navStore.setNav('0');
    } else {
      navStore.setNav('1');
    }
    if (to.meta.light === 5) {
      navStore.setLight('5');
    } else {
      navStore.setLight('1');
    }
    if (to.meta.theme === 'dark') {
      localStorage.setItem('arco-theme', 'dark');
      appStore.toggleTheme(true);
      // document.body.setAttribute('arco-theme', 'dark');
    } else {
      localStorage.setItem('arco-theme', 'auto');
      appStore.toggleTheme(false);
      // document.body.removeAttribute('arco-theme');
    }
    if (appStore.menuFromServer) {
      // 针对来自服务端的菜单配置进行处理
      // Handle routing configuration from the server

      // 根据需要自行完善来源于服务端的菜单配置的 permission 逻辑
      // Refine the permission logic from the server's menu configuration as needed
      if (
        !appStore.appAsyncMenus.length &&
        !WHITE_LIST.find((el) => el.name === to.name)
      ) {
        await appStore.fetchServerMenuConfig();
      }
      const serverMenuConfig = [
        ...appStore.appAsyncMenus,
        ...WHITE_LIST,
        ...fixedRoutes,
        ...demoRoutes,
        ...dataOverviewRoutes,
      ];

      let exist = false;
      while (serverMenuConfig.length && !exist) {
        const element = serverMenuConfig.shift();
        if (element?.name === to.name) exist = true;

        if (element?.children) {
          serverMenuConfig.push(
            ...(element.children as unknown as RouteRecordNormalized[])
          );
        }
      }
      if (exist && permissionsAllow) {
        next();
      } else next(NOT_FOUND);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) next();
      else {
        const destination =
          Permission.findFirstPermissionRoute(
            [...fixedRoutes, ...demoRoutes, ...dataOverviewRoutes],
            userStore.roles[0]
          ) || NOT_FOUND;
        next(destination);
      }
    }
    NProgress.done();
  });
}
