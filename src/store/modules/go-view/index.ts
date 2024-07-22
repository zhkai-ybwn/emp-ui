import { defineStore } from 'pinia';

const useGoviewStore = defineStore('iframeSrc', {
  state: () => ({ iframeSrc: '' }),

  actions: {
    setIframeSrc(key: string) {
      this.iframeSrc = key;
    },
  },
});
export default useGoviewStore;
