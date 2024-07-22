<template>
  <div class="root">
    <div class="header">
      <img
        :src="getFile(appStore.getLogo) ?? './logo.svg'"
        alt="logo"
        height="32"
      />
      <!-- <img src="src/assets/images/login/logo.png" alt="logo" height="32" /> -->
      <div class="logo-text">{{ appStore.getTitle }}</div>
    </div>
    <div class="container">
      <div class="left-banner"></div>
      <div class="login-card">
        <div class="title">
          <!-- {{ $t('login.welcome') }} {{ appStore.getTitle }} -->
          <!-- <div class="welcome">欢迎登录！</div> -->
          <!-- <div class="name"> {{ appStore.getTitle }} </div> -->
        </div>
        <EmailLogin v-if="isEmailLogin" />
        <AccountLogin />
        <!-- <a-tabs v-else class="account-tab" default-active-key="1">
          <a-tab-pane key="1" :title="$t('login.account')">
            <AccountLogin />
          </a-tab-pane> -->
        <!-- <a-tab-pane key="2" :title="$t('login.phone')">
            <PhoneLogin />
          </a-tab-pane> -->
        <!-- </a-tabs> -->
        <!-- <div class="oauth">
          <a-divider class="text" orientation="center">{{
            $t('login.other')
          }}</a-divider>
          <div class="idps">
            <div v-if="!isEmailLogin" class="mail app" @click="toggleLoginMode">
              <icon-email /> {{ $t('login.email.txt') }}
            </div>
            <div v-else class="account app" @click="toggleLoginMode">
              <icon-user /> {{ $t('login.account.txt') }}
            </div>
            <a-tooltip content="码云" mini>
              <a-link class="app" @click="handleSocialAuth('gitee')">
                <svg
                  class="icon"
                  fill="#C71D23"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"
                  />
                </svg>
              </a-link>
            </a-tooltip>
            <a-tooltip content="GitHub" mini>
              <a-link class="app" @click="handleSocialAuth('github')">
                <svg
                  class="icon"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </a-link>
            </a-tooltip>
          </div>
        </div> -->
      </div>
    </div>
    <div v-if="appStore.device === 'desktop'" class="footer">
      <div class="beian">
        <div class="below text" v-html="appStore.getCopyright"></div>
      </div>
    </div>
    <video id="video-bg" autoplay muted loop>
      <source src="@/assets/images/login/login.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/store';
  import getFile from '@/utils/file';
  import useResponsive from '@/hooks/responsive';
  // import { socialAuth } from '@/api/auth';
  import AccountLogin from './components/account-login.vue';
  // import PhoneLogin from './components/phone-login.vue';
  import EmailLogin from './components/email-login.vue';

  const appStore = useAppStore();
  useResponsive(true);
  const isEmailLogin = ref(false);

  /**
   * 第三方登录授权
   *
   * @param source 来源
   */
  // const handleSocialAuth = async (source: string) => {
  //   const { data } = await socialAuth(source);
  //   window.location.href = data;
  // };

  // const toggleLoginMode = () => {
  //   isEmailLogin.value = !isEmailLogin.value;
  // };
</script>

<style lang="less" scoped>
  #video-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    // width: auto;
    width: 100%;
    // height: auto;
    height: 100vh;
    object-fit: cover;
  }

  .root {
    height: 100vh;
    // background-image: url('@/assets/images/login/login-back.png');
    background-repeat: no-repeat;
    background-size: cover;

    a {
      color: #3370ff;
      text-decoration: none;
      cursor: pointer !important;
    }

    a:hover {
      color: #6694ff;
    }

    .header {
      padding: 32px 40px 0;

      img {
        vertical-align: middle;
      }

      .logo-text {
        display: inline-block;
        margin-right: 4px;
        margin-left: 12px;
        color: transparent;
        font-weight: 400;
        font-size: 28px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: 142.2%; /* 39.816px */
        letter-spacing: 1.12px;
        vertical-align: middle;
        background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
      }
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      max-width: 1200px;
      height: calc(100vh - 100px);
      min-height: 650px;
      margin: 0 auto;

      .left-banner {
        position: relative;
        flex: 1 1;
        height: 100%;
        max-height: 700px;

        img {
          position: absolute;
          top: 4.5%;
          left: 0;
          width: 100%;
          max-width: 500px;
          height: 100%;
          max-height: 350px;
          object-fit: contain;
        }
      }

      .login-card {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 520px;
        height: 100%;
        min-height: 650px;
        // padding: 48px 43px 32px;
        background: rgb(19 22 27 / 60%);
        box-shadow: 0 5px 15px rgb(0 0 0 / 5%);

        :deep(.arco-input-wrapper) {
          background-color: #232a35;
          border: none;
          border-radius: 2px;

          .arco-input {
            // width: 364px;
            // height: 22px;
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            // line-height: 22px;
            &::placeholder {
              // width: 80px;
              // height: 22px;
              color: rgb(255 255 255 / 40%);
              font-weight: 400;
              font-size: 16px;
              font-family: HarmonyOS-Regular, sans-serif;
              // line-height: 22px;
            }
          }

          .arco-input[type='password'] {
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: 'LogoSC Unbounded Sans', sans-serif;
            letter-spacing: 1px;
          }
        }

        .title {
          display: flex;

          .welcome {
            width: 130px;
            height: 30px;
            margin-bottom: 30px;
            color: #fff;
            font-weight: 400;
            font-size: 26px;
            font-family: HarmonyOS-Regular, sans-serif;
            line-height: 30px;
          }

          .name {
            color: rgb(0 0 0 / 85%);
            font-weight: 400;
            font-size: 28px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-style: normal;
            line-height: 24px; /* 85.714% */
          }
        }

        .account-tab {
          margin-top: 36px;

          :deep(.arco-tabs-nav::before) {
            display: none;
          }

          :deep(.arco-tabs-tab-title) {
            position: relative;
            display: inline-block;
            padding: 1px 0;
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
          }

          :deep(.arco-tabs-tab-title:hover) {
            color: rgb(var(--primary-6));
          }

          :deep(.arco-tabs-tab-title::before) {
            display: none;
          }

          :deep(.arco-tabs-tab) {
            margin: 0 30px 0 6px;
          }
        }

        .oauth {
          margin-top: 20px;
          padding: 0 5px;

          :deep(.arco-divider-text) {
            color: #80838a;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
          }

          :deep(.arco-divider) {
            margin-bottom: 25px;
          }

          .idps {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;

            .app {
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              width: 32px;
              height: 32px;
              margin-right: 12px;
              border: 1px solid #eaedf1;
              border-radius: 32px;
              cursor: pointer;

              .icon {
                width: 21px;
                height: 20px;
              }
            }

            .app:hover {
              background: #f3f7ff;
              border: 1px solid #97bcff;
            }

            .mail {
              width: 81px;
              min-width: 81px;
            }

            .account {
              width: 147px;
              min-width: 147px;
            }

            .mail,
            .account {
              padding: 6px 10px;
              color: #41464f;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
            }

            .mail svg,
            .account svg {
              margin-right: 10px;
              font-size: 16px;
            }

            .mail:hover,
            .account:hover {
              color: rgb(var(--primary-6));
            }

            .mail svg:hover,
            .account svg:hover {
              color: rgb(var(--primary-6));
            }
          }
        }
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      .beian {
        .text {
          color: rgb(255 255 255 / 40%);
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 0.2px;
          text-align: center;
        }

        .below {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
