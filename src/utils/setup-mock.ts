// import debug from './env';

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  // 仅在开发环境启用 mock
  // if (mock !== false && debug) setup();
  // 在生产环境也启用 mock
  if (mock !== false) setup();
};

export const successResponseWrap = (data: unknown) => {
  return {
    success: true,
    code: 200,
    message: '操作成功',
    data,
    timestamp: new Date().getTime(),
  };
};

export const failResponseWrap = (
  data: unknown,
  message: string,
  code = 500
) => {
  return {
    success: false,
    code,
    message,
    data,
    timestamp: new Date().getTime(),
  };
};
