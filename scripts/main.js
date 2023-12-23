function changePlaceholder(input) {
    input.placeholder = 'Enter the text...'
}

function resetPlaceholder(input) {
    input.placeholder = 'Search'
}

const themeButton = document.getElementById('themeButton');

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});






document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('container');

  function loadContent(url) {
      fetch(url)
        .then(response => response.text())
          .then(html => {
            container.innerHTML = html;
          })
          .catch(error => {
              console.error('İçerik yüklenirken bir hata oluştu:', error);
          });
  }


  document.getElementById('trial').addEventListener('click', () => {
    loadContent('main.html');
  })
});