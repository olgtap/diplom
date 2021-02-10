"use strict";

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    // prefixer = require('gulp-autoprefixer'),
    // plumber = require('gulp-plumber'),
    // rigger = require('gulp-rigger'),
    // terser = require('gulp-terser'),
    // htmlmin = require('gulp-htmlmin'),
    // rimraf = require('rimraf'),
    browserSync = require('browser-sync');
    // reload = browserSync.reload(); // todo check it

const path = {
    node_modules: {
        src: {
            css: [
                'node_modules/bootstrap/dist/css/bootstrap.css',
                'node_modules/@fortawesome/fontawesome-free/css/all.css',
            ],
            js:  [
                'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/@fortawesome/fontawesome-free/js/all.js',
                'node_modules/holderjs/holder.js',
            ],
        },
        dst: {
            css: 'src/css/',
            js:  'src/js/',
        },
    },
    src: {
        all:   'src/',
        html:  'src/**/*.html',
        css:   'src/css/**/*.css',
        fonts: 'src/fonts/**/*.*',
        img:   'src/img/**/*.{jpg,svg}',
        js:    'src/js/*.js',
        scss:  'src/scss/*.scss',
        scss_to: 'src/css/',
    },
    build: {
        all:  'build/',
        html: 'build/',
        css:  'build/css/',
        js:   'build/js/',
        img:  'build/img/',
    },
    watch: {
        html: 'src/**/*.html',
        css:  'src/css/**/*.css',
        js:   'src/js/**/*.js',
        scss: 'src/scss/*.scss',
    }
};

// copy js files from node_modules to ./src/js/
gulp.task('modules-js', function(done) {
    gulp.src(path.node_modules.src.js)
        .pipe(gulp.dest(path.node_modules.dst.js));
    done();
});

// copy css files from node_modules to ./src/css/
gulp.task('modules-css', function(done) {
    gulp.src(path.node_modules.src.css)
        .pipe(gulp.dest(path.node_modules.dst.css));
    done();
});

gulp.task('modules', gulp.series('modules-js', 'modules-css'));

// process sass and copy results to ./src/
gulp.task('sass',function(done){
    gulp.src(path.src.scss)
        .pipe(sass())
        .pipe(gulp.dest(path.src.scss_to));
    done();
});


// server

var server_config = {
    server: {
        baseDir: path.src.all,
        index: "index.html",
    },
    tunnel: false,
    host: 'localhost',
    port: 7787,
    logPrefix: "WebDev"
};

gulp.task('server', function (done) {
    browserSync(server_config);
    gulp.watch(path.watch.scss).on('change', gulp.series('sass'));
    gulp.watch(path.watch.html).on('change', browserSync.reload);
    gulp.watch(path.watch.css).on('change', browserSync.reload);
    gulp.watch(path.watch.js).on('change', browserSync.reload);
    done();
});

// default task, process all & run server with watch
gulp.task('default', gulp.series('modules', 'sass', 'server'));
