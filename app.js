const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js')

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8088, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:8088');
});

// const path = require('path')
// const config = require('./webpack.config.js')
// const webpack = require('webpack')
// const devServer = require('webpack-dev-server')

// webpack(config, function(err, stats) {
// 	if (err) {
// 		console.error(err.stack || err);
// 		if (err.details) {
// 			console.error(err.details);
// 		}
// 		return;
// 	}

// 	const info = stats.toJson();

// 	if (stats.hasErrors()) {
// 		console.error(info.errors.join('\n'));
// 	}

// 	if (stats.hasWarnings()) {
// 		console.warn(info.warnings.join('\n'));
// 	}
// })

// devServer({
// 	   contentBase: path.join(__dirname, "examples"),
// 	   port: 7000,
// 	   host: '0.0.0.0'
// 	})