(function(){

  function init(){

    // Eğer nav varsa sil (her ihtimale karşı)
    const old = document.querySelector(".app-footer-nav");
    if(old) old.remove();

    const nav = document.createElement("nav");
    nav.className = "app-footer-nav";

    nav.innerHTML = `
      <a href="index.html">
        <i class="fa-solid fa-house"></i>
        <span>Ana</span>
      </a>

      <a href="sosyal.html">
        <i class="fa-solid fa-globe"></i>
        <span>Sosyal</span>
      </a>

      <a href="ilanlar.html" class="center">
        <i class="fa-solid fa-plus"></i>
      </a>

      <a href="hizmetler.html">
        <i class="fa-solid fa-layer-group"></i>
        <span>Hizmet</span>
      </a>

      <a href="iletisim.html">
        <i class="fa-solid fa-envelope"></i>
        <span>İletişim</span>
      </a>
    `;

    document.body.appendChild(nav);

    setActive(nav);
  }

  function setActive(nav){

    let current = window.location.pathname.split("/").pop();

    if(current === "" || current === "/"){
      current = "index.html";
    }

    nav.querySelectorAll("a").forEach(link=>{
      const href = link.getAttribute("href");

      if(href === current){
        link.classList.add("active");
      }
    });
  }

  // DOM hazır
  document.addEventListener("DOMContentLoaded", init);

  // fallback (geç yüklenen sayfalar için)
  window.addEventListener("load", init);

})();