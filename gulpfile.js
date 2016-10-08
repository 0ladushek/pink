var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync')
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var sourcemaps = require('gulp-sourcemaps');
var copy = require('gulp-contrib-copy');

var cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

// var paths = {
// 	html:['./dev/*.html'],
// 	css:['./dev/less/**/*.less']
// 	// script:['./dev/']
// }



//=========================================

gulp.task("style", function() {
  gulp.src("dev/less/style.less")
    .pipe(plumber())
    .pipe(less())
    // .pipe(postcss([
    //   autoprefixer({browsers: [
    //     "last 1 version",
    //     "last 2 Chrome versions",
    //     "last 2 Firefox versions",
    //     "last 2 Opera versions",
    //     "last 2 Edge versions"
    //   ]})
    // ]))
    .pipe(gulp.dest("./dev/css"))
    .pipe(reload({stream:true}));
});


gulp.task('mincss', function() {
  return gulp.src('./dev/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'));
});


// RELOAD HTML
gulp.task('html', function(){
	gulp.src(paths.html)
	.pipe(reload({stream:true}));
})

gulp.task('watcher',function(){
	gulp.watch('./dev/less/**/*.less', ['style']);
	gulp.watch('./dev/*.html', ['html']);
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./dev"
    },
    // port: 8080,
    open: true,
    // notify: false
  });
});


gulp.task('mincss', function() {
  return gulp.src('./dev/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('imagemin', () =>
    gulp.src('./dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
);
// gulp.task('copyimg', function() {
//     gulp.src('./dev/img/*')
//         .pipe(copy())
//         .pipe(gulp.dest('public/img'));
//       });
gulp.task('copyhtml', function() {
    gulp.src('./dev/*.html')
        .pipe(copy())
        .pipe(gulp.dest('public/'));
});
gulp.task('copyjs', function() {
    gulp.src('./dev/js/*.js')
        .pipe(copy())
        .pipe(gulp.dest('public/js'));
});
gulp.task('default', ['style','watcher', 'browserSync']);

gulp.task('build', ['copyimg', 'copyhtml', 'copyjs', 'style','mincss','imagemin']);