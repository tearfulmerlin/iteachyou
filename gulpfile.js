'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const gulpCopy = require('gulp-copy');

const sourceDir = './src'
const destDir = './build'

sass.compiler = require('node-sass');

gulp.task('clean', function () {
	return gulp.src(`${destDir}`, {read: false})
			.pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src(`${sourceDir}/styles/*.scss`)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(`${destDir}/styles/`));
});

gulp.task('css', function () {
  gulp.src(`${destDir}/styles/*.css`)
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest(`${destDir}/styles/`));
});

gulp.task('scripts', function () {
	return gulp.src(`${sourceDir}`)
})

gulp.task('html', function () {
	return gulp.src(`${sourceDir}/*.html`)
	.pipe(gulp.dest(destDir));
})

gulp.task('images', function () {
	return gulp.src(`${sourceDir}/images/*.*`)
	.pipe(gulp.dest(`${destDir}/images`));
})

gulp.task('fonts', function () {
	return gulp.src(`${sourceDir}/fonts/*.*`)
	.pipe(gulp.dest(`${destDir}/fonts`));
})

gulp.task('slick', function () {
	return gulp.src(`${sourceDir}/slick/*.js`)
	return gulp.src(`${sourceDir}/slick/*.css`)
	.pipe(gulp.dest(`${destDir}/slick`));
})

gulp.task('build', 
	gulp.series('clean',
		gulp.parallel(
			gulp.series('sass', 'css'), 
			'scripts', 
			'html', 
			'images', 
			'fonts',
			'slick'
		)
	)
);