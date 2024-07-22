import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useDictStore from './modules/dict';
import useTabBarStore from './modules/tab-bar';
import useNavStore from './modules/nav';
import useStore from './modules/data-overview';
import useGoviewStore from './modules/go-view';

const pinia = createPinia();

export {
  useAppStore,
  useUserStore,
  useDictStore,
  useTabBarStore,
  useNavStore,
  useStore,
  useGoviewStore,
};
export default pinia;
