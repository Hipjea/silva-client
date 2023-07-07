const path = require("path");

const serverConfig = {
  target: "node",
  entry: "./server/index.ts",
  output: {
    filename: "server.bundle.js",
    path: path.resolve(__dirname, "..", "build"),
  },
  module: {
    rules: [
      {
        test: /\.tsx$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
};

module.exports = [serverConfig];