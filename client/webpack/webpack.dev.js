const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
        port: 3000,
        proxy: {
            '/api': {
//                 target: 'https://express-questionnaires-server.herokuapp.com',
                target: 'https://questionnaires-server.onrender.com'
                secure: false,
                changeOrigin: true,
            },
        },
        client: {
            logging: 'info',
            overlay: false,
        },
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('dev'),
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
    ],
};
