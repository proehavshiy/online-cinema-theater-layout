import svgSprite from 'gulp-svg-sprite'

export const createSvgSprite = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {}) //говорим галпу, какие файлы обрабатывать
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../icons/icons.svg',
          // создавать страницу с перечнем иконок
          example: true
        }
      }
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`))  // куда поместить конечные обработанные файлы
}