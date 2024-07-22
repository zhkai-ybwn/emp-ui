import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';

setupMock({
  setup() {
    Mock.mock(new RegExp('/analysisWeb/assetTopo/queryAssetTopology'), () => {
      return successResponseWrap([
        {
          children: [
            {
              value: '1-1',
              parentId: 1,
              title: '1-1',
              key: '1-1',
            },
            {
              value: '1-2',
              parentId: 1,
              title: '1-2',
              key: '1-2',
            },
          ],
          value: '1',
          parentId: 0,
          title: '一级节点1',
          key: '1',
        },
        {
          children: [
            {
              value: '2-1',
              parentId: 0,
              title: '2-1',
              key: '2-1',
            },
            {
              value: '2-2',
              parentId: 0,
              title: '2-2',
              key: '2-2',
            },
          ],
          value: '2',
          parentId: 0,
          title: '一级节点2',
          key: '2',
        },
      ]);
    });

    Mock.mock(new RegExp('/analysisWeb/energyAnalysis/v1/ECTends'), () => {
      return successResponseWrap({
        avgValue: 0,
        maxValue: 0,
        minValue: 0,
        // values: [],
        values: [
          {
            ts: '1696176000000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696176300000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696176600000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696179600000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696183200000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696186800000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696190400000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696194000000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696197600000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696201200000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696204800000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696208400000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696212000000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696215600000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696219200000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696222800000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696226400000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696230000000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696233600000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696237200000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696240800000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696244400000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696248000000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696251600000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696255200000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696258800000',
            v: Math.floor(Math.random() * 101),
          },
          {
            ts: '1696262400000',
            v: Math.floor(Math.random() * 101),
          },
        ],
      });
    });

    Mock.mock(new RegExp('/analysisWeb/energyAnalysis/v1/ECOverAll'), () => {
      return successResponseWrap({
        carbonEmissionConversion: 4.37,
        perCapita: 45.58,
        standardCoalConversion: 1680.7414,
        totalValue: 4278235.68,
        totalValueQOQ: 0,
        totalValueYOY: Number((Math.random() * 200 - 100).toFixed(2)),
        unitArea: 0.46,
      });
    });
  },
});
