document.addEventListener("DOMContentLoaded", function () {

  function bindMenu() {

    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    if (!openBtn || !sideMenu || !overlay) return;

    openBtn.addEventListener("click", function () {
      sideMenu.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    overlay.addEventListener("click", function () {
      sideMenu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // layout inject sonrası küçük gecikme
  setTimeout(bindMenu, 50);

});

function openMenu(){
  document.querySelector(".side-menu").classList.add("active");
  document.querySelector(".overlay").classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeMenu(){
  document.querySelector(".side-menu").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");

  document.body.style.overflow = "";
}