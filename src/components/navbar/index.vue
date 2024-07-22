<template>
  <div :class="light === '5' ? 'light-bar' : 'navbar'">
    <div class="left-side">
      <a-space>
        <img alt="logo" :src="getFile(appStore.getLogo)" height="32" />
        <!-- <img alt="logo" src="@/assets/images/login/logo.png" height="32" /> -->
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          {{ appStore.getTitle }}
        </a-typography-title>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <!-- <Menu v-if="topMenu" /> -->
      <div style="top: 60.3px !important">
        <a-dropdown trigger="click" content-class="nav-drop">
          <div
            v-if="getID() === '1002' || getID() === '1001'"
            class="overview"
            :class="
              nav === '0'
                ? light === '5'
                  ? 'light-active'
                  : 'active'
                : 'normal'
            "
          >
            数据总览
          </div>
          <template #content>
            <a-doption
              v-if="getID() === '1002'"
              :class="getName() === 'Home' ? 'active-item' : ''"
            >
              <div @click="setNav('1')">首页大屏</div>
            </a-doption>
            <a-doption
              v-if="getID() === '1001'"
              :class="getName() === 'MetroHome' ? 'active-item' : ''"
            >
              <div @click="setNav('5')">地铁首页</div>
            </a-doption>
            <a-doption
              v-if="getID() === '1002'"
              :class="getName() === 'PlantMonitor' ? 'active-item' : ''"
            >
              <div @click="setNav('2')">能源分析</div>
            </a-doption>
            <a-doption
              v-if="getID() === '1002'"
              :class="getName() === 'DeviceMonitor' ? 'active-item' : ''"
            >
              <div @click="setNav('3')">设备监控</div>
            </a-doption>
            <a-doption
              v-if="getID() === '1002'"
              :class="getName() === 'PvPower' ? 'active-item' : ''"
            >
              <div @click="setNav('4')">光伏发电</div>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
      <div
        class="workbench"
        :class="nav === '1' ? 'active' : 'normal'"
        @click="setNav('0')"
        >工作台</div
      >
    </div>
    <ul class="right-side">
      <li>
        <DateTime />
      </li>
      <li>
        <WeatherInfo v-if="false" />
      </li>
      <li v-if="false">
        <a-tooltip :content="$t('settings.search')">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-search />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li v-if="false">
        <a-tooltip :content="$t('settings.language')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale as any">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li v-if="false">
        <a-tooltip
          :content="
            theme === 'light'
              ? $t('settings.navbar.theme.toDark')
              : $t('settings.navbar.theme.toLight')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="handleToggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li v-if="false">
        <a-tooltip :content="$t('settings.navbar.alerts')">
          <div class="message-box-trigger">
            <a-badge :count="unReadMessageCount" dot>
              <a-button
                class="nav-btn"
                type="outline"
                :shape="'circle'"
                @click="setPopoverVisible"
              >
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <li>
        <a-tooltip
          :content="
            isFullscreen
              ? $t('settings.navbar.screen.toExit')
              : $t('settings.navbar.screen.toFull')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li v-if="false">
        <a-tooltip :content="$t('settings.title')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li v-if="false">
        <a-tooltip :content="$t('settings.doc')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            href="https://doc.charles7c.top"
            target="_blank"
          >
            <icon-book />
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img
              alt="avatar"
              :src="getAvatar(userStore.avatar, userStore.gender)"
            />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: 'UserCenter' })">
                <!-- <icon-settings /> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7.00016 5.24984C8.12774 5.24984 9.04183 4.33575 9.04183 3.20817C9.04183 2.08059 8.12774 1.1665 7.00016 1.1665C5.87258 1.1665 4.9585 2.08059 4.9585 3.20817C4.9585 4.33575 5.87258 5.24984 7.00016 5.24984Z"
                    stroke="#BCC4D0"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.1665 11.9582C1.1665 9.38083 3.51702 7.2915 6.4165 7.2915"
                    stroke="#BCC4D0"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.04167 12.2498L11.9583 9.33317L10.7917 8.1665L7.875 11.0832V12.2498H9.04167Z"
                    stroke="#BCC4D0"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>
                  {{ $t('messageBox.userCenter') }}
                </span>
              </a-space>
            </a-doption>
            <a-doption v-if="name === 'super_admin'">
              <a-space @click="change">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  color="inherit"
                >
                  <path
                    d="M6.66659 3.33333H1.99992C1.63173 3.33333 1.33325 3.63179 1.33325 3.99999V12.6667C1.33325 13.0349 1.63173 13.3333 1.99992 13.3333H13.9999C14.3681 13.3333 14.6666 13.0349 14.6666 12.6667V11.8333"
                    stroke="#BCC4D0"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.33325 7.66667H5.99992"
                    stroke="#BCC4D0"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                  />
                  <path
                    d="M3.33325 10.3333H11.3333"
                    stroke="#BCC4D0"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11.3333 7.33333C12.4378 7.33333 13.3333 6.4379 13.3333 5.33333C13.3333 4.22876 12.4378 3.33333 11.3333 3.33333C10.2287 3.33333 9.33325 4.22876 9.33325 5.33333C9.33325 6.4379 10.2287 7.33333 11.3333 7.33333Z"
                    stroke="#BCC4D0"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.6667 9.47289C14.0157 8.20076 12.6667 7.33333 11.3334 7.33333C10 7.33333 9.33578 7.71096 8.65015 8.33333"
                    stroke="#BCC4D0"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span> 切换项目 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t('messageBox.logout') }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
    <a-drawer
      :width="340"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title> 切换项目</template>
      <div class="title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6.66659 3.33333H1.99992C1.63173 3.33333 1.33325 3.63179 1.33325 3.99999V12.6667C1.33325 13.0349 1.63173 13.3333 1.99992 13.3333H13.9999C14.3681 13.3333 14.6666 13.0349 14.6666 12.6667V11.8333"
            stroke="#BCC4D0"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.33325 7.66667H5.99992"
            stroke="#BCC4D0"
            stroke-width="1.33333"
            stroke-linecap="round"
          />
          <path
            d="M3.33325 10.3333H11.3333"
            stroke="#BCC4D0"
            stroke-width="1.33333"
            stroke-linecap="round"
          />
          <path
            d="M11.3333 7.33333C12.4378 7.33333 13.3333 6.4379 13.3333 5.33333C13.3333 4.22876 12.4378 3.33333 11.3333 3.33333C10.2287 3.33333 9.33325 4.22876 9.33325 5.33333C9.33325 6.4379 10.2287 7.33333 11.3333 7.33333Z"
            stroke="#BCC4D0"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.6667 9.47289C14.0157 8.20076 12.6667 7.33333 11.3334 7.33333C10 7.33333 9.33578 7.71096 8.65015 8.33333"
            stroke="#BCC4D0"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>选择项目</span>
      </div>
      <a-tree
        block-node
        :data="data.treeData"
        class="tree"
        :selected-keys="data.node"
        :field-names="{
          key: 'tenantId',
          title: 'tenantName',
        }"
        @select="onSelect"
      />
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { useDark, useToggle, useFullscreen } from '@vueuse/core';
  import { useAppStore, useUserStore, useNavStore } from '@/store';
  import { countUnread } from '@/api/system/message';
  import { LOCALE_OPTIONS } from '@/locale';
  import useLocale from '@/hooks/locale';
  import useUser from '@/hooks/user';
  // import Menu from '@/components/menu/index.vue';
  import getAvatar from '@/utils/avatar';
  import getFile from '@/utils/file';
  import { useRouter, useRoute } from 'vue-router';
  import { TreeNodeData } from '@arco-design/web-vue';
  import { encryptByRsa } from '@/utils/encrypt';
  import { tenantList } from '@/api/auth';
  import MessageBox from '../message-box/index.vue';
  import DateTime from './DateTime.vue';
  import WeatherInfo from './WeatherInfo.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const navStore = useNavStore();
  const { logout } = useUser();
  const { changeLocale, currentLocale } = useLocale();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
  const locales = [...LOCALE_OPTIONS];
  const theme = computed(() => {
    return appStore.theme;
  });
  const nav = computed(() => {
    return navStore.nav;
  });
  const light = computed(() => {
    return navStore.light;
  });
  const topMenu = computed(() => appStore.topMenu && appStore.menu);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);
  const unReadMessageCount = ref(0);
  const visible = ref(false);
  const name = localStorage.getItem('name');

  const getID = () => {
    return localStorage.getItem('TENANT_ID');
  };

  const data = reactive({
    node: [] as Array<string | number>,
    treeData: [] as TreeNodeData[],
  });

  /**
   * 查询未读消息总数
   */
  async function getUnreadCount() {
    const res = await countUnread(false);
    unReadMessageCount.value = res.data.total;
  }
  getUnreadCount();
  // setTimer(setInterval(getUnreadCount, 100000000000));

  const handleToggleTheme = () => {
    toggleTheme();
  };
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true });
  };
  const refBtn = ref();
  const triggerBtn = ref();
  const setPopoverVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    refBtn.value.dispatchEvent(event);
  };
  const handleLogout = () => {
    logout();
  };
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };
  const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;

  const router = useRouter();

  const route = useRoute();

  const getName = () => {
    return route.name;
  };

  const setNav = (key: string) => {
    if (key === '0' && nav.value === '1') return;
    switch (key) {
      case '0':
        navStore.setNav('1');
        navStore.setLight('0');
        router.push({ name: 'EnergyMonitor' });
        break;
      case '1':
        navStore.setNav('0');
        navStore.setLight('1');
        router.push({ name: 'Home' });
        break;
      case '2':
        navStore.setNav('0');
        navStore.setLight('2');
        router.push({ name: 'PlantMonitor' });
        break;
      case '3':
        navStore.setNav('0');
        navStore.setLight('3');
        router.push({ name: 'DeviceMonitor' });
        break;
      case '4':
        navStore.setNav('0');
        navStore.setLight('4');
        router.push({ name: 'PvPower' });
        break;
      case '5':
        navStore.setNav('0');
        navStore.setLight('5');
        router.push({ name: 'MetroHome' });
        break;
      default:
        break;
    }
  };

  const handleOk = () => {
    visible.value = false;
    // 获取当前 URL 的查询字符串部分
    const searchParams = new URLSearchParams(window.location.search);

    // 修改查询参数
    searchParams.set('TENANT_ID', `${data.node}`);

    // 使用 pushState 更新 URL
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`
    );

    if (localStorage.getItem('TENANT_ID') === `${data.node}`) {
      return;
    }
    localStorage.setItem('TENANT_ID', `${data.node}`);
    userStore
      .accountLogin({
        username: 'super_admin',
        // @ts-ignore
        password: encryptByRsa('admin123'),
      })
      .then(() => {
        if (window.location.pathname === '/integrated-monitor/energy-monitor') {
          window.location.reload();
        } else {
          router.push({ name: 'EnergyMonitor' }).then(() => {
            router.go(0);
          });
        }
      });
  };
  const handleCancel = () => {
    visible.value = false;
  };
  // 切换项目
  const onSelect = (
    selectedKeys: Array<string | number>,
    info: {
      selected?: boolean;
      selectedNodes: TreeNodeData[];
      node?: TreeNodeData;
      e?: Event;
    }
  ) => {
    if (info && info.node && info.node.isLeaf) {
      data.node = selectedKeys;
    }
    data.node = selectedKeys;
  };

  const tenant = () => {
    tenantList().then((res) => {
      data.treeData = res.data;
      data.node = [Number(localStorage.getItem('TENANT_ID'))];
    });
  };

  // 切换项目
  const change = () => {
    // @ts-ignore
    tenant();
    visible.value = true;
  };
</script>

<style scoped lang="less">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: #1b1f29;
    border-bottom: 0.26px solid #383f61;
  }

  .light-bar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(17, 24, 41, 0.4) 0%,
      rgba(38, 54, 92, 0.26) 50%,
      rgba(17, 24, 41, 0.4) 100%
    );
  }

  .light-active {
    position: relative;
    color: #03a7ff;

    &::after {
      position: absolute;
      bottom: -9px;
      left: calc(50% - 16px);
      display: block;
      width: 32px;
      height: 5px;
      background: #03a7ff;
      border-radius: 10px 10px 0 0;
      content: '';
    }
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .center-side {
    position: absolute;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 16px;
    color: #bcc4d0;
    font-weight: 400;
    font-size: 20px;
    font-family: YouSheBiaoTiHei, sans-serif;
    font-style: normal;
    line-height: normal;

    .overview {
      position: relative;

      .view {
        position: absolute;
        top: 50px;
        display: flex;
        width: 1000px;
        margin-left: -8px;
        color: #bcc4d0;
        font-weight: 400;
        font-size: 16px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: normal;

        div {
          margin-right: 24px;
          padding: 4px 8px;

          &:hover {
            background: #2c3645;
            border-radius: 4px;
          }
        }
      }
    }

    .overview,
    .workbench {
      margin: 0 20px;
      padding: 4px 8px;
      cursor: pointer;

      &:hover {
        background: rgb(44 54 69);
        border-radius: 4px;
      }
    }

    .active {
      position: relative;
      color: #266fe8;

      &::after {
        position: absolute;
        bottom: -9px;
        left: calc(50% - 16px);
        display: block;
        width: 32px;
        height: 5px;
        background: #266fe8;
        border-radius: 10px 10px 0 0;
        content: '';
      }
    }
  }

  .right-side {
    display: flex;
    margin: 0;
    list-style: none;

    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .nav-btn {
      color: rgb(var(--gray-8));
      font-size: 16px;
      border-color: #232a35;
    }

    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }

    .trigger-btn {
      margin-left: 14px;
    }
  }

  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }

  :deep(.arco-typography) {
    font-weight: 400;
    font-size: 28px !important;
    font-family: YouSheBiaoTiHei, sans-serif;
    font-style: normal;
    line-height: 142.2%;

    /* 39.816px */
    letter-spacing: 1.12px;
    background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
    background-clip: text;
    /* stylelint-disable */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .arco-btn-outline:hover,
  .arco-btn-outline[type='button']:hover,
  .arco-btn-outline[type='submit']:hover {
    color: #bcc4d0;
    background-color: #4b5b76;
  }

  .arco-dropdown .arco-dropdown-option {
    height: 32px;
    padding: 5px 12px;
  }

  .title {
    padding: 0 32px 10px;
    // color: rgb(255 255 255 / 85%);
    font-weight: 400;
    font-size: 16px;
    font-family: HarmonyOS-Regular, sans-serif;
    line-height: 16px;

    span {
      margin-left: 5px;
      vertical-align: text-top;
    }
  }

  .tree {
    padding: 0 32px;

    :deep(.arco-tree-node-selected .arco-tree-node-title) {
      background: rgb(188 201 223 / 10%);
    }
  }

  .active-item {
    // width: 132px;
    // height: 32px;
    background: #266fe8;
    border-radius: 4px;
  }
</style>
