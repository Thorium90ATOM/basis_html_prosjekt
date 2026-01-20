(function () {
  const btn = document.getElementById('demoBtn');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  if (btn) {
    btn.addEventListener('click', () => {
      console.log('Hei! JS fungerer.');
      btn.textContent = 'Klikket!';
    });
  }
})();
