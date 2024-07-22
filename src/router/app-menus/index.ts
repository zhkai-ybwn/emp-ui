// import { fixedRoutes, demoRoutes } from '../routes';

import { fixedRoutes } from '../routes';

const mixinRoutes: any[] = [...fixedRoutes];

const staticMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el;
  return {
    name,
    path,
    meta,
    redirect,
    children,
  };
});

export default staticMenus;
