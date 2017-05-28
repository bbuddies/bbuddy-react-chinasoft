import gulp from 'gulp'
import gutil from 'gulp-util'
import notify from 'gulp-notify'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config'
import mocha from 'gulp-mocha'
import template from 'gulp-template'
import rename from 'gulp-rename'
import minimist from 'minimist'
import pluralize from 'pluralize'
import _ from 'lodash'
import istanbul from 'gulp-istanbul'
import {Instrumenter} from 'isparta'

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

gulp.task("istanbul", function(){
  return gulp.src(['app/**/*.js'])
    .pipe(istanbul({
      instrumenter: Instrumenter,
      instrumention: {
        excludes: ['app/components/*', 'app/constants/*', 'app/containers/*', 'app/store/*']
      },
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
})

gulp.task("coverage", ["istanbul"], function(){
  return gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha())
    .on('error', gutil.log)
    .pipe(istanbul.writeReports())
})

gulp.task("build", callback => {
  webpack(webpackConfig(dev), function (err, stats) {
    if (err) throw new gutil.PluginError("build", err)
    gutil.log("[build]", stats.toString({
      chunks: false,
      colors: true
    }))
    callback()
  });
});

gulp.task("server", () => {
  new WebpackDevServer(webpack(webpackConfig(dev)))
    .listen(8100, "localhost", function (err) {
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
