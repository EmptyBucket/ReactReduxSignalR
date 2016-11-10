var Path = require("path");
var Webpack = require("webpack");
var Chalk = require("chalk");
var AssetsPlugin = require("assets-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCss = new ExtractTextPlugin("stylesheets/[name].css");
let extractLess = new ExtractTextPlugin("stylesheets/[name].less");
let extractSass = new ExtractTextPlugin("stylesheets/[name].sass");

var BuildMode = {
    Production: "production",
    Development: "development",
    DevelopmentWithoutDevtool: "developmentWithoutDevtool",
    DevelopmentRebuildFast: "developmentRebuildFast"
}

var NodeEnv = process.env.NODE_ENV || BuildMode.Development;
console.log(Chalk.magenta(`Execute mode: ${NodeEnv}`));

module.exports = {
    context: Path.join(__dirname, "app", "scripts"),
    entry: {
        chat: "./Chat/index.js"
    },
    output: {
        path: Path.join(__dirname, "Bundles"),
        filename: "[name]-[chunkhash].js",
        publicPath: "/Bundles/",
        chunkFilename: "[id]-[chunkhash].js"
    },
    resolve: {
        root: [Path.join(__dirname, "app", "css"), Path.join(__dirname, "app", "scripts", "lib")],
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js", ".css"]
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js", ".loader.js"]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: "babel?plugins=transform-runtime&presets[]=es2015&presets[]=react"
            },
            // {
            //     test: /\.js$/,
            //     exclude: [/node_modules/],
            //     loader: "babel?plugins=transform-runtime&presets[]=es2015"
            // },
            {
                test: /\.css$/,
                loader: extractCss.extract("style", "css", "autoprefixer?browsers=last 2 version")
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract("style", "css", "autoprefixer?browsers=last 2 version", "sass")
            },
            {
                test: /\.less$/,
                loader: extractLess.extract("style", "css", "less")
            },
            { test: /\.(png|jpg)$/, loader: "file?name=[name]-[hash:6].[ext]" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=[name]-[hash:6].[ext]" },
            { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=[name]-[hash:6].[ext]&limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=[name]-[hash:6].[ext]&limit=10000&minetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=[name]-[hash:6].[ext]&limit=10000&minetype=image/svg+xml" }
        ]
    },
    plugins: [
        extractCss,
        extractSass,
        extractLess,
        new Webpack.NoErrorsPlugin(),
        new Webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NodeEnv)
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.OldWatchingPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({ name: "common" }),
        new AssetsPlugin({ path: Path.join(__dirname) })
    ]
};

if (NodeEnv === BuildMode.Production) {
    console.log(Chalk.bgYellow("Using plugins: UglifyJsPlugin, DedupePlugin"));
    module.exports.plugins.push(new Webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }),
    new Webpack.optimize.DedupePlugin());
}

if (NodeEnv === BuildMode.Development || NodeEnv === BuildMode.Production) {
    console.log(Chalk.bgYellow("Using devtool: source-map"));
    module.exports.devtool = "source-map";
}

if (NodeEnv === BuildMode.DevelopmentRebuildFast) {
    console.log(Chalk.bgYellow("Using devtool: eval"));
    module.exports.devtool = "eval";
}
