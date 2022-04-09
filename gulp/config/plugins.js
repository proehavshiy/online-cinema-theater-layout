import replace from "gulp-replace"; // поиск и замена
import gulpPlumber from "gulp-plumber"; // обработка ошибок
import notify from "gulp-notify" // сообщения (подсказки)
import browserSync from "browser-sync"; // локальный сервер
import newer from "gulp-newer"; // проверка обновления картинки в dist. Если там есть картинки, которые не изменилисб, обрабатывать повторно не будет. повышает скорость
import ifPlugin from "gulp-if"; // условное ветвление

export const plugins = {
  replace,
  gulpPlumber,
  notify,
  browserSync,
  newer,
  if: ifPlugin,
}