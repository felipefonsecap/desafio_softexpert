var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
	devServer: {
		inline: true,
		contentBase: './public',
		port: 3333
	},
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
        ]
    },
	plugins: [
       new ExtractTextPlugin("styles.css"),
		new UglifyJSPlugin(),
		new OptimizeCssAssetsPlugin({
		  assetNameRegExp: /\.optimize\.css$/g,
		  cssProcessor: require('cssnano'),
		  cssProcessorOptions: { discardComments: {removeAll: true } },
		  canPrint: true
		})
	]
};


//plugins: [
 //       new ExtractTextPlugin("styles.css"),
//		new UglifyJSPlugin(),
//		new OptimizeCssAssetsPlugin({
//		  assetNameRegExp: /\.optimize\.css$/g,
	//	  cssProcessor: require('cssnano'),
	//	  cssProcessorOptions: { discardComments: {removeAll: true } },
	//	  canPrint: true
	//	})
//    ]
