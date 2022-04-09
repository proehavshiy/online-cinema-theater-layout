import { configFTP } from '../config/ftp.js'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

export const ftp = () => {
  configFTP.log = util.log // выводит состояние
  const ftpConnect = vinylFTP.create(configFTP) // подключение
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) //говорим галпу, какие файлы обрабатывать
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "FTP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))  // куда поместить конечные обработанные файлы
}