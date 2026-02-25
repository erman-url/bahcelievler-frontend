document.addEventListener("DOMContentLoaded", function(){

  const current = window.location.pathname;

  const footerHTML = `
  <nav class="app-footer-nav">

    <a href="index.html" class="nav-item-modern ${current.includes('index') ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-house"></i></div>
      Ana
    </a>

    <a href="sosyal.html" class="nav-item-modern ${current.includes('sosyal') ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-globe"></i></div>
      Sosyal
    </a>

    <a href="ilanlar.html" class="nav-center-wrapper ${current.includes('ilan') ? 'active' : ''}">
      <div class="nav-center"><i class="fa-solid fa-bars"></i></div>
      <div class="nav-center-label">İlanlar</div>
    </a>

    <a href="hizmetler.html" class="nav-item-modern ${current.includes('hizmet') ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-layer-group"></i></div>
      Hizmetler
    </a>

    <a href="iletisim.html" class="nav-item-modern ${current.includes('iletisim') ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-envelope"></i></div>
      İletişim
    </a>

  </nav>
  `;

  document.getElementById("globalFooterNav").innerHTML = footerHTML;

});