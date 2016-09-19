const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: process.cwd(),
        filename: "apply-raamit.js",
        publicPath: '/virkailija-raamit/build/'
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
