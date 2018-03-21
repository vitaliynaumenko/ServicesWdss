//base part

var gulp = require('gulp'),
    rename  = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug');

//css part
var less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

//js part
var include = require('gulp-include'),
    uglify  = require('gulp-uglify'),
    babel = require('gulp-babel');

//сообщение об ошибках
function swallowError(error){
    console.log(error.toString());
    this.emit('end');
}

//задача на выполнение всех действий
gulp.task('default', ['gulp_watch']);

//ватчер над файлами
gulp.task('gulp_watch', function () {
    gulp.watch('./src/less/**/*.less', ['styles']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/pug/**/*.pug', ['views']);
});

//процедура сборки css
gulp.task('styles', function () {
    return gulp.src('./src/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            parth: ['./less']
        }))
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 10 versions', '> 5%'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

//собираем js
gulp.task('scripts', function() {
    return gulp.src('./src/js/index.js')
        .pipe(include())
        .pipe(rename('app.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', swallowError)
        .pipe(uglify()) //минифицируем js файл
        .pipe(gulp.dest('js'));   //сохраняем минифицированную версию
});

gulp.task('views', function() {
    return gulp.src('./src/pug/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('./'));
});