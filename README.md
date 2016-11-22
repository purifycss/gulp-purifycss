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

## Options
The (optional) `options` argument

Type: `Object`

Properties of options object:

`minify:` Set to `true` to minify. Default: `false`.

`output:` Filepath to write purified CSS to. Returns raw string if `false`. Default: `false`.

`info:` Logs info on how much CSS was removed if `true`. Default: `false`.

`rejected:` Logs the CSS rules that were removed if `true`. Default: `false`.

`whitelist:` Array of selectors to always leave in. Ex. `['button-active', '*modal*']`` this will leave any selector that includes `modal` in it and selectors that match `button-active`. (wrapping the string with *'s, leaves all selectors that include it)

## Usage

```js
var purify = require('gulp-purifycss');

gulp.task('css', function() {
  return gulp.src('./public/app/example.css')
    .pipe(purify(['./public/app/**/*.js', './public/**/*.html'], {options}))
    .pipe(gulp.dest('./dist/'));
});
```
