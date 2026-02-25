document.addEventListener("DOMContentLoaded", function () {

  const headerHTML = `
  <header class="top-header">
    <div class="header-inner">
      <div class="menu-btn" id="openMenu" aria-label="Menüyü Aç">
        <i class="fas fa-bars"></i>
      </div>
      <div>
        <div class="header-title">BAHÇELİEVLER FORUM</div>
        <div class="header-sub">Semt • Bilgi • Yaşam Portalı</div>
      </div>
    </div>
  </header>
  `;

  const footerHTML = `
  <nav class="app-footer-nav">
    <a href="/" class="nav-item-modern">
      <div class="icon-wrap"><i class="fa-solid fa-house"></i></div>
      Ana
    </a>

    <a href="/sosyal.html" class="nav-item-modern">
      <div class="icon-wrap"><i class="fa-solid fa-globe"></i></div>
      Sosyal
    </a>

    <a href="ilanlar.html" class="nav-center-wrapper">
      <div class="nav-center"><i class="fa-solid fa-bars"></i></div>
      <div class="nav-center-label">İlanlar</div>
    </a>

    <a href="/hizmetler.html" class="nav-item-modern">
      <div class="icon-wrap"><i class="fa-solid fa-layer-group"></i></div>
      Hizmetler
    </a>

    <a href="/iletisim.html" class="nav-item-modern">
      <div class="icon-wrap"><i class="fa-solid fa-envelope"></i></div>
      İletişim
    </a>
  </nav>
  `;

  const headerContainer = document.getElementById("globalHeader");
  const footerContainer = document.getElementById("globalFooter");

  if (headerContainer) headerContainer.innerHTML = headerHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;

 

});