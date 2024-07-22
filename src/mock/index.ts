import Mock from 'mockjs';

import './login';
import './message-box';
import './smart-maintenance/health';
import './energy-analysis/consumption-panel';
import './integrated-monitor/energy-monitor';
import './report-center/index';

import '@/views/dashboard/workplace/mock';

import '@/views/demo/visualization/real-time-monitor/mock';

import '@/views/demo/list/card/mock';
import '@/views/demo/list/search-table/mock';

import '@/views/demo/form/step/mock';

import '@/views/demo/profile/basic/mock';

import '@/views/demo/visualization/data-analysis/mock';
import '@/views/demo/visualization/multi-dimension-data-analysis/mock';

import '@/views/system/user/center/mock';

import '@/views/alarm/mock';

Mock.setup({
  timeout: '15-150',
});
