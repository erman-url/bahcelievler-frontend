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

/* ================= CARD ACTIVE STATE ================= */

cards.forEach(card => {

card.addEventListener("click", function(){

cards.forEach(c => c.classList.remove("active"));
this.classList.add("active");

});

});

/* ================= DEFAULT CONTENT ================= */

if(contentBox){

contentBox.innerHTML = `
<h3>Kurumsal Bilgilendirme</h3>
<hr>
<p>
Bahçelievler Forum; mahalle içi bilgi paylaşımını,
yerel ticareti ve topluluk iletişimini güçlendirmek
amacıyla geliştirilmiş dijital bir platformdur.
</p>

<p>
Yasal bilgiler, gizlilik politikası ve iletişim
kanallarımız hakkında detaylara yukarıdaki menüden
ulaşabilirsiniz.
</p>
`;

}

});

/* =====================================================
   LEGAL CONTENT SWITCH
===================================================== */

window.showLegal = function(type){

const box = document.getElementById("legal-content-area");
if(!box) return;

let html = "";

/* ================= HAKKIMIZDA ================= */

if(type === "about"){

html = `
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
`;

}

/* ================= YASAL UYARI ================= */

else if(type === "disclaimer"){

html = `
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
`;

}

/* ================= KVKK ================= */

else if(type === "kvkk"){

html = `
<h3>🛡 KVKK AYDINLATMA METNİ</h3>
<hr>

<p>
6698 sayılı Kişisel Verilerin Korunması Kanunu
(KVKK) kapsamında kişisel verileriniz
Bahçelievler Forum platformu tarafından
aşağıdaki amaçlarla işlenmektedir.
</p>

<ul>
<li>Platform hizmetlerinin sağlanması</li>
<li>Kullanıcı güvenliğinin sağlanması</li>
<li>İçerik yönetimi ve moderasyon</li>
</ul>

<p>
Toplanan veriler üçüncü kişilerle
satılmaz veya ticari amaçla paylaşılmaz.
</p>
`;

}

/* ================= SSS ================= */

else if(type === "sss"){

html = `
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
`;

}

/* ================= İLETİŞİM ================= */

else if(type === "contact-info"){

html = `
<h3>✉️ BİZE YAZIN</h3>
<hr>

<p>
Platform hakkında öneri, görüş veya
geri bildirimlerinizi bizimle
paylaşabilirsiniz.
</p>

<p>
<strong>E-posta</strong><br>
info@bahcelievlerforum.com.tr
</p>

<p>
Tüm mesajlar incelenmekte ve
gerekli durumlarda geri dönüş
yapılmaktadır.
</p>
`;

}

box.innerHTML = html;

};

})();