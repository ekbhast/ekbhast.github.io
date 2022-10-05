const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename"); 

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "Petrichenko_Practice_2_Uber_Landing/src"
        }
    });

    gulp.watch("Petrichenko_Practice_2_Uber_Landing/src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("Petrichenko_Practice_2_Uber_Landing/src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("Petrichenko_Practice_2_Uber_Landing/src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("Petrichenko_Practice_2_Uber_Landing/src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));