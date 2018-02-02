var gulp = require('gulp')
var to5 = require('gulp-6to5')

gulp.task('es6-es5', function(){
  return gulp.src([
      './src/serverapp.js',
      './src/*/**.js',
      './src/*/*/**.js'
    ]
  )
  .pipe(to5())
  .pipe(gulp.dest('./public/build/es5/'))
})

gulp.task('watch', function(){
  gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js'], ['es6-es5'])
})

gulp.task('default', ['es6-es5', 'watch'], function(){})
