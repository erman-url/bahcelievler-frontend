/* =====================================================
   Bahçelievler Forum - Contact Module
   Kurumsal Bilgi Merkezi
   Menü → Dinamik içerik sistemi
   ANAKOD uyumlu | Premium UX
===================================================== */

(function(){

if(window.__BF_CONTACT__) return;
window.__BF_CONTACT__ = true;

/* ================= MODULE REGISTER ================= */

BF.registerModule("contact", function(){

const page = document.getElementById("contactPage");
if(!page) return;

console.log("Contact module loaded");

/* ================= ELEMENTS ================= */

const contentBox = document.getElementById("legal-content-area");
const cards = document.querySelectorAll(".contact-link-card");

if(!contentBox || !cards.length) return;

/* ================= CONTENT DATA ================= */

const CONTENT = {

about:`
<h3>ℹ️ HAKKIMIZDA</h3>
<hr>
<p>
Bahçelievler Forum, İstanbul Bahçelievler ilçesine
özel geliştirilmiş yerel bir dijital mahalle
platformudur.
</p>
<p>
Platform; ilan paylaşımı, mahalle duyuruları,
fırsat bildirimi ve komşular arası bilgi
paylaşımını tek bir çatı altında buluşturmayı
amaçlar.
</p>
<p>
Amacımız; semt içi iletişimi güçlendirmek,
yerel ekonomiyi desteklemek ve güvenli
bir dijital mahalle ekosistemi oluşturmaktır.
</p>
`,

disclaimer:`
<h3>⚖️ KULLANIM KOŞULLARI VE SORUMLULUK REDDİ</h3>
<hr>
<p>
Bahçelievler Forum kullanıcıların içerik
paylaşabildiği dijital bir platformdur.
</p>
<p>
Platform üzerinde yer alan ilan, yorum,
fırsat bildirimi ve diğer içeriklerin
hukuki sorumluluğu tamamen içeriği
oluşturan kullanıcıya aittir.
</p>
<p>
Bahçelievler Forum, kullanıcılar tarafından
paylaşılan içeriklerin doğruluğunu,
güncelliğini veya hukuka uygunluğunu
garanti etmez.
</p>
`,

kvkk:`
<h3>🛡 KVKK AYDINLATMA METNİ</h3>
<hr>
<p>
6698 sayılı Kişisel Verilerin Korunması Kanunu
(KVKK) kapsamında kişisel verileriniz
Bahçelievler Forum platformu tarafından
işlenmektedir.
</p>
<ul>
<li>Platform hizmetlerinin sağlanması</li>
<li>Kullanıcı güvenliğinin sağlanması</li>
<li>İçerik yönetimi</li>
</ul>
<p>
Veriler üçüncü kişilerle satılmaz veya
ticari amaçla paylaşılmaz.
</p>
`,

sss:`
<h3>❓ SIKÇA SORULAN SORULAR</h3>
<hr>
<b>Bahçelievler Forum nedir?</b>
<p>
Yerel ilanlar, mahalle duyuruları ve
topluluk paylaşımları için oluşturulmuş
dijital bir mahalle platformudur.
</p>

<b>Platform ücretsiz mi?</b>
<p>
Evet. Platformun temel kullanım
özellikleri ücretsizdir.
</p>

<b>İlan nasıl verilir?</b>
<p>
İlanlar bölümünden yeni ilan
oluşturabilirsiniz.
</p>
`,

contact:`
<h3>✉️ BİZE YAZIN</h3>
<hr>
<p>
Platform hakkında öneri ve geri bildirimlerinizi
bizimle paylaşabilirsiniz.
</p>

<p>
<strong>E-posta</strong><br>
info@bahcelievlerforum.com.tr
</p>
`
};

/* ================= SET CONTENT ================= */

function setContent(type){

const html = CONTENT[type];
if(!html) return;

contentBox.classList.add("fade");

setTimeout(()=>{
contentBox.innerHTML = html;
contentBox.classList.remove("fade");
},120);

}

/* ================= CARD CLICK ================= */

cards.forEach(card => {

card.addEventListener("click", function(e){

e.preventDefault();

cards.forEach(c => c.classList.remove("active"));
this.classList.add("active");

/* type detect */

let type = "";

if(this.innerText.includes("Hakkımızda")) type = "about";
else if(this.innerText.includes("Yasal")) type = "disclaimer";
else if(this.innerText.includes("KVKK")) type = "kvkk";
else if(this.innerText.includes("Sorulan")) type = "sss";
else type = "contact";

setContent(type);

});

});

/* ================= DEFAULT ================= */

setContent("about");
cards[0].classList.add("active");

});

})();