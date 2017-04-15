const gulp      = require('gulp')
const minifyCss = require('gulp-minify-css')
const minifyHtml = require('gulp-minify-html')
const uglify    = require('gulp-uglify')
const deploy    = require('gulp-gh-pages')
const rename    = require('gulp-rename')

// minimized all the html files in src folder
gulp.task('minify-html', function() {
  gulp.src('./src/include/*.html')
  .pipe(minifyHtml())
  .pipe(gulp.dest('public/include'))
})

// minimized the index.html file in src folder
gulp.task('minify-index-html', function() {
  gulp.src('./src/index.html')
  .pipe(minifyHtml())
  .pipe(gulp.dest('public'))
})

// minimized all the css files in src folder
gulp.task('minify-css', function() {
  gulp.src('./src/css/*.css')
  .pipe(minifyCss())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/css'))
})

// minimized all the js files in src folder
gulp.task('minify-js', function() {
  gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/js'))
})

// minimized the service-worker.js file in src folder
gulp.task('minify-service-worker-js', function() {
  gulp.src('./src/service-worker.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public'))
})

// minimized all the css/js files
gulp.task('watch-all', function() {
  gulp.watch('src/include/*.html', ['minify-html'])
  gulp.watch('src/index.html', ['minify-index-html'])
  gulp.watch('src/css/*.css', ['minify-css'])
  gulp.watch('src/js/*.js', ['minify-js'])
  gulp.watch('src/service-worker.js', ['minify-service-worker-js'])
})

gulp.task('deploy', function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy({ 
      remoteUrl: "https://github.com/poanchen/pwa-to-do-list.git",
      branch: "master"
    }))
})

gulp.task('default', ['minify-html', 'minify-index-html', 'minify-css', 'minify-js', 'minify-service-worker-js', 'watch-all'])
