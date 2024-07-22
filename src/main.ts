import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// eslint-disable-next-line import/extensions
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import hljs from 'highlight.js';
// 按需引入语言包
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';

import Vue3ColorPicker from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

// import * as Icons from '@ant-design/icons-vue';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import globalComponents from '@/components';
import useDict from '@/utils/dict';
import store from './store';
import router from './router';
import i18n from './locale';
import directive from './directive';
// import './mock';
import App from './App.vue';
// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/assets/style/global.less';
import '@/assets/style/dark.less';
import '@/utils/request';
import 'ant-design-vue/dist/reset.css';

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
VueMarkdownEditor.use(createEmojiPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());
VueMarkdownEditor.use(createTodoListPlugin());
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);

// const route = async () => {
//   const { data } = await listRoute();
//   const newRoute = data.find((el) => el.path === '/smart-maintenance');
//   localStorage.setItem('newRoute', JSON.stringify(newRoute));
// };

const baseSize = 16;
function setRem() {
  const scale = (document.documentElement.clientWidth - 266) / (1920 - 266);
  document.documentElement.style.fontSize = `${baseSize * scale}px`;
}
setRem();
window.onresize = () => {
  setRem();
};

const app = createApp(App);

// 全局方法挂载
app.config.globalProperties.useDict = useDict;
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);
app.use(VueMarkdownEditor);
app.use(VMdPreview);
app.use(Vue3ColorPicker);
app.mount('#app');
