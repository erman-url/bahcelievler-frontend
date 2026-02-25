document.addEventListener("DOMContentLoaded", function(){

  /* ================= HEADER ================= */

  const headerHTML = `
  <header class="top-header">
    <div class="header-inner">
      <div class="menu-btn" id="openMenu">
        <i class="fas fa-bars"></i>
      </div>
      <div>
        <div class="header-title">BAHÇELİEVLER FORUM</div>
        <div class="header-sub">Semt • Bilgi • Yaşam Portalı</div>
      </div>
    </div>
  </header>
  `;

  document.getElementById("globalHeader").innerHTML = headerHTML;


  /* ================= SLIDE MENU ================= */

  const sideMenuHTML = `
  <div class="overlay" id="overlay"></div>

  <nav class="side-menu" id="sideMenu">
    <div class="side-menu-header">
      <h2>MENÜ</h2>
      <i class="fas fa-times" id="closeMenu"></i>
    </div>
    <ul>
      <li><a href="index.html">Ana</a></li>
      <li><a href="sosyal.html">Keşfet</a></li>
      <li><a href="ilanlar.html">İlanlar</a></li>
      <li><a href="hizmetler.html">Hizmetler</a></li>
      <li><a href="iletisim.html">İletişim</a></li>
    </ul>
  </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", sideMenuHTML);


  /* ================= MENU EVENTS ================= */

  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  openBtn.addEventListener("click", ()=>{
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  function closeMenu(){
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  }

});