import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/integrateMonitor/energyMonitor/v1/airConditionSysECSaving'),
      () => {
        return successResponseWrap({
          values: [
            {
              ts: '1696176000000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696176300000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696176600000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696179600000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696183200000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696186800000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696190400000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696194000000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696197600000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696201200000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696204800000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696208400000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696212000000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696215600000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696219200000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696222800000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696226400000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696230000000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696233600000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696237200000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696240800000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696244400000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696248000000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696251600000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696255200000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696258800000',
              v: Math.floor(Math.random() * 10001),
            },
            {
              ts: '1696262400000',
              v: Math.floor(Math.random() * 10001),
            },
          ],
          electricitySaving: Math.floor(Math.random() * 10001),
          reducedStandardCoal: Math.floor(Math.random() * 10001),
          reduceCO2Emissions: Math.floor(Math.random() * 10001),
          reduceSO2Emissions: Math.floor(Math.random() * 10001),
        });
      }
    );

    Mock.mock(
      new RegExp('/integrateMonitor/energyMonitor/v1/areaEnergyRankTop5'),
      () => {
        return successResponseWrap({
          rankData: [
            {
              name: '综合楼西区',
              value: Math.floor(Math.random() * 10001),
            },
            { name: '主楼', value: Math.floor(Math.random() * 10001) },
            { name: '厂区1', value: Math.floor(Math.random() * 10001) },
            { name: '厂区2', value: Math.floor(Math.random() * 10001) },
            { name: '办公楼', value: Math.floor(Math.random() * 10001) },
          ],
        });
      }
    );
  },
});
