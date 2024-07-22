import { computed } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export default function useDeviceInfo() {
  const currentDeviceInfo = computed(() => {
    return localStorage.getItem('device-id');
  });
  const changeDeviceInfo = (value: RouteRecordRaw) => {
    if (value && value.meta && value.meta.deviceId) {
      localStorage.setItem('device-id', value.meta.deviceId as string);
    }
  };

  return {
    currentDeviceInfo,
    changeDeviceInfo,
  };
}
