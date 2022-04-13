// * custom scripts
import * as browserWebp from "./modules/functions.js"
import * as navbar from "../htmlParts/components/Navbar/navbar.js"
// import 'bootstrap';

// подключение бургера
navbar.burgerMenu()
window.addEventListener('scroll', navbar.fixedNav)

// webp
browserWebp.isWebp()


// сайд-блок
const aside = document.querySelector('.control-bar')
const asideButton = aside.querySelector('.control-bar__button')



// смена ширины карточек в зависимости от ширины блока main 
const main = document.querySelector('.main')



asideButton.addEventListener('click', () => {
  aside.classList.toggle('control-bar_open')

  // уменьшение/увеличение базового шрифта при открытии/закрытии aside
  main.classList.toggle('main_collapsed')
})