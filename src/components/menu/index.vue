<script lang="tsx">
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
  import type { RouteMeta } from 'vue-router';
  import { useAppStore, useGoviewStore } from '@/store';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { openWindow, regexUrl } from '@/utils';
  import useDeviceInfo from '@/hooks/device-info';
  import { compile } from 'vue';
  import useMenuTree from './use-menu-tree';

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const { t } = useI18n();
      const appStore = useAppStore();
      const goViewStore = useGoviewStore();
      const router = useRouter();
      const route = useRoute();
      const { menuTree } = useMenuTree();
      const collapsed = computed({
        get() {
          if (appStore.device === 'desktop') return appStore.menuCollapse;
          return false;
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value });
        },
      });

      const topMenu = computed(() => appStore.topMenu);
      const openKeys = ref<string[]>([]);
      const selectedKey = ref<string[]>([]);

      const goto = (item: RouteRecordRaw) => {
        useDeviceInfo().changeDeviceInfo(item);
        // Open external link
        if (regexUrl.test(item.path)) {
          // openWindow(item.path);
          router.push({
            name: 'ProjectModel',
          });
          goViewStore.setIframeSrc(item.path);
          localStorage.setItem('iframeSrc', item.path);

          // @ts-ignore
          selectedKey.value = item.menuKey;
          return;
        }
        // Eliminate external link side effects
        const { hideInMenu, activeMenu } = item.meta as RouteMeta;

        if (route.name === item.name && !hideInMenu && !activeMenu) {
          selectedKey.value = [item.name as string];

          return;
        }

        // Trigger router change
        router.push({
          name: item.name,
        });
      };
      const getViewKey = (path: string | undefined) => {
        if (path) {
          const pathArr = path.split('/');
          const { length } = pathArr;
          return pathArr[length - 1];
        }
        return '';
      };
      const findMenuOpenKeys = (target: string) => {
        const result: string[] = [];
        let isFind = false;
        const backtrack = (item: RouteRecordRaw, keys: string[]) => {
          if (target === 'ProjectModel') {
            const modifiedKeys = keys.map((key) =>
              key === 'ProjectModel'
                ? `ProjectModel${getViewKey(item.path)}`
                : key
            );
            if (
              item.path ===
              (goViewStore.iframeSrc
                ? goViewStore.iframeSrc
                : localStorage.getItem('iframeSrc'))
            ) {
              isFind = true;
              result.push(...modifiedKeys);
              return;
            }
            if (item.children?.length) {
              item.children.forEach((el) => {
                backtrack(el, [...keys, el.name as string]);
              });
            }
          } else {
            if (item.name === target) {
              isFind = true;
              result.push(...keys);
              return;
            }
            if (item.children?.length) {
              item.children.forEach((el) => {
                backtrack(el, [...keys, el.name as string]);
              });
            }
          }
        };
        menuTree.value.forEach((el: RouteRecordRaw) => {
          if (isFind) return; // Performance optimization
          backtrack(el, [el.name as string]);
        });
        return result;
      };
      listenerRouteChange((newRoute) => {
        const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
        if (requiresAuth && (!hideInMenu || activeMenu)) {
          const menuOpenKeys = findMenuOpenKeys(
            (activeMenu || newRoute.name) as string
          );
          const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
          openKeys.value = [...keySet];
          selectedKey.value = [
            activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
          ];
        }
      }, true);
      const setCollapse = (val: boolean) => {
        if (appStore.device === 'desktop')
          appStore.updateSettings({ menuCollapse: val });
      };

      const renderSubMenu = () => {
        function travel(_route: RouteRecordRaw[], nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              // This is demo, modify nodes as needed
              const icon = element?.meta?.icon
                ? () =>
                    h(
                      compile(`<svg-icon icon-class="${element?.meta?.icon}"/>`)
                    )
                : null;
              const node =
                element?.children && element?.children.length !== 0 ? (
                  <a-sub-menu
                    // @ts-ignore
                    key={element?.menuKey}
                    v-slots={{
                      icon,
                      title: () => h(compile(t(element?.meta?.locale || ''))),
                    }}
                  >
                    {travel(element?.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    // @ts-ignore
                    key={element?.menuKey}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {t(element?.meta?.locale || '')}
                  </a-menu-item>
                );
              nodes.push(node as never);
            });
          }
          return nodes;
        }
        return travel(menuTree.value);
      };

      return () => (
        // @ts-ignore
        <a-menu
          mode={topMenu.value ? 'horizontal' : 'vertical'}
          v-model:collapsed={collapsed.value}
          v-model:open-keys={openKeys.value}
          show-collapse-button={appStore.device !== 'mobile'}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%; width:100%;"
          onCollapse={setCollapse}
        >
          {renderSubMenu()}
        </a-menu>
      );
    },
  });
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    font-size: 16px;
    background-color: #1b1f29;

    .arco-menu-selected {
      color: #266fe8 !important;
    }

    .arco-menu-inline-header {
      display: flex;
      align-items: center;
      color: #bcc4d0;
      background-color: #1b1f29;

      &:hover {
        background: linear-gradient(
          270deg,
          rgb(131 142 168 / 26%) 0%,
          rgb(188 201 223 / 10%) 100%
        );
        border-radius: 4px;
      }
    }

    .arco-menu-item {
      color: #bcc4d0;
      background-color: #1b1f29;

      &:hover {
        background: linear-gradient(
          270deg,
          rgb(131 142 168 / 26%) 0%,
          rgb(188 201 223 / 10%) 100%
        );
        border-radius: 4px;
      }
    }

    .arco-icon {
      color: #bcc4d0;
      font-size: 16px;
    }

    .arco-icon-down {
      font-size: 14px !important;
    }

    svg.arco-icon.arco-menu-pop {
      background-color: inherit;

      &:hover {
        background-color: #4b5b76;
      }
    }
  }

  :deep(.arco-trigger-menu .arco-trigger-menu-has-icon) {
    color: #bcc4d0;
  }

  :deep(.arco-menu-collapse-button) {
    color: #97a3b7;
    background-color: #2c3645;

    &:hover {
      background-color: #4b5b76;
    }
  }
</style>
