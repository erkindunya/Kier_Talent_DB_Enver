'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);


build.configureWebpack.mergeConfig({
  additionalConfiguration: (webpackConfig) => {
    webpackConfig.module.rules.push([{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {

        plugins: ['import', {libraryName: 'antd', style: true}]
      }
    }
    ]);
    return webpackConfig;
  }
});


build.configureWebpack.mergeConfig({
  additionalConfiguration: (webpackConfig) => {
    webpackConfig.module.rules.push({
        test: /\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: lessToJs(fs.readFileSync(path.join(__dirname, './src/ant-theme-vars.less'), 'utf8')) /*{

                '@primary-color': 'red',
  '@border-radius-base': '0px'
              }*/
            }
          }
        ]
      }
    );
    return webpackConfig;
  }
});


// ['import', { libraryName: "antd", style: true }]
build.initialize(gulp);
