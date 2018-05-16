var path = require("path");
var webpack = require('webpack');


module.exports = {
    entry: {
        app: "./app/assets/scripts/app.js",
        vendor: "./app/assets/scripts/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015"]
                    }
                }
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]
}