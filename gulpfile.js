var gulp   		 = require('gulp'),
	sass   		 = require('gulp-sass'),
	rigger 		 = require('gulp-rigger'),
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

 gulp.task('html-build', function() {
 	gulp.src('app/**/*.html')
 	.pipe(rigger())
 	.pipe(gulp.dest('ending/'))
	.pipe(browserSync.reload({stream: true}))
 });

 gulp.task('css-build', function() {
 	gulp.src('app/css/*.css')
 	.pipe(gulp.dest('ending/css/'))
 	.pipe(browserSync.reload({stream: true}))
 });

gulp.task('browser-sync', function() {
	browserSync({
		server: {
		  baseDir: 'ending'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync','sass'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/css/*.css', ['css-build']);
	gulp.watch('app/**/*.html', ['html-build']);
});

gulp.task('default', ['watch']);
