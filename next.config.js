const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa:{
    disable: process.env.NODE_ENV === 'development',
    dest: "public",
    register: true,
    skipWaiting: true
  },
 webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: "webpack-graphql-loader",
    });

    return config;
  },
})

