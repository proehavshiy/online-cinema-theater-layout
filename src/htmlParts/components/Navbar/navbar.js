export function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    console.log('body:', body);
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })

  // ? ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })

}

// вызываем эту функцию, если нам надо зафиксировать меню при скролле
export function fixedNav() {
  const nav = document.querySelector('nav')

  //? указываем, сколько надо проскроллить, чтобы меню стало фиксированным
  const breakpoint = 1
  if (window.crollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}

// ! вызов
// burgerMenu()
// window.addEventListener('scroll', fixedNav)