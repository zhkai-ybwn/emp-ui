export const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
  { name: 'SocialCallback', children: [] },
  {
    name: 'Overview',
    children: [
      {
        name: 'NewHome',
        path: 'newhome',
        component: () => import('@/views/data-overview/home/NewHome.vue'),
        meta: {
          requiresAuth: true,
          roles: ['*'],
          theme: 'dark',
          nav: 0,
        },
      },
    ],
  },
  // { name: 'Alarm', children: [{ name: 'Realtime' }, { name: 'History' }] },
  // {
  //   name: 'SmartMaintenance',
  //   children: [
  //     { name: 'SmartMaintenance ', children: [{ name: 'ChillerUnit1' }] },
  //   ],
  // },
  // {
  //   name: 'ANALYSIS',
  //   // analysis/energy-analysis
  //   children: [
  //     {
  //       name: 'EnergyAnalysis',
  //     },
  //   ],
  // },
  // {
  //   name: 'Calendar',
  //   path: '/analysis/calendar',
  // },
  // {
  //   name: 'ReportCenter',

  //   children: [
  //     {
  //       name: 'ManageReport',
  //       path: '/report-center/manage',
  //       component: () => import('@/views/report-center/manage/index.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         roles: ['*'],
  //         theme: 'dark',
  //       },
  //     },
  //     {
  //       name: 'EnergyReport',
  //       path: '/report-center/energy',
  //       component: () => import('@/views/report-center/energy/index.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         roles: ['*'],
  //         theme: 'dark',
  //       },
  //     },
  //     {
  //       name: 'OperationReport',
  //       path: '/report-center/operation',
  //       component: () => import('@/views/report-center/operation/index.vue'),
  //       meta: {
  //         requiresAuth: true,
  //         roles: ['*'],
  //         theme: 'dark',
  //       },
  //     },
  //   ],
  // },
  // {
  //   name: 'ConditioningTerminal',
  //   path: '/integrated-monitor/conditioning-terminal',
  // },
  {
    name: 'EnergyQuery',
    path: '/analysis/query',
    component: () => import('@/views/energy-analysis/query/EnergyQuery.vue'),
    meta: {
      requiresAuth: true,
      roles: ['*'],
      theme: 'dark',
    },
  },
  {
    name: 'EnergyRank',
    path: '/analysis/rank',
    component: () => import('@/views/energy-analysis/rank/EnergyRank.vue'),
    meta: {
      requiresAuth: true,
      roles: ['*'],
      theme: 'dark',
    },
  },
  // {
  //   name: 'Space',
  //   path: '/system/space',
  // },
  // {
  //   name: 'Type',
  //   path: '/system/equipment/type',
  // },
  // {
  //   name: 'Info',
  //   path: '/system/equipment/info',
  // },
];

export const NOT_FOUND = {
  name: 'notFound',
};

export const REDIRECT_ROUTE_NAME = 'Redirect';

export const DEFAULT_ROUTE_NAME = 'Workplace';

export const DEFAULT_ROUTE = {
  title: 'menu.dashboard.workplace',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/workplace',
};
