const { DefinePlugin } = require('webpack');
const { delimiter } = require('path');

const eslintFormatter = require('react-dev-utils/eslintFormatter');

const {
  appNodeModules,
  server,
  serverIndex,
  servedPath,
  appBuild,
} = require('./paths');

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(delimiter).filter(Boolean),
    ),
    extensions: ['.js', '.json', '.jsx'],
  },

  entry: [require.resolve('./polyfills'), serverIndex],
  output: {
    path: appBuild,
    filename: 'server.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: server,
      },

      {
        test: /\.js$/,
        include: server,
        loader: require.resolve('babel-loader'),
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      IS_DEV: process.env.NODE_ENV === 'development',
    }),
  ],
};
