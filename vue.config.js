const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false, // 关闭 fs
        path: require.resolve('path-browserify'), // 使用 path-browserify
        stream: require.resolve('stream-browserify'), // 使用 stream-browserify
      },
    },
  },
  devServer: {
    port: 3040,
  },
});
