import type { RouteRecordNormalized } from 'vue-router';

const appModules = import.meta.glob('./modules/*.ts', { eager: true });
const fixedModules = import.meta.glob('./modules/fixed/*.ts', { eager: true });
const demoModules = import.meta.glob('./modules/demo/*.ts', { eager: true });
const dataOverviewModules = import.meta.glob('./modules/data-overview/*.ts', {
  eager: true,
});
const analysisModules = import.meta.glob('./modules/analysis/*.ts', {
  eager: true,
});
const smartModules = import.meta.glob('./modules/smart-maintenance/*.ts', {
  eager: true,
});
const monitorModules = import.meta.glob('./modules/monitor/*.ts', {
  eager: true,
});
const reportCenterModules = import.meta.glob('./modules/report-center/*.ts', {
  eager: true,
});
const blockchainModules = import.meta.glob('./modules/blockchain/*.ts', {
  eager: true,
});
const projectModules = import.meta.glob('./modules/project/*.ts', {
  eager: true,
});

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

export const appRoutes: RouteRecordNormalized[] = formatModules(appModules, []);
export const fixedRoutes: RouteRecordNormalized[] = formatModules(
  fixedModules,
  []
);
export const demoRoutes: RouteRecordNormalized[] = formatModules(
  demoModules,
  []
);
export const dataOverviewRoutes: RouteRecordNormalized[] = formatModules(
  dataOverviewModules,
  []
);
export const analysisRoutes: RouteRecordNormalized[] = formatModules(
  analysisModules,
  []
);
export const smartRoutes: RouteRecordNormalized[] = formatModules(
  smartModules,
  []
);

export const monitorRoutes: RouteRecordNormalized[] = formatModules(
  monitorModules,
  []
);

export const reportCenterRoutes: RouteRecordNormalized[] = formatModules(
  reportCenterModules,
  []
);
export const blockchainRoutes: RouteRecordNormalized[] = formatModules(
  blockchainModules,
  []
);

export const projectRoutes: RouteRecordNormalized[] = formatModules(
  projectModules,
  []
);
