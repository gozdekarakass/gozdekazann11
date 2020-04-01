var path = require('path');
module.exports = {
    css: true,
    //cssTemplate: path.resolve('node_modules/webfonts-generator/templates/scss.hbs'),
    cssTemplate: path.resolve('src/components/scss/templates/scss.hbs'),
    'files': [
      './src/components/svg/**/*.svg'
    ],
    'fontName': 'myfonticons',
    'classPrefix': 'myfonticon-',
    'baseSelector': '.myfonticon',
    'types': ['eot', 'woff', 'woff2', 'ttf', 'svg'],
    'fileName': '../public/resources/fonts/[fontname].[ext]'
    //'fileName': 'app.[fontname].[hash].[ext]'
  };

  