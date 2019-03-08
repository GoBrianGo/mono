const path = require('path')

module.exports = {
	mode: 'development',
	entry: {
		app: './index.js',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'mono.js',
		library: 'mono',
      	libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
        		use: {
		          loader: 'babel-loader'
		        }
			}
		]
	},
	devServer: {
	   contentBase: path.join(__dirname, "examples"),
	   port: 7000,
	   host: '0.0.0.0'
	},
}