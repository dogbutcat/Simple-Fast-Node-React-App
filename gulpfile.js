var gulp = require('gulp'),
    mocha = require('gulp-spawn-mocha'),
    ts = require('gulp-typescript'),
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
            ws: true
        }
    })
    gulp.watch('./public/**/*.*').on('change', browserSync.reload);
    gulp.watch('./views/**/*.*').on('change', browserSync.reload);
})

gulp.task('watch', () => {
    gulp.watch('./src/*.ts', ['webpack'])
})

gulp.task('default', ['server', 'client']);

gulp.task('test:ts', () => {
    let ret = del.sync(['./test/build/**']);
    console.log('These files have deleted: ' + ret);
    let tsProjection = ts.createProject('tsconfig.test.json');
    return tsProjection.src().pipe(tsProjection())
        // .pipe(mocha({
        //     R: 'mochawesome'
        // }))
    .pipe(gulp.dest('./test/build'));
})

gulp.task('watch:test', () => {
    return gulp.watch(['test/db/*.test.ts','src/**/*.ts'], ['mocha:test']);
})

gulp.task('mocha:test',['test:ts'], () => {
    return gulp.src(['!test/build/test/db/token.test.js','test/build/test/db/*.test.js'])
        .pipe(mocha({
            R: 'mochawesome'
        }))
})

gulp.task('mocha', ['mocha:test', 'watch:test']);