import { join, resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
    const { ifNotProduction } = getIfUtils(env);
    return {
        entry: './src/index.jsx',
        output: {
            path: resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'fp-react.js'
        },

        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.js', '.jsx', '.json']
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },

        plugins: removeEmpty([
            ifNotProduction(new webpack.HotModuleReplacementPlugin()),
            new HtmlWebpackPlugin({
                title: 'FP Code in ReactJS',
                filename: 'index.html',
                template: './src/index.html'
            })
        ]),

        devServer: {
            host: 'localhost',
            port: 4000,
            hot: true
        },

        devtool: 'source-map'
    }
};
