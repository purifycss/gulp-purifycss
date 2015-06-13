# gulp-purifycss

> Clean unnecessary CSS

![status](https://secure.travis-ci.org/purifycss/gulp-purifycss.svg?branch=master)

## Information

<table>
<tr>
<td>Package</td><td>gulp-purifycss</td>
</tr>
<tr>
<td>Description</td>
<td>Clean unnecessary CSS</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```js
var purify = require('gulp-purify');

gulp.task('scripts', function() {
  return gulp.src(
    './public/app/**/*.js',
    './public/**/*.html')
    .pipe(purify('./public/styles/**/*.css'))
    .pipe(gulp.dest('./dist/'));
});
```

This will purify your CSS files by comparing them to all of the source files provided to `gulp.src`.


This will purify styles into `./dist/new.css`.
