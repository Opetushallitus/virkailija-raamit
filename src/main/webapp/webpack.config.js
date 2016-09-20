const HtmlWebpackPlugin = require('html-webpack-plugin');
const production = process.env.NODE_ENV === 'production';

module.exports = {
    output: {
        publicPath: production ? '/virkailija-raamit/' : '/build/'
    },
    devServer: {
        // Disable frontend-app built-in proxy options for historyApiFallback.
        proxy: {},
        // Webpack Dev Server needs generated index.html in /build directory for historyApiFallback to work.
        historyApiFallback: true
    }
};

/*
// If you need to make requests to a backend server, you may use this simpler configuration. You also need to serve index.html from the backend.
module.exports = {
    output: {
        publicPath: '/build/'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'My App',
        filename: '../index.html'
    })]
};
*/
