// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (app: any) {
  app.use(
    '/api', // 指定需要转发的请求
    createProxyMiddleware({
      target: 'http://localhost:3001', // 服务器的地址
      changeOrigin: true,
      pathRewrite(path: any) {
        return path.replace('/api', '');
      },
    }),
  );
}
