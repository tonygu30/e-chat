var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    var postcss = require('gulp-postcss'); // 引入 gulp-postcss
    var autoprefixer = require('autoprefixer'); // 引入 autoprefixer
    var processors = [autoprefixer({ browsers: ['last 2 version'] })]; // 延後前兩版本的瀏覽器補全
    return gulp.src('./sass/*.sass')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'))
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.sass', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('watch', 'sass'))