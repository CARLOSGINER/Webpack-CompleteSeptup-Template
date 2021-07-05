const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const plugins = [];

if (!devMode) {

    // enable in production only
    plugins.push(new MiniCssExtractPlugin({
        filename:'style.css',
    }));

    plugins.push(new HtmlWebpackPlugin({

        template:'./src/template.html',
        filename: 'index.html',

    }));

    plugins.push(new CleanWebpackPlugin());


} else {

    plugins.push(new HtmlWebpackPlugin({

        template:'./src/template.html',
        filename: 'index.html',

    }));

    plugins.push(new CleanWebpackPlugin());

}

module.exports = {


    entry: './src/index.js',

    output: {

        path: path.resolve(__dirname, 'dist'),    
        filename: 'app.js',

    },

    devServer: {

        port:8080,
        contentBase: path.resolve(__dirname,'src'),
        watchContentBase:true,
        hot: true,
        open:true,
       
        
    },

    module: {

        rules: [

            {
                test: /\.(scss|css)$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
             }

        ]
    },

    plugins,


}