const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = ({
 
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      loader: "webpack-graphql-loader",
    });

    return config;
  },
})

