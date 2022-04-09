import webp from "gulp-webp"; // делает картинки формата webp
import imagemin from "gulp-imagemin"; // оптимизирует картинки

export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(app.plugins.newer(app.path.build.images)) // проверяем картинки в dist на наличине неизмененных, чтобы их не пересоздавать напрасно
    .pipe( // конвертирует в wepb в режиме продакшена
      app.plugins.if(
        app.isBuild,
        webp()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.dest(app.path.build.images) // выгружаем webp в папку с результатом в режиме продакшена
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.gulp.src(app.path.src.images) // снова в рабочую папку в режиме продакшена
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        app.plugins.newer(app.path.build.images) // снова проверяем на обновления в режиме продакшена
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({ // теперь сжимаем картинки в режиме продакшена
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3 // 0 to 7
        })
      )
    )

    //.pipe(webp()) // конвертирует в wepb
    // .pipe(app.gulp.dest(app.path.build.images)) // выгружаем webp в папку с результатом
    //.pipe(app.gulp.src(app.path.src.images))  // снова в рабочую папку
    // .pipe(app.plugins.newer(app.path.build.images))// снова проверяем на обновления
    // .pipe(imagemin({ // теперь сжимаем картинки
    //   progressive: true,
    //   svgoPlugins: [{ removeViewBox: false }],
    //   interlaced: true,
    //   optimizationLevel: 3 // 0 to 7
    // }))

    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg)) // копируем svg картинки
    .pipe(app.gulp.dest(app.path.build.images)) // и просто вставляем в билд
    .pipe(app.plugins.browserSync.stream())
}