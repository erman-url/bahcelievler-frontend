document.addEventListener("DOMContentLoaded", function () {

  const currentPath = window.location.pathname.split("/").pop();

  const footerHTML = `
  <nav class="app-footer-nav">

    <a href="index.html" class="nav-item-modern ${currentPath === '' || currentPath === 'index.html' ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-house"></i></div>
      Ana
    </a>

    <a href="sosyal.html" class="nav-item-modern ${currentPath === 'sosyal.html' ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-globe"></i></div>
      Sosyal
    </a>

    <a href="ilanlar.html" class="nav-center-wrapper ${currentPath === 'ilanlar.html' || currentPath === 'ilan_detay.html' ? 'active' : ''}">
      <div class="nav-center"><i class="fa-solid fa-bars"></i></div>
      <div class="nav-center-label">İlanlar</div>
    </a>

    <a href="hizmetler.html" class="nav-item-modern ${currentPath === 'hizmetler.html' ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-layer-group"></i></div>
      Hizmetler
    </a>

    <a href="iletisim.html" class="nav-item-modern ${currentPath === 'iletisim.html' ? 'active' : ''}">
      <div class="icon-wrap"><i class="fa-solid fa-envelope"></i></div>
      İletişim
    </a>

  </nav>
  `;

  document.getElementById("globalFooter").innerHTML = footerHTML;

});

document.addEventListener("click", function(e){
  if(e.target.closest("a")){
    const link = e.target.closest("a");
    if(link.getAttribute("href") === currentPath){
      e.preventDefault();
    }
  }
});