document.addEventListener("DOMContentLoaded", function(){

const legalHTML = `

<footer class="legal-footer premium-footer">
  
  <div class="legal-inner">
    <a href="iletisim.html">Hakkımızda</a>
    <a href="iletisim.html">SSS</a>
    <a href="iletisim.html">KVKK</a>
    <a href="iletisim.html">Kullanım Şartları</a>
  </div>

  <div class="legal-divider"></div>

  <div class="legal-copy">
    © 2026 Bahçelievler Forum / V 1.1
  </div>

</footer>
`;

const footer =
  document.getElementById("globalFooterLegal") ||
  document.getElementById("globalFooter");

if(!footer){
console.debug("Footer container bulunamadı.");
return;
}

if(footer.dataset.loaded === "1"){
return;
}

footer.dataset.loaded = "1";

footer.innerHTML = legalHTML;

});