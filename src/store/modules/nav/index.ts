import { defineStore } from 'pinia';

const nav = window.localStorage.getItem('nav') || '1';
const light = window.localStorage.getItem('light') || '1';
const useNavStore = defineStore('nav', {
  state: () => ({ nav, light }), // 数据总览0，工作台1

  actions: {
    setNav(key: string) {
      this.nav = key;
      localStorage.setItem('nav', this.nav);
    },
    setLight(key: string) {
      this.light = key;
      localStorage.setItem('light', this.light);
    },
  },
});
export default useNavStore;
