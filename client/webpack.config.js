const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js",
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Client Server",
                template: "./index.html",
            }),
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "src-sw.js",
            }),

            new WebpackPwaManifest({
                name: "jate",
                short_name: "jate",
                description: "Just Another Text Editor!",
                background_color: "#7eb4e2",
                theme_color: "#7eb4e2",
                start_url: "./",
                publicPath: "./",
                fingerprints: false,
                icons: [
                    {
                        src: path.resolve("src/images/logo.png"),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join("assets", "icons"),
                    },
                ],
            }),
        ],

        module: {
            rules: [
                { test: /\.css$/, use: ["style-loader", "css-loader"] },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
            ],
        },
    };
};
