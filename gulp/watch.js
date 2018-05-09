var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

  console.log("hello");
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  gulp.watch('./app/index.html', function(){
    browserSync.reload();
  });

  gulp.watch('./app/assets/style.css', function(){
    gulp.start('cssInject');
  });


  gulp.watch('./app/assets/**.js', function(){
    gulp.start('scriptsRefresh');
  });

});

gulp.task('cssInject', function(){
  return gulp.src('./app/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function(){
  browserSync.reload();
});
