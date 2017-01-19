# gulp-purifycss

Clean unnecessary CSS with [PurifyCSS](https://github.com/purifycss/purifycss)

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

## Installation
Currently the package is not published on NPM. To install from the git repository:

`npm i --save-dev purifycss/gulp-purifycss`

## Usage

```js
var purify = require('gulp-purifycss');

gulp.task('css', function() {
  return gulp.src('./public/app/example.css')
    .pipe(purify(['./public/app/**/*.js', './public/**/*.html']))
    .pipe(gulp.dest('./dist/'));
});
```
