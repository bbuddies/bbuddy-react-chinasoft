import gulp from 'gulp'
import gutil from 'gulp-util'
import notify from 'gulp-notify'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config'
import mocha from 'gulp-mocha'
import template from 'gulp-template'
import rename from 'gulp-rename'
import clean from 'gulp-clean'
import minimist from 'minimist'
import pluralize from 'pluralize'
import _ from 'lodash'
import run from 'gulp-run'

const dev = !process.argv.includes('--production')

gulp.task("default", ["server", "mocha"], () => {
  gulp.watch(["app/**/*", "sass/**/*"], ["build"]);
  gulp.watch(["app/**/*", "test/**/*.js"], ["mocha"]);
});

gulp.task("mocha", () => {
  return gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha())
    .on('error', gutil.log)
    .on('error', notify.onError("Error: <%= error.message %>"));
})

gulp.task("coverage", ["clean:coverage"], () => {
  return run('nyc mocha').exec()
})

gulp.task("build", ["clean:build"], callback => {
  webpack(webpackConfig(dev), (err, stats) => {
    if (err) throw new gutil.PluginError("build", err)
    gutil.log("[build]", stats.toString({
      chunks: false,
      colors: true
    }))
    callback()
  });
});

gulp.task("clean", ["clean:build", "clean:coverage"])

gulp.task("clean:build", () => {
  return gulp.src(['dist'], {read: false})
    .pipe(clean())
})

gulp.task("clean:coverage", () => {
  return gulp.src(['coverage'], {read: false})
    .pipe(clean())
})

gulp.task("server", () => {
  new WebpackDevServer(webpack(webpackConfig(dev)))
    .listen(8100, "localhost", err => {
      if (err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "http://localhost:8100/")
    })
});

gulp.task('actions', () => {
  let argv = minimist(process.argv.slice(2))
  let {entity} = argv
  let entities = pluralize(entity)
  gulp.src('templates/apiActions.js')
    .pipe(template({
      entity,
      entities,
      ENTITY: entity.toUpperCase(),
      ENTITIES: entities.toUpperCase(),
      Entity: _.startCase(entity),
      Entities: _.startCase(entities)
    }, {interpolate: /<%=([\s\S]+?)%>/g}))
    .pipe(rename(entity + '.generated.js'))
    .pipe(gulp.dest('app/actions/'))
})
