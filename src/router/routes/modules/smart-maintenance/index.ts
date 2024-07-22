import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SMARTMAINTENANCE: AppRouteRecordRaw = {
  name: 'SmartMaintenance',
  path: '/smart-maintenance',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 997,
    theme: 'dark',
  },
  // children: [
  //   {
  //     name: 'HealthDiagnosis',
  //     path: '/smart-maintenance/health-diagnosis',
  //     component: '',
  //     meta: {
  //       requiresAuth: false,
  //       roles: ['*'],
  //       theme: 'dark',
  //     },
  children: [
    // 冷水机房
    {
      name: 'NewChillerRoom',
      path: '/smart-maintenance/health-diagnosis/new-chiller-room',
      component: () =>
        import(
          '@/views/smart-maintenance/health-diagnosis/chiller-room/NewChillerRoom.vue'
        ),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        theme: 'dark',
      },
    },
    // // 冷水机组#1
    // {
    //   name: 'ChillerUnit1',
    //   path: '/smart-maintenance/health-diagnosis/chiller-unit1',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/chiller-unit/ChillerUnit1.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷水机组#2
    // {
    //   name: 'ChillerUnit2',
    //   path: '/smart-maintenance/health-diagnosis/chiller-unit2',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/chiller-unit/ChillerUnit2.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷水泵#1
    // {
    //   name: 'ChilledWaterPump1',
    //   path: '/smart-maintenance/health-diagnosis/chilled-water-pump1',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/chilled-water-pump/ChilledWaterPump1.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷水泵#2
    // {
    //   name: 'ChilledWaterPump2',
    //   path: '/smart-maintenance/health-diagnosis/chilled-water-pump2',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/chilled-water-pump/ChilledWaterPump2.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷却水泵#1
    // {
    //   name: 'CoolingWaterPump1',
    //   path: '/smart-maintenance/health-diagnosis/cooling-water-pump1',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/cooling-water-pump/CoolingWaterPump1.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷却水泵#2
    // {
    //   name: 'CoolingWaterPump2',
    //   path: '/smart-maintenance/health-diagnosis/cooling-water-pump2',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/cooling-water-pump/CoolingWaterPump2.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷却塔#1
    // {
    //   name: 'CoolingTower1',
    //   path: '/smart-maintenance/health-diagnosis/cooling-tower1',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/cooling-tower/CoolingTower1.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // // 冷却塔#2
    // {
    //   name: 'CoolingTower2',
    //   path: '/smart-maintenance/health-diagnosis/cooling-tower2',
    //   component: () =>
    //     import(
    //       '@/views/smart-maintenance/health-diagnosis/cooling-tower/CoolingTower2.vue'
    //     ),
    //   meta: {
    //     requiresAuth: true,
    //     // theme: 'dark',
    //     roles: ['*'],
    //   },
    // },
    // ],
    // },
  ],
};

export default SMARTMAINTENANCE;
