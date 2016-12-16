var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    webpack = require('webpack');

var webpackConfig = require('./webpack.config');

gulp.task('server', ['clean'], () => {
    webpack(webpackConfig.ServerConfig, (err, stats) => {
        if (err) console.log(err);
    })
})
gulp.task('client', () => {
    webpack(webpackConfig.ClientConfig, (err, stats) => {
        if (err) console.log(err);
    })
})

gulp.task('clean', () => {
    var ret = del.sync(['./build/**']);
    console.log('Files Deleted: ' + ret);
})

gulp.task('sync', () => {
    browserSync.init({
        proxy: {
            target: "http://localhost:8000",
            ws:true
        }
    })
    gulp.watch('./public/**/*.*').on('change', browserSync.reload);
    gulp.watch('./views/**/*.*').on('change', browserSync.reload);
})

gulp.task('watch', () => {
    gulp.watch('./src/*.ts', ['webpack'])
})

gulp.task('default', ['server', 'client']);