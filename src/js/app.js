// * custom scripts
import * as browserWebp from "./modules/functions.js"
// import 'bootstrap';


// webp
browserWebp.isWebp()

// сайд-блок
const aside = document.querySelector('.control-bar')
const asideButton = aside.querySelector('.control-bar__button')
const main = document.querySelector('.main')

asideButton.addEventListener('click', () => {
  aside.classList.toggle('control-bar_open')

  // разворот кнопки
  asideButton.classList.toggle('control-bar__button_open')

  // уменьшение/увеличение базового шрифта при открытии/закрытии aside
  main.classList.toggle('main_collapsed')
})