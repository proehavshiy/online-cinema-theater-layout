import webpack from "webpack-stream"

export const js = () => {
  return app.gulp.src(app.path.src.js, {
    sourcemaps: app.isDev, // карта css, чтобы видеть, в каком месте и файле написан стиль с ошибкой
  })
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpack({ // webpack для обработки js файлов
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: 'app.min.js',
      }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream())
}