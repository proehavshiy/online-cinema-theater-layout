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

asideButton.addEventListener('click', () => {
  aside.classList.toggle('control-bar_open')
})