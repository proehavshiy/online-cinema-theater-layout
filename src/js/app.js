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
const mainWidth = main.clientWidth
const allCards = main.querySelectorAll('.card')
console.log('allCards:', allCards);



asideButton.addEventListener('click', () => {
  aside.classList.toggle('control-bar_open')
  main.classList.toggle('main_collapsed')

  console.log('mainWidth before:', mainWidth);
  const containerWidth = main.clientWidth
  console.log('containerWidth inside:', containerWidth);


  // if (!main.classList.contains('main_collapsed')) {




  // allCards.forEach(card => {
  //   const containerWidth = main.clientWidth
  //   // console.log('containerWidth foreach:', containerWidth);
  //   const asideWidth = aside.clientWidth
  //   const cardCurrHeight = card.clientHeight

  //   const currRatio = cardCurrHeight / (containerWidth - asideWidth)
  //   //console.log('currRatio:', currRatio);
  //   const cardNewHeight = containerWidth * currRatio + 'px'
  //   card.style.height = cardNewHeight
  //   //console.log('card.clientHeight:', card.clientHeight);
  //   // const cardCurrWidth = card.clientWidth
  //   //item.style.height = containerHeight + 'px'
  //   // console.log('item.style.height:', item.style.height);
  // })
  // } else {
  //   card.style.height = ''
  // }

})