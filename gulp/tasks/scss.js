import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

import cleanCss from 'gulp-clean-css' // сжытие CSS файла
import webpcss from 'gulp-webpcss' //  вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer' // добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries' // группировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
  return app.gulp.src(app.path.src.scss, {
    sourcemaps: app.isDev, // карта css, чтобы видеть, в каком месте и файле написан стиль с ошибкой
  })
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/')) // меняем пути в картинках с @img на нормальный
    .pipe(sass({ //компилятор scss в css с настройками
      outputStyle: 'expanded'
    }))
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({ //делает поддержку webp в тех браузерах, где поддерживается. В остальных - обычный вариант картинки будет
          webpClass: '.webp',
          noWebpClass: '.no-webp'
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({ // добавляем автопрефиксы к css (настройки по версиям браузеров указаны в package.json. лучше так делать)
          grid: true,
          cascade: true
        })
      )
    )
    // .pipe(groupCssMediaQueries())
    // .pipe(webpcss({ //делает поддержку webp в тех браузерах, где поддерживается. В остальных - обычный вариант картинки будет
    //   webpClass: '.webp',
    //   noWebpClass: '.no-webp'
    // }))
    // .pipe(autoPrefixer({ // добавляем автопрефиксы к css (настройки по версиям браузеров указаны в package.json. лучше так делать)
    //   grid: true,
    //   cascade: true
    // }))
    // раскомментить если нужен не сжатый дубль файла стилей
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss()
      )
    )
    // .pipe(cleanCss())
    .pipe(rename({ // переименовать файл на выходе
      extname: '.min.css'
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream()) // обновление при  изменении файлов
}