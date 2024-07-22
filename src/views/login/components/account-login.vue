<template>
  <a-form
    v-if="!data.isToken"
    ref="formRef"
    :model="form"
    :rules="rules"
    layout="vertical"
    size="large"
    class="login-form"
    @submit="handleLogin"
  >
    <div class="welcome">欢迎登录！</div>
    <a-form-item field="username" hide-asterisk>
      <template #label>
        <img src="@/assets/icons/png/User.png" alt="" />
        <span class="label">账号</span>
      </template>
      <a-input
        v-model="form.username"
        :placeholder="$t('login.account.placeholder.username')"
        :max-length="64"
        allow-clear
      />
    </a-form-item>
    <a-form-item field="password" hide-asterisk>
      <template #label>
        <img src="@/assets/icons/png/Lock.png" alt="" />
        <span class="label">密码</span>
      </template>
      <a-input-password
        v-model="form.password"
        :placeholder="$t('login.account.placeholder.password')"
        :max-length="32"
      />
    </a-form-item>
    <a-form-item field="captcha" hide-asterisk>
      <template #label>
        <img src="@/assets/icons/png/code.png" alt="" />
        <span class="label">验证码</span>
      </template>
      <a-input
        v-model="form.captcha"
        :placeholder="$t('login.account.placeholder.captcha')"
        :max-length="4"
        allow-clear
        style="flex: 1 1"
      />
      <img
        :src="captchaImgBase64"
        :alt="$t('login.captcha')"
        class="captcha"
        @click="getCaptcha"
      />
    </a-form-item>
    <div class="remember-me">
      <a-checkbox
        :model-value="loginConfig.rememberMe"
        @change="setRememberMe as any"
      >
        <div class="remember">{{ $t('login.rememberMe') }}</div>
      </a-checkbox>
    </div>
    <a-button class="btn" :loading="loading" type="primary" html-type="submit"
      >{{ $t('login.button') }}
    </a-button>
  </a-form>
  <div v-if="data.isToken" class="project">
    <div class="welcome">欢迎登录！</div>
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
    <div class="footer">
      <a-button style="margin-right: 10px" @click="out">退出</a-button>
      <a-button type="primary" @click="login">确定</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import { AccountLoginReq, tenantList } from '@/api/auth';
  import { ValidatedError, TreeNodeData } from '@arco-design/web-vue';
  import { encryptByRsa } from '@/utils/encrypt';
  import { useRouter } from 'vue-router';
  import useUser from '@/hooks/user';

  const { proxy } = getCurrentInstance() as any;
  const { logout } = useUser();
  const { t } = useI18n();
  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(false);
  const captchaImgBase64 = ref();
  const loginConfig = useStorage('login-config', {
    rememberMe: true,
    username: 'admin', // 演示默认值
    password: 'admin123', // 演示默认值
    // username: debug ? 'admin' : '', // 演示默认值
    // password: debug ? 'admin123' : '', // 演示默认值
  });

  const data = reactive({
    form: {
      username: loginConfig.value.username,
      password: loginConfig.value.password,
      captcha: '',
      uuid: '',
    } as AccountLoginReq,
    rules: {
      username: [
        { required: true, message: t('login.account.error.required.username') },
      ],
      password: [
        { required: true, message: t('login.account.error.required.password') },
      ],
      captcha: [
        { required: true, message: t('login.account.error.required.captcha') },
      ],
    },
    node: [] as Array<string | number>,
    isToken: !!localStorage.getItem('token'),
    treeData: [] as TreeNodeData[],
  });
  const { form, rules } = toRefs(data);

  /**
   * 获取验证码
   */
  const getCaptcha = () => {
    userStore.getImgCaptcha().then((res) => {
      form.value.uuid = res.data.uuid;
      captchaImgBase64.value = res.data.img;
    });
  };
  getCaptcha();

  const tenant = () => {
    tenantList().then((res) => {
      data.treeData = res.data;
      data.node = [Number(localStorage.getItem('TENANT_ID'))];
    });
  };

  if (data.isToken) {
    tenant();
  }

  /**
   * 登录
   *
   * @param errors 表单验证错误
   * @param values 表单数据
   */
  const handleLogin = ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      loading.value = true;
      userStore
        .accountLogin({
          username: values.username,
          password: encryptByRsa(values.password) || '',
          captcha: values.captcha,
          uuid: values.uuid,
        })
        .then(() => {
          const { username: name } = values;
          localStorage.setItem('name', name);
          if (name === 'super_admin') {
            tenant();
            data.node = [Number(localStorage.getItem('TENANT_ID'))];
            data.isToken = !!localStorage.getItem('token');
            const { rememberMe } = loginConfig.value;
            const { username, password } = values;
            loginConfig.value.username = rememberMe ? username : '';
            loginConfig.value.password = rememberMe ? password : '';
            // proxy.$notification.success(t('login.success'));
          } else {
            const { redirect, ...othersQuery } =
              router.currentRoute.value.query;
            router.push({
              name: (redirect as string) || 'EnergyMonitor',
              query: {
                ...othersQuery,
              },
            });
            const { rememberMe } = loginConfig.value;
            const { username, password } = values;
            loginConfig.value.username = rememberMe ? username : '';
            loginConfig.value.password = rememberMe ? password : '';
            proxy.$notification.success({
              title: t('login.success'),
            });
          }
          // const { redirect, ...othersQuery } = router.currentRoute.value.query;
          // router.push({
          //   name: (redirect as string) || 'Workplace',
          //   query: {
          //     ...othersQuery,
          //   },
          // });
          // const { rememberMe } = loginConfig.value;
          // const { username } = values;
          // loginConfig.value.username = rememberMe ? username : '';
          // proxy.$notification.success(t('login.success'));
        })
        .catch(() => {
          getCaptcha();
          form.value.captcha = '';
        })
        .finally(() => {
          loading.value = false;
        });
    }
  };

  // 退出
  const out = () => {
    localStorage.removeItem('token');
    data.isToken = false;
    getCaptcha();
    form.value.captcha = '';
    proxy.$notification.success('退出成功');
  };

  // 登入
  const login = () => {
    const { redirect } = router.currentRoute.value.query;

    router
      .push({
        name: (redirect as string) || 'EnergyMonitor',
      })
      .then(() => {
        data.isToken = !!localStorage.getItem('token');
        if (data.isToken) {
          proxy.$notification.success({
            title: t('login.success'),
          });
        } else {
          getCaptcha();
          form.value.captcha = '';
        }
      });
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

    // 获取当前 URL 的查询字符串部分
    const searchParams = new URLSearchParams(window.location.search);

    // 修改查询参数
    searchParams.set('TENANT_ID', `${selectedKeys}`);

    // 使用 pushState 更新 URL
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`
    );
    localStorage.setItem('TENANT_ID', `${selectedKeys}`);
    userStore.accountLogin({
      username: 'super_admin',
      // @ts-ignore
      password: encryptByRsa('admin123'),
    });
  };

  /**
   * 记住我
   *
   * @param value 是否记住我
   */
  const setRememberMe = (value: boolean) => {
    loginConfig.value.rememberMe = value;
    loginConfig.value.username = value ? form.value.username || '' : '';
    loginConfig.value.password = value ? form.value.password || '' : '';
  };
</script>

<style lang="less" scoped>
  .welcome {
    height: 30px;
    margin-bottom: 58px;
    color: #fff;
    font-weight: 400;
    font-size: 26px;
    font-family: HarmonyOS-Regular, sans-serif;
    line-height: 30px;
  }

  .login-form {
    box-sizing: border-box;
    // margin-top: 16px;
    // padding: 0 5px;
    padding: 48px 43px 32px;

    .arco-input-wrapper,
    :deep(.arco-select-view-single) {
      height: 40px;
      font-size: 13px;
      background-color: var(--color-bg-white);
      border: 1px solid var(--color-border-3);
      border-radius: 4px;
    }

    .arco-input-wrapper.arco-input-error {
      background-color: var(--color-danger-light-1);
      border: 1px solid #ff4d4f !important;
    }

    :deep(.arco-input-wrapper.arco-input-focus) {
      border: 1px solid #266fe8 !important;
    }

    .captcha {
      width: 111px;
      height: 36px;
      margin: 0 0 0 5px;
      cursor: pointer;
    }

    .remember-me {
      display: flex;
      justify-content: space-between;

      .remember {
        width: 42px;
        height: 22px;
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        line-height: 22px;
      }

      .arco-checkbox {
        padding-left: 0;
      }

      :deep(.arco-checkbox-checked .arco-checkbox-icon) {
        background-color: #266fe8;
      }
    }

    .btn {
      width: 100%;
      height: 40px;
      margin: 58px 0 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      background: #266fe8;
      border-radius: 4px;
      box-shadow: 0 0 fe1px #05f, 0 2px 1px rgb(0 0 0 / 15%);
    }

    img {
      width: 14px;
      height: 14px;
    }

    .label {
      width: 48px;
      height: 24px;
      margin-left: 5px;
      color: rgb(255 255 255 / 85%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 24px;
      vertical-align: middle;
    }
  }

  .project {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 80px;

    .title {
      padding: 0 43px 16px;
      color: rgb(255 255 255 / 85%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;

      span {
        margin-left: 5px;
        vertical-align: text-top;
      }
    }

    .welcome {
      padding: 0 43px;
    }

    .tree {
      flex: 1;
      margin-bottom: 50px;
      padding: 0 43px;
      overflow: auto;
    }

    .footer {
      align-self: flex-end;
      width: 100%;
      padding: 16px 43px;
      text-align: right;
      border-top: 1px solid #2c3645;
    }

    :deep(.arco-tree-node) {
      color: #bcc4d0;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
    }

    :deep(.arco-tree-node-title:hover) {
      color: #bcc4d0;
      background: linear-gradient(
        270deg,
        rgb(131 142 168 / 26%) 0%,
        rgb(188 201 223 / 10%) 100%
      );
    }

    :deep(.arco-tree-node-selected .arco-tree-node-title) {
      color: #266fe8;
      background: linear-gradient(
        270deg,
        rgb(131 142 168 / 26%) 0%,
        rgb(188 201 223 / 10%) 100%
      );
    }

    .arco-btn-primary {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      background-color: #266fe8;

      &:hover {
        background-color: #1e74ff;
      }
    }

    .arco-btn-secondary {
      color: rgb(255 255 255 / 70%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      line-height: 24px;
      background: rgb(255 255 255 / 8%);

      &:hover {
        background: rgb(255 255 255 / 10%);
      }
    }
  }
</style>
