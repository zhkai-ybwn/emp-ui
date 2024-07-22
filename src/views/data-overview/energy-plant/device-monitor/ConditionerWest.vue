<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-18 09:15:10
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 11:12:50
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\ConditionerWest.vue
 * @Description: 综合楼西区模型
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="conditioner-west-container">
    <div class="floor">
      <div
        v-for="(item, index) in state.floors"
        :key="index"
        :class="['model', item.status ? 'on' : 'off']"
        :style="{ top: `${item.position[0]}px`, left: `${item.position[1]}px` }"
      >
      </div>
    </div>
    <div class="text">
      <div class="on">
        <div class="sign"></div>
        <div class="label">运行中</div>
        <div class="value">{{ state.onNum || '-' }}<span>台</span></div>
      </div>
      <div class="off">
        <div class="sign"></div>
        <div class="label">关机</div>
        <div class="value">{{ state.offNum || '-' }}<span>台</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { useStore } from '@/store';
  import { onOffDetails } from '@/api/data-overview/device-monitor';

  const region = computed(() => useStore().region);
  const floor = computed(() => useStore().floor);
  const { looping } = useEchart();

  const state = reactive({
    position1: {
      '001': [384, 237],
      '002': [384, 311],
      '003': [384, 385],
      '004': [384, 459],
      '005': [384, 588],
      '006': [343, 558],
      '007': [343, 489],
      '008': [343, 415],
      '009': [343, 341],
      '010': [343, 263],
      '011': [298, 293],
      '012': [298, 370],
      '013': [298, 439],
      '014': [298, 516],
      '015': [311, 588],
      '016': [277, 1001],
      '017': [277, 964],
      '018': [264, 924],
      '019': [293, 924],
      '020': [326, 965],
      '021': [324, 1001],
      '022': [362, 983],
      '023': [362, 946],
      '024': [362, 909],
      '025': [377, 852],
      '026': [377, 815],
      '027': [377, 768],
      '028': [340, 768],
      '029': [338, 736],
      '030': [376, 727],
      '031': [404, 727],
      '032': [396, 674],
      '033': [356, 674],
      '034': [316, 652],
      '035': [105, 474],
      '036': [105, 529],
      '037': [105, 581],
      '038': [174, 424],
      '039': [174, 480],
      '040': [174, 529],
      '041': [174, 581],
      '042': [174, 633],
      '043': [105, 685],
      '044': [140, 633],
      '045': [105, 633],
      '046': [56, 644],
      '047': [63, 798],
      '048': [132, 727],
      '049': [112, 390],
      '050': [139, 370],
      '051': [167, 356],
      '052': [198, 340],
      '053': [234, 321],
      '054': [211, 430],
      '055': [211, 480],
      '056': [211, 532],
      '057': [248, 529],
      '058': [248, 477],
      '059': [248, 427],
      '060': [248, 371],
      '061': [326, 928],
      '062': [326, 894],
      '063': [317, 860],
      '064': [317, 828],
      '065': [317, 792],
      '066': [297, 764],
      '067': [297, 730],
      '068': [297, 696],
      '069': [63, 507],
      '070': [63, 581],
      '163': [363, 1053],
      '164': [363, 1103],
      '165': [396, 1103],
      '166': [396, 1144],
      '167': [362, 1144],
      '168': [376, 1184],
      '169': [376, 1223],
      '170': [376, 1264],
      '171': [324, 1144],
      '172': [324, 1108],
      '173': [266, 1083],
      '174': [293, 1083],
      '175': [324, 1075],
      '176': [324, 1038],
      '177': [363, 1018],
      '178': [396, 1018],
      '179': [396, 1053],
    },
    floors: [],
    position2: {
      '071': [218, 505],
      '072': [218, 563],
      '073': [250, 555],
      '074': [250, 482],
      '075': [250, 405],
      '076': [250, 331],
      '077': [140, 699],
      '078': [140, 647],
      '079': [140, 566],
      '080': [140, 493],
      '081': [135, 424],
      '082': [162, 409],
      '083': [189, 390],
      '084': [218, 364],
      '085': [218, 437],
      '086': [325, 328],
      '087': [325, 401],
      '088': [325, 485],
      '089': [365, 536],
      '090': [365, 584],
      '091': [334, 536],
      '092': [334, 584],
      '093': [405, 226],
      '094': [405, 294],
      '095': [405, 368],
      '096': [405, 446],
      '097': [362, 467],
      '098': [362, 382],
      '099': [362, 316],
      '100': [362, 244],
      '101': [325, 268],
      '102': [405, 784],
      '103': [378, 784],
      '104': [351, 784],
      '105': [369, 737],
      '106': [396, 737],
      '107': [396, 683],
      '108': [369, 683],
      '109': [396, 629],
      '110': [369, 629],
      '111': [343, 737],
      '112': [410, 953],
      '113': [343, 683],
      '114': [343, 629],
      '115': [381, 953],
      '116': [355, 953],
      '117': [326, 953],
      '118': [358, 910],
      '119': [396, 910],
      '120': [358, 867],
      '121': [396, 867],
      '122': [390, 828],
      '123': [178, 632],
      '219': [405, 1281],
      '220': [360, 1259],
      '221': [322, 1249],
      '249': [410, 1083],
      'num1': [68, 417],
      'num2': [94, 402],
      'num3': [120, 388],
      'num4': [55, 485],
      'num5': [81, 470],
      'num6': [107, 456],
      'num7': [53, 544],
      'num8': [102, 532],
      'num9': [53, 584],
      'num10': [102, 572],
      'num11': [53, 625],
      'num12': [102, 613],
      'num13': [72, 699],
      'num14': [101, 684],
      'num15': [53, 784],
      'num16': [119, 728],
      'num17': [53, 825],
      'num18': [119, 769],
      'num19': [251, 604],
      'num20': [263, 1103],
      'num21': [287, 985],
      'num22': [327, 991],
      'num23': [362, 991],
      'num24': [397, 991],
      'num25': [327, 1028],
      'num26': [362, 1028],
      'num27': [397, 1028],
      'num28': [327, 1065],
      'num29': [362, 1065],
      'num30': [397, 1061],
      'num31': [327, 1102],
      'num32': [362, 1105],
      'num33': [397, 1115],
      'num34': [327, 1139],
      'num35': [362, 1142],
      'num36': [397, 1152],
      'num37': [327, 1176],
      'num38': [362, 1179],
      'num39': [397, 1189],
      'num40': [327, 1213],
      'num41': [362, 1216],
      'num42': [397, 1226],
    },
    position3: {
      124: [372, 837],
      125: [319, 837],
      126: [319, 806],
      127: [349, 806],
      128: [349, 770],
      129: [319, 770],
      130: [349, 735],
      131: [349, 700],
      132: [319, 735],
      133: [319, 700],
      134: [300, 973],
      135: [340, 976],
      136: [332, 944],
      137: [383, 976],
      138: [368, 944],
      139: [348, 910],
      140: [319, 910],
      141: [319, 875],
      142: [372, 875],
      143: [326, 345],
      144: [326, 423],
      145: [326, 504],
      146: [326, 593],
      147: [326, 653],
      148: [366, 634],
      149: [366, 572],
      150: [366, 484],
      151: [366, 403],
      152: [366, 325],
      153: [404, 216],
      154: [364, 233],
      155: [327, 252],
      156: [275, 281],
      157: [286, 623],
      250: [291, 1227],
      251: [312, 1207],
      252: [310, 1174],
      253: [270, 1194],
      254: [270, 1157],
      255: [300, 1139],
      256: [342, 1147],
      257: [376, 1156],
      258: [379, 1114],
      269: [403, 1279],
      270: [403, 1218],
      271: [374, 1203],
      272: [374, 1260],
      num1: [302, 1009],
      num2: [342, 1009],
      num3: [382, 1009],
      num4: [302, 1043],
      num5: [342, 1043],
      num6: [382, 1043],
      num7: [302, 1074],
      num8: [342, 1074],
      num9: [382, 1074],
      num10: [302, 1105],
      num11: [342, 1105],
    },
    offNum: 0,
    onNum: 0,
  });

  const formatRegionFloor = (s) => {
    const regionFloorMap = {
      west_f1: '13,20,25,30',
      west_f2: '13,20,25,31',
      west_f3: '13,20,25,32',
      east_f1: '13,20,24,27',
      east_f2: '13,20,24,28',
      east_f3: '13,20,24,29',
    };
    return regionFloorMap[s] || '';
  };

  const getParam = () => {
    const regionStr = region.value === 0 ? 'east' : 'west';
    return formatRegionFloor(`${regionStr}_f${floor.value}`);
  };

  const fetchData = async () => {
    state.floors = [];
    const formData = new FormData();
    formData.append('location', getParam());
    try {
      const { data } = await onOffDetails(formData);
      const positions = {
        1: state.position1,
        2: state.position2,
        3: state.position3,
      };
      const { onNum, offNum, on_OffDetails } = data;
      state.offNum = offNum;
      state.onNum = onNum;

      Object.entries(positions[floor.value]).forEach(([key, value]) => {
        state.floors.push({
          id: key,
          status: on_OffDetails[key],
          position: value,
        });
      });
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  watch(floor, (newValue1, oldValue1) => {
    if (newValue1 !== oldValue1) fetchData();
  });

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .conditioner-west-container {
    position: relative;
    width: 1388px;
    height: 516px;

    .set-back('@/assets/imgs/energy-plant/west_model.png');

    .floor {
      position: relative;

      .model {
        position: absolute;
        width: 27px;
        height: 27px;
      }

      .on {
        .set-back('@/assets/imgs/energy-plant/east-on@2x.png');
      }

      .off {
        .set-back('@/assets/imgs/energy-plant/east-off@2x.png');
      }
    }

    .text {
      position: absolute;
      top: 530px;
      display: flex;
      justify-content: center;
      width: 100%;

      .label {
        margin-left: 8px;
        color: #fff;
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
      }

      .on {
        display: flex;
        align-items: center;

        .sign {
          width: 10px;
          height: 10px;
          background: linear-gradient(133deg, #328fff 0%, #4a90e4 100%);
          border: 1px solid rgb(255 255 255 / 20%);
          border-radius: 0;
        }

        .value {
          margin-left: 8px;
          color: #4398ff;
          font-weight: 600;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          font-style: italic;
          line-height: normal;

          span {
            color: #fff;
            font-weight: 350;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }
      }

      .off {
        display: flex;
        align-items: center;

        .sign {
          width: 10px;
          height: 10px;
          margin-left: 48px;
          background: #e4ba28;
          border: 1px solid #ffce21;
          border-radius: 0;
        }

        .value {
          margin-left: 8px;
          color: #ffce21;
          font-weight: 600;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          font-style: italic;
          line-height: normal;

          span {
            color: #fff;
            font-weight: 350;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }
      }
    }
  }
</style>
