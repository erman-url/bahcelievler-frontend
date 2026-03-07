document.addEventListener("DOMContentLoaded", function(){

const legalHTML = `

  <footer class="legal-footer">
    <div class="legal-inner">
      <a href="hakkimizda.html">Hakkımızda</a>
      <a href="sss.html">SSS</a>
      <a href="kvkk.html">KVKK</a>
      <a href="kullanim-sartlari.html">Kullanım Şartları</a>
    </div>
    <div class="legal-copy">
      © 2026 Bahçelievler Forum
    </div>
  </footer>
  `;

/* footer container */

const footer = document.getElementById("globalFooterLegal");

/* element yoksa script çalışmasın */

if(!footer){
console.debug("Footer container bulunamadı.");
return;
}

footer.innerHTML = legalHTML;

});
