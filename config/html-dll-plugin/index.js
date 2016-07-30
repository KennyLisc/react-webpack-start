class HtmlDllPlugin {
  constructor(options) {
    this.options = options;
    if (!options.dllJson || !options.dllJson.vendor_dll) {
      console.error('no webpack assets json file.');
    }
    this.dllFile = options.dllJson.vendor_dll.js;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      // console.log('The compiler is starting a new compilation...');

      // console.log(htmlPluginData.);
      // html-webpack-plugin-before-html-processing, html-webpack-plugin-after-html-processing
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
        let htmlData = htmlPluginData;
        htmlPluginData.assets['js'].unshift(this.dllFile);
        // console.log(htmlData.html);
        // htmlData.html += '<script type="text/javascript" src="vendor_dll.js"></script>';
        callback(null, htmlData);
      });
    });
  }
}
module.exports = HtmlDllPlugin;
