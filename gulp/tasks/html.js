import fileinclude from 'gulp-file-include' // пакет, отвечающий за соединение данных файлов
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // обработка картинок как webp (делает из обычных webp)
import versionNumber from "gulp-version-number"; // убирает кеширование файлов в браузере. добавляет к css и js в название версию при каждой сборке проекта

import htmlmin from 'gulp-htmlmin' // минификатор html

// задача для gulp по сборке html. В консоли вызывется как gulp html
export const html = () => {
  return app.gulp.src(app.path.src.html) //говорим галпу, какие файлы обрабатывать
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // меняем пути в картинках с @img на нормальный
    .pipe(
      app.plugins.if( // только в режиме билда делаем webp картинки
        app.isBuild,
        webpHtmlNosvg()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          'value': '%DT%', // текущ дата и время
          'append': {
            'key': '_v',
            'cover': 0,
            'to': ['css', 'js']
          },
          'output': {
            'file': 'gulp/version.json' // файлик версий
          }
        })
      )
    )
    // .pipe(webpHtmlNosvg())
    // .pipe(versionNumber({
    //   'value': '%DT%', // текущ дата и время
    //   'append': {
    //     'key': '_v',
    //     'cover': 0,
    //     'to': ['css', 'js']
    //   },
    //   'output': {
    //     'file': 'gulp/version.json' // файлик версий
    //   }
    // }))

    // .pipe(htmlmin({
    //   collapseWhitespace: true,
    //   removeComments: true,
    // }))
    .pipe(
      app.plugins.if( // минификатор html
        app.isBuild,
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))  // куда поместить конечные обработанные файлы
    .pipe(app.plugins.browserSync.stream()) // обновление при  изменении файлов
}

// function html() { 
//   return src('src/**.html') 
//     .pipe(fileInclude({
//       prefix: '@@'
//     }))
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//     }))
//     .pipe(dest('dist'))
// }