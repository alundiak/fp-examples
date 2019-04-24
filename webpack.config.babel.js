import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PrettierPlugin from 'prettier-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
    const { ifDev } = getIfUtils(env);
    return {
        entry: './src/index.jsx',
        output: {
            path: resolve(__dirname, 'dist'),
            publicPath: ifDev('/', './'),
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
            ifDev(new webpack.HotModuleReplacementPlugin()),
            new HtmlWebpackPlugin({
                title: 'FP Code in ReactJS',
                filename: 'index.html',
                template: './src/index.html'
            }),
            // new PrettierPlugin({
            //     printWidth: 100,              // Specify the length of line that the printer will wrap on. Default is 80. - eslint maxlen ?
            //     tabWidth: 4,                  // Specify the number of spaces per indentation-level.
            //     useTabs: false,               // Indent lines with tabs instead of spaces.
            //     semi: true,                   // Print semicolons at the ends of statements.
            //     singleQuote: true,
            //     encoding: 'utf-8',
            //     extensions: ['.jsx']
            // })
            // Prettier does have issue with func-name eslint rule (anonymous func change with no spaces.)
        ]),

        devServer: {
            host: 'localhost',
            port: 4000,
            hot: ifDev(true, false)
        },

        devtool: 'source-map'
    }
};
