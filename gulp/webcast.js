var gulp = require("gulp"),
webpack = require("webpack");

gulp.task("webpack", function(callback) {
    console.log(`Running webpack`);
    webpack({
            entry: './scripts/app.js', //arquivo principal
            output: { //saida
                path: "./dist/js",
                filename: "app.js"
            },

            devtool: 'source-map' ,
            module: {
               loaders: [
                    {
                        test: /\.js?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            presets: ['react', 'es2015', 'stage-0']
                        }
                    }
                ]
            }

    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        console.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});