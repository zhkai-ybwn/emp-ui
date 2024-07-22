<template>
  <div ref="echartRef" class="chart-conatiner"> </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import * as echarts from 'echarts';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const dataList = computed(() => props.data);

  const dataSource = dataList.value;

  const img2 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMiSURBVHgBjVRBTxNBFH5vZlugLVDk5I0fIKaEHyDGkz+Bi+IvwIMxhJh0m5hwrWcP4MGziScTD5B4J4T4A+BoRGmhddvtzDzfm5ltkaTETTu7mX3ve9/3vTeLcMfVONyvq9JcExHqNqfWyePNs7vicdqL9W8ft52h1HX6dRoZ0MsLgEmSHj/abP03WOPr/gbqpEn9wYa9uAKwjkKkQrVYAXWveoYEreMnzw6mgjU+saQaNl1uX9qLLlCWS/4kkuKitWcJczMHQCz96Yuzf8DWv+xvG2NTusrq9vIasMDA28QDSeeAdG0W9dI8QClJGdBLx7XP7w9NjyX9ZhCJUvxDRCIKtZARiJCBKeJJBSJHSLynanNQXl44J6vXEpvlG4Pzn6BnNGlGkWDHq0QCCg4/oGTfsKXYMISjHx3AUrJSWqosJmCYjZU/0/cEPBUMBLwuT0mg4wZJQfLsnCzSJIQBQAICxJvgJFT5SIIokUHlLk+OhQe2gS/HI0ijrTC0nrBnJpvCzkUtQUpIpsJ2zwVjGa9TLCAnZIwwG0BC1oKzlpSV96rosdfpGY79CjBjcC+TY5yXCZAVzISqFS42AMWmSUcxGi6NmECGXfIyeRHP2LTQAOfQMY7yzAhvNi4gu/GUEYYSnrmLI+I9K0kDWKZxIVVzhJrogKjQ215oiy6IVcLWGt4woVjC5oHNrW83tyweIQ9KUBgdJFMwnudQesEp3i7D9cYNYIpmREKZzwiB0gIoYGHibhwjdAJs/dkQW5BFMRg/CzOeM87FD/fuL7EtCkZDBya3zNSRlfvIkDWczQXdiP+swDIL4+OYmUFYWK5BaUYfUc90vVWre+kW+9rsd7OVP9eZaADF3imZNRUPaBhHHiMZScTK/CzU6pWO0qp1uttqT1oWr4etN6kxrtnrZjDMhgxI8XzLsMuEIiblEszXq1Au63eK+IuRpp3xnMOtq5HurPCkpHlun1/+6rPJLp5tlrQ4B9Xa7JFFbH1P3x7dzp362V7d3dlivc1eL2dwglq13NFKt0739trTcqaCFdeD169SplVPhqP0pN3u3BX7FxuZAte8XB8jAAAAAElFTkSuQmCC';
  const img1 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMHSURBVHgBfZQ7bxNBEMdn9nyPQJSYJqRKLnRYCJkKRMVHCNDzEBVVKoTozgVQgGSnjlDIJ8EdVRSQiJBCYxdxQVA4lCL33GF29s52IM7KvufOb/7/mbERLljNbWomTt4lhDYW5f3k6dzgov0464W/k22oIov84fcmFDmkYQu0d7mHVGzOgv4HC7bye9Sgrj86aDMIIC9INiJgunodkpXWADV0kmfex5kwsQR514l/PvGH++DER/xU8ZeqbcIEHVyCdLUF2dW1Lypl688nKgXmb7OlLI284X7TPTywj8nKkTXmUX2mYnmNld5g+HwPM7bOUPS3sj139K3tDfZBFSXvQ0LFFAmUE9efHwJWdvna3ILmg6aMgXnYHs457i2Fpydt78dngCzlfGa/Rl2WhsEgzSpKNGfS1bWurw2e0BvsonM8CpMSFhuSWl7oSoxYRCqnDCLYj9FoM6JkA44BiZN6NECSmIMWEGnRJASqq0aWb1SbTda62DTYmswwczQwIx8nDdaswIwDVbUbN0FbrRJuZKJRRpUyqiJFXd1kZYtec7SedNjKFKcAXEMobYIaJjUzskUltwtLK3gSaEqBiNMTxZYtxVYlEZgJKFCUWmUWWscYjVVqqmqHNhWb1aIOqgCrzEilquSkJm7JltbOGZzJQEJgEBYwhtlduW2QYBTYS8UUXTfTDq8MCYy7CFDwu8JwbQNkFFTKN1wnbRQ6/NjhKGVG76xfAXOAMiNSqcLcdlxkuIs7+c0NIP4Bg0rlS5Dx64wTFqbLVClgPTmrzRjK+5D3zV2CovUIaD7sBzn8kWze+3Sdy9p1fu2F6rAPmJxwoxxW6jBI2XqjscbKVUngeaiXb0O5dCeGht9JXwS9Wv94Be/SiJJ4ozH61FRHXxmmpCFY23N4fBZWoFx7AOhe2fQTN4ojjKeLcWYFb09DTh9BHj9uHHxglbHtrt9kyEOghWt9Lm8neeX2/42d+bftvSnWEXXXOd4NKf0NeuluDG7QSV9aS+etmbCx0tdpJOfc601bOm/9BZs87A2L/AoxAAAAAElFTkSuQmCC';

  const colorList = [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(36, 145, 200, 0.40)',
        },
        {
          offset: 1,
          color: '#00C2FF',
        },
      ],
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(36, 145, 200, 0.40)',
        },
        {
          offset: 1,
          color: '#00C2FF',
        },
      ],
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(36, 145, 200, 0.40)',
        },
        {
          offset: 1,
          color: '#00C2FF',
        },
      ],
    },

    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(50, 199, 163, 0.40)',
        },
        {
          offset: 1,
          color: '#35FFCF',
        },
      ],
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(50, 199, 163, 0.40)',
        },
        {
          offset: 1,
          color: '#35FFCF',
        },
      ],
    },
  ];

  const getSeries = () => {
    const series = [
      {
        z: 1,
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: 4,
        data: Object.values(dataSource),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(208, 222, 238, 0.1)',
        },
        silent: true,
        itemStyle: {
          emphasis: {
            // barBorderRadius: [0, 20, 20, 0],
          },
          normal: {
            color: (params) => {
              return colorList[params.dataIndex];
            },
          },
        },
      },
      // 进度条的小圆圈
      {
        name: '小圈圈',
        type: 'scatter',
        emphasis: {
          scale: false,
        },
        symbolSize: [8, 8],
        itemStyle: {
          color: '#FFF',
          shadowColor: 'rgba(255, 255, 255, 1)',
          shadowBlur: 5,
          borderWidth: 1,
          opacity: 1,
        },
        z: 2,
        zlevel: 10,
        data: Object.values(dataSource),
        animationDelay: 500,
      },
    ];
    return series;
  };
  const getOptions = () => ({
    grid: [
      {
        left: 0,
        top: 20,
        right: 20,
        bottom: 30,
        containLabel: true,
      },
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'value',
        axisLabel: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
      },
      {
        gridIndex: 0,
        type: 'value',
        max: 100,
        axisLabel: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'category',
        inverse: true,
        position: 'left',
        data: Object.keys(dataSource),
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          width: 80,
          padding: [0, 0, 55, -20],
          align: 'left',
          formatter: (_, index) => {
            const id = index + 1;
            return `{icon${id}|${id}}`;
          },
          rich: {
            icon1: {
              width: 20,
              height: 20,
              align: 'center',
              borderRadius: 50,
              backgroundColor: {
                image: img1,
              },
              color: '#FFF',
              fontWeight: 400,
              fontFamily: 'PangMenZhengDaoBiaoTiTi',
              fontSize: 14,
            },
            icon2: {
              width: 20,
              height: 20,
              align: 'center',
              borderRadius: 50,
              backgroundColor: {
                image: img1,
              },
              color: '#FFF',
              fontWeight: 400,
              fontFamily: 'PangMenZhengDaoBiaoTiTi',
              fontSize: 14,
            },
            icon3: {
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius: 50,
              align: 'center',
              backgroundColor: {
                image: img1,
              },
              color: '#FFF',
              fontWeight: 400,
              fontFamily: 'PangMenZhengDaoBiaoTiTi',
              fontSize: 14,
            },
            icon4: {
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius: 50,
              align: 'center',
              backgroundColor: {
                image: img2,
              },
              color: '#FFF',
              fontWeight: 400,
              fontFamily: 'PangMenZhengDaoBiaoTiTi',
              fontSize: 14,
            },
            icon5: {
              width: 20,
              height: 20,
              borderWidth: 1,
              borderRadius: 50,
              align: 'center',
              backgroundColor: {
                image: img2,
              },
              color: '#FFF',
              fontWeight: 400,
              fontFamily: 'PangMenZhengDaoBiaoTiTi',
              fontSize: 14,
            },
          },
        },
      },
      {
        gridIndex: 0,
        type: 'category',
        inverse: true,
        data: Object.keys(dataSource),
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        position: 'left',
        axisLabel: {
          inside: true,
          width: 80,
          padding: [0, 0, 50, 20],
          // align: 'left',
          formatter: (name) => {
            return `{value|${name}}`;
          },
          rich: {
            value: {
              color: '#F2F6FA',
              fontSize: 14,
              fontWeight: 400,
              fontFamily: 'HarmonyOS-Regular',
            },
          },
        },
      },
      {
        gridIndex: 0,
        type: 'category',
        position: 'right',
        inverse: true,
        margin: 0,
        data: Object.values(dataSource),
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          inside: true,
          // align: 'right',
          padding: [0, 5, 50, 0],
          formatter: (value, index) => {
            if (index < 3) return `{value|${value}}{unit|kWh}`;
            return `{value2|${value}}{unit|kWh}`;
          },
          rich: {
            value: {
              color: '#FFF',
              fontSize: 18,
              fontWeight: 500,
              fontFamily: 'Barlow-Italic',
            },
            value2: {
              color: 'rgba(255, 255, 255, 0.40)',
              fontSize: 18,
              fontWeight: 500,
              fontFamily: 'Barlow-Italic',
            },
            unit: {
              color: '#C6D1DB',
              fontSize: 10,
              fontWeight: 400,
              fontFamily: 'Barlow-Italic',
              padding: [4, 0, 0, 0],
            },
          },
        },
      },
    ],
    series: getSeries(),
  });
  const { echartRef, renderChart } = useEchart(getOptions, {
    isWatch: true,
    watchData: dataList,
  });
  const handleResize = () => {
    const chart = echarts.getInstanceByDom(echartRef.value);
    if (chart) {
      chart.resize();
    }
  };

  let resizeObserver;
  const selfResize = () => {
    nextTick(() => {
      const chart = echarts.getInstanceByDom(echartRef.value);
      if (chart) {
        resizeObserver = new ResizeObserver(() => {
          chart.resize();
        });
        resizeObserver.observe(echartRef.value?.parentElement);
      }
    });
  };

  onMounted(() => {
    renderChart(true, true);
    window.addEventListener('resize', handleResize);
    selfResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    resizeObserver?.disconnect();
  });
</script>

<style scoped lang="less">
  .chart-conatiner {
    width: 100%;
    height: 100%;
  }
</style>
