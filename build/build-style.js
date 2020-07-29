const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const pkg = require('../package.json');

// 编译less
gulp.task('css', function () {
    gulp.src('../src/styles/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename(`${pkg.buildName}.css`))
        .pipe(gulp.dest('../dist/styles'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
    gulp.src('../src/styles/common/iconfont/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/fonts'));
});

// 拷贝JSON数据文件
gulp.task('data', function () {
    gulp.src('../src/md-extend/data/china_regions/*.*')
        .pipe(gulp.dest('../dist/data/china_regions/'));
});

gulp.task('default', ['css', 'fonts', 'data']);
