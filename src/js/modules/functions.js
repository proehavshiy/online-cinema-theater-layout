// проверка поддержки webp, добавление класса webp или no-webp для HTML
export function isWebp() {
  // проверка поддержки webp
  function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  // добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    if (support == true) {
      document.querySelector('html').classList.add('webp');
    } else {
      document.querySelector('html').classList.add('no-webp');
    }
  });
}


