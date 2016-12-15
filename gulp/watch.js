var gulp = require('gulp');

gulp.task('watch', function(){
    gulp.watch(['./scripts/**/*.js'], ['webpack']);
    gulp.watch('./style/**/*.scss', ['sass']);
});
