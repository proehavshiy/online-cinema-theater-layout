import gulp from 'gulp'

// импорт путей
import { path } from './gulp/config/path.js'
//импорт общих плагинов
import { plugins } from './gulp/config/plugins.js'


// передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  gulp,
  plugins,
}

// импорт задач
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js'
import { createSvgSprite } from './gulp/tasks/svgSprite.js'
import { zip } from './gulp/tasks/zip.js'
import { ftp } from './gulp/tasks/ftp.js'

// наблюдатель
function watcher() {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html) // gulp.series(html, ftp) // если хотим, чтобы при каждом изменении файлы отправлялись на ftp
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
}

// последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle) //  ttfToWoff, fontsStyle 
// параллельные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, images, scss, js))
// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher))
const build = gulp.series(reset, mainTasks)
const deployZip = gulp.series(reset, mainTasks, zip)
const deployFtp = gulp.series(reset, mainTasks, ftp)

// экспорт сценариев
export { createSvgSprite }
export { dev }
export { build }
export { deployZip }
export { deployFtp }

gulp.task('default', dev)

// // пакеты
// //const sass = require('gulp-sass') // компиляция scss в css
// const { src, dest, watch } = require('gulp')
// const sass = require('gulp-sass')(require('sass')); // компиляция scss в css
// const csso = require('gulp-csso') // минификатор css
// const fileInclude = require('gulp-file-include') // пакет, отвечающий за соединение данных файлов
// const htmlmin = require('gulp-htmlmin') // минификатор html
// const del = require('del') // чистит папки от старого билда в dist
// const autoprefixer = require('gulp-autoprefixer') // добавляет автопрефиксы
// const concat = require('gulp-concat') // соединяет файлы в один
// const sync = require('browser-sync').create() // запускает сервер автоперезагрузки

// function html() { // задача для gulp по сборке html. В консоли вызывется как gulp html
//   return src('src/**.html') //говорим галпу, какие файлы обрабатывать
//     .pipe(fileInclude({
//       prefix: '@@'
//     }))
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//     }))
//     .pipe(dest('dist')) // куда поместить конечные обработанные файлы
// }

// function scss() { // задача по scss. gulp scss
//   return src('src/scss/**.scss')
//     .pipe(sass()) // компиляция scss в css
//     // .pipe(autoprefixer({
//     //   overrideBrowserslist: ['last 2 versions']
//     // }))
//     .pipe(autoprefixer()) // добавляем автопрефиксы к css (настройки указаны в package.json. лучше так делать)
//     .pipe(csso()) // минифицируем css
//     .pipe(concat('index.css')) // соединяем минифицированные css-файлы в 1 единственный
//     .pipe(dest('dist'))
// }

// function clear() {
//   return del('dist')
// }

// function serve() { // сервим сгенерированную итоговую статику
//   sync.init({
//     server: './dist' // инициализация сервера
//   })

//   watch('src/**.html', series(html)).on('change', sync.reload) // слушаем изменения и перезагружаем сервер
//   watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
// }

// exports.html = html // экспорт задачи 
// exports.scss = scss // скомпилировать scss в css
// exports.clear = clear // удалить(очистить) dist
// exports.build = series(clear, html, scss) // gulp build - вызываем последовательно все через series
// exports.serve = series(clear, html, scss, serve) // запустить лок сервер