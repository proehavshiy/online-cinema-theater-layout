import fs from 'fs'; // плагин ноды, который работает с файловой системой
import fonter from 'gulp-fonter'; // преобразует форматы шрифтов из otf в ttf и woff
import ttf2woff2 from 'gulp-ttf2woff2'; // делает woff2

export const otfToTtf = () => {
  // ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    ))
    // конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  // ищем файлы шрифтов .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.gulpPlumber( // обработка-отображение ошибок
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    ))
    // конвертируем в .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    // выгружаем в папку с результататми
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // ищем файлы шрифтов .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // конвертируем в .woff2
    .pipe(ttf2woff2())
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

// подключение файла шрифтов в файл стилей
export const fontsStyle = () => {
  // файл стилей подключения шрифтов
  const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
  // ароверяем, существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      // проверяем, существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb)
        let newFileOnly
        for (let i = 0; i < fontsFiles.length; i++) {
          // записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0]
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900
            } else {
              fontWeight = 400
            }
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        // если файл есть, выводим сообщение
        console.log("Файл scss/fonts.scss уже существуетю Для обновления файла нужно его удалить!")
      }
    }
  })

  return app.gulp.src(app.path.srcFolder);
  function cb() { }
}