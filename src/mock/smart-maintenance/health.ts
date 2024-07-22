import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { MockParams } from '@/types/mock';

setupMock({
  setup() {
    // 运行状态 RUNNING_STATUS
    Mock.mock(
      new RegExp('/intelligentAlarm/health/getTotalDeviceDetail'),
      () => {
        return successResponseWrap([
          {
            deviceId: '1',
            deviceName: '冷却塔#1',
            pointDetailVoList: [
              {
                alarmLevel: { code: 1, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: false,
          },
          {
            deviceId: '2',
            deviceName: '冷却塔#2',
            pointDetailVoList: [
              {
                alarmLevel: { code: 2, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: false,
          },
          {
            deviceId: '3',
            deviceName: '冷却水泵#1',
            pointDetailVoList: [
              {
                alarmLevel: { code: 3, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: true,
          },
          {
            deviceId: '4',
            deviceName: '冷却水泵#2',
            pointDetailVoList: [
              {
                alarmLevel: { code: 4, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: true,
          },
          {
            deviceId: '5',
            deviceName: '冷水机组#1',
            runningStatus: false,
          },
          {
            deviceId: '6',
            deviceName: '冷水机组#2',
            pointDetailVoList: [
              {
                alarmLevel: { code: 1, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: true,
          },
          {
            deviceId: '7',
            deviceName: '冷水泵#1',
            pointDetailVoList: [
              {
                alarmLevel: { code: 2, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: true,
          },
          {
            deviceId: '8',
            deviceName: '冷水泵#2',
            pointDetailVoList: [
              {
                alarmLevel: { code: 3, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
              {
                alarmLevel: { code: 3, mes: '', value: 0 },
                alarmTitle: '蒸发器趋近温度',
              },
            ],
            runningStatus: true,
          },
        ]);
      }
    );
    // 瞬时COP INSTANT_COP
    // 平均COP  AVG_COP
    // 瞬时SCOP INSTANT_SCOP
    // 平均SCOP AVG_SCOP
    Mock.mock(
      new RegExp('/intelligentAlarm/health/getTotalPointDetail'),
      () => {
        return successResponseWrap({
          alarmingCount: 0,
          pointList: [
            {
              alarmLevel: '提示',
              deviceCode: '',
              deviceId: 0,
              deviceName: '',
              pointDisplayName: '瞬时COP',
              pointId: '',
              pointValue: '0.00',
              sort: 0,
              unit: '',
            },
            {
              alarmLevel: '一般',
              deviceCode: '',
              deviceId: 0,
              deviceName: '',
              pointDisplayName: '平均COP',
              pointId: '',
              pointValue: '5.60',
              sort: 0,
              unit: '',
            },
            {
              alarmLevel: '严重',
              deviceCode: '',
              deviceId: 0,
              deviceName: '',
              pointDisplayName: '瞬时SCOP',
              pointId: '',
              pointValue: '0.00',
              sort: 0,
              unit: '',
            },
            {
              alarmLevel: '致命',
              deviceCode: '',
              deviceId: 0,
              deviceName: '',
              pointDisplayName: '平均SCOP',
              pointId: '',
              pointValue: '7.52',
              sort: 0,
              unit: '',
            },
          ],
          todayAlarmCount: 16,
        });
      }
    );

    Mock.mock(
      new RegExp('/intelligentAlarm/health/getLatticeDiagramData'),
      (params: MockParams) => {
        const { pointTypes } = JSON.parse(params.body);
        //   INSTANT_COP,  AVG_COP,
        if (pointTypes[0] === 'INSTANT_COP' && pointTypes[1] === 'AVG_COP') {
          return successResponseWrap({
            latticeDataList: [
              {
                pointTime: '1693497600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693494000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693490400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693486800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693483200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693479600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693476000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693472400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693468800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693465200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693461600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693458000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693454400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693450800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693447200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693443600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693440000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693436400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693432800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693429200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693425600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693422000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693418400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693414800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693411200000',
                pointValue: Math.floor(Math.random() * 101),
              },
            ],
            leftPointName: '水系统瞬时COP',
            rightPointName: '平均COP',
            rightPointValue: '5.60',
            // latticeDataList: [],
          });
        }
        //  INSTANT_SCOP,    AVG_SCOP,
        if (pointTypes[0] === 'INSTANT_SCOP' && pointTypes[1] === 'AVG_SCOP') {
          return successResponseWrap({
            latticeDataList: [
              {
                pointTime: '1693497600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693494000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693490400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693486800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693483200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693479600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693476000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693472400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693468800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693465200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693461600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693458000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693454400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693450800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693447200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693443600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693440000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693436400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693432800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693429200000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693425600000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693422000000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693418400000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693414800000',
                pointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693411200000',
                pointValue: Math.floor(Math.random() * 101),
              },
            ],
            leftPointName: '水系统瞬时SCOP',
            rightPointName: '平均SCOP',
            rightPointValue: '7.50',
          });
        }
        if (
          pointTypes[0] === 'INSTANT_COOL' &&
          pointTypes[1] === 'TOTAL_COOL'
        ) {
          return successResponseWrap({
            latticeDataList: [
              { pointTime: '1693497600000', pointValue: '22' },
              { pointTime: '1693494000000', pointValue: '43' },
              { pointTime: '1693490400000', pointValue: '29' },
              { pointTime: '1693486800000', pointValue: '9' },
              { pointTime: '1693483200000', pointValue: '23' },
              { pointTime: '1693479600000', pointValue: '15' },
              { pointTime: '1693476000000', pointValue: '12' },
              { pointTime: '1693472400000', pointValue: '14' },
              { pointTime: '1693468800000', pointValue: '36' },
              { pointTime: '1693465200000', pointValue: '22' },
              { pointTime: '1693461600000', pointValue: '17' },
              { pointTime: '1693458000000', pointValue: '19' },
              { pointTime: '1693454400000', pointValue: '2' },
              { pointTime: '1693450800000', pointValue: '13' },
              { pointTime: '1693447200000', pointValue: '11' },
              { pointTime: '1693443600000', pointValue: '19' },
              { pointTime: '1693440000000', pointValue: '24' },
              { pointTime: '1693436400000', pointValue: '26' },
              { pointTime: '1693432800000', pointValue: '27' },
              { pointTime: '1693429200000', pointValue: '26' },
              { pointTime: '1693425600000', pointValue: '22' },
              { pointTime: '1693422000000', pointValue: '13' },
              { pointTime: '1693418400000', pointValue: '15' },
              { pointTime: '1693414800000', pointValue: '17' },
              { pointTime: '1693411200000', pointValue: '19' },
            ],
            leftPointName: '瞬时制冷量(kW)',
            rightPointName: '累计制冷量(kW)',
            rightPointValue: '',
          });
        }
        // INSTANT_COOL TOTAL_COOL
        return successResponseWrap({});
      }
    );

    Mock.mock(
      new RegExp('/intelligentAlarm/health/getLineChartData'),
      (params: MockParams) => {
        const { pointTypes } = JSON.parse(params.body);
        if (
          pointTypes[0] === 'INSTANT_COOL' &&
          pointTypes[1] === 'TOTAL_COOL'
        ) {
          return successResponseWrap({
            lineChartDataList: [
              {
                pointTime: '1693497600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693494000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693490400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693486800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693483200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693479600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693476000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693472400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693468800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693465200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693461600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693458000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693454400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693450800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693447200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693443600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693440000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693436400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693432800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693429200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693425600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693422000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693418400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693414800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693411200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
            ],
            leftPointName: '瞬时制冷量',
            rightPointName: '累计制冷量',
          });
        }
        if (
          pointTypes[0] === 'FREQUENCY_FEEDBACK' &&
          pointTypes[1] === 'INSTANT_POWER'
        ) {
          return successResponseWrap({
            lineChartDataList: [
              {
                pointTime: '1693497600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693494000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693490400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693486800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693483200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693479600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693476000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693472400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693468800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693465200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693461600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693458000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693454400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693450800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693447200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693443600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693440000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693436400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693432800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693429200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693425600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693422000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693418400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693414800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693411200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
            ],
            leftPointName: '频率',
            rightPointName: '实时功率',
          });
        }
        if (
          pointTypes[0] === 'INSTANT_TRANSPORT' &&
          pointTypes[1] === 'TOTAL_TRANSPORT'
        ) {
          return successResponseWrap({
            lineChartDataList: [
              {
                pointTime: '1693497600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693494000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693490400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693486800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693483200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693479600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693476000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693472400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693468800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693465200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693461600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693458000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693454400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693450800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693447200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693443600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693440000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693436400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693432800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693429200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693425600000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693422000000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693418400000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693414800000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
              {
                pointTime: '1693411200000',
                leftPointValue: Math.floor(Math.random() * 101),
                rightPointValue: Math.floor(Math.random() * 101),
              },
            ],
            leftPointName: '瞬时值',
            rightPointName: '累计值',
          });
        }
        // INSTANT_COOL TOTAL_COOL
        return successResponseWrap({});
      }
    );

    Mock.mock(new RegExp('/intelligentAlarm/health/getPartPointDetail'), () => {
      return successResponseWrap({
        alarmingCount: 1,
        pointList: [
          {
            alarmLevel: '',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '运行时间',
            pointId: '',
            pointValue: '15',
            sort: 0,
            unit: 'h',
          },
          {
            alarmLevel: '',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '累计运行时间',
            pointId: '',
            pointValue: '1554',
            sort: 0,
            unit: 'h',
          },
          {
            alarmLevel: '正常',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '水泵状态',
            pointId: '',
            pointValue: '',
            sort: 0,
            unit: '',
          },
          {
            alarmLevel: '提示',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '实时功率',
            pointId: '',
            pointValue: '15',
            sort: 0,
            unit: 'kW',
          },
          {
            alarmLevel: '一般',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '频率反馈',
            pointId: '',
            pointValue: '50',
            sort: 0,
            unit: 'Hz',
          },
          {
            alarmLevel: '严重',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '健康度',
            pointId: '',
            pointValue: '98.9',
            sort: 0,
            unit: '%',
          },
          {
            alarmLevel: '致命',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '健康度Test',
            pointId: '',
            pointValue: '98.9',
            sort: 0,
            unit: '%',
          },
          {
            alarmLevel: '致命',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '健康度Test1',
            pointId: '',
            pointValue: '98.9',
            sort: 0,
            unit: '%',
          },
          {
            alarmLevel: '致命',
            deviceCode: '',
            deviceId: 0,
            deviceName: '',
            pointDisplayName: '健康度Test2',
            pointId: '',
            pointValue: '98.9',
            sort: 0,
            unit: '%',
          },
        ],
        runningStatus: true,
        todayAlarmCount: 3,
        todayRate: '40.0',
      });
    });

    Mock.mock(
      new RegExp('/intelligentAlarm/health/getPointCorrespondence'),
      () => {
        return successResponseWrap({
          abscissaPointName: '实时功率',
          ordinatePointName: '频率',
          pointDataList: [
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
            {
              abscissaPointValue: Math.floor(Math.random() * 101),
              ordinatePointValue: Math.floor(Math.random() * 101),
            },
          ],
        });
      }
    );
  },
});
