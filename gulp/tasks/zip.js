import del from "del"
import zipPlugin from "gulp-zip"

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`) // удаляем zip-архив, который существует
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) //говорим галпу, какие файлы обрабатывать
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'))  // куда поместить конечные обработанные файлы
}