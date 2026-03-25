async function loadLastPrices(){

let res;
let data;

try{

res = await fetch("/api/son-fiyatlar");

if(!res.ok){
throw new Error("HTTP " + res.status);
}

try{
data = await res.json();
}catch(e){
console.error("JSON parse hatası", e);
throw new Error("Veri okunamadı");
}

}catch(e){

console.error("Son fiyatlar yüklenemedi:", e);

const container = document.getElementById("lastPrices");

if(container){
container.innerHTML = "<h3>Son Eklenen Fiyatlar</h3><div>Veri yüklenemedi</div>";
}

return;
}

/* container kontrol */
let container = document.getElementById("lastPrices");

if(!container){
console.warn("lastPrices container yok");
return;
}

/* data array kontrol */
if(!Array.isArray(data)){
console.warn("API beklenen formatta değil");
container.innerHTML = "<h3>Son Eklenen Fiyatlar</h3><div>Veri hatalı</div>";
return;
}

/* başlık */
container.innerHTML = "<h3>Son Eklenen Fiyatlar</h3>";

/* fragment ile performans fix */
const fragment = document.createDocumentFragment();

data.forEach(p => {

/* güvenli alanlar */
const urun = (p.urun_adi || p.urun || "Ürün").toString();
const market = (p.market || "-").toString();
const mahalle = (p.mahalle || "-").toString();
const fiyat = Number(p.fiyat) || 0;

/* tarih güvenliği */
let formatted = "-";
try{
const date = new Date(p.created_at);
formatted = date.toLocaleDateString("tr-TR");
}catch{}

/* element oluştur (XSS güvenli) */
const wrapper = document.createElement("div");
wrapper.className = "fd-product";

const left = document.createElement("div");

const title = document.createElement("strong");
title.textContent = urun;

const meta = document.createElement("div");
meta.className = "fd-meta";
meta.textContent = market + " • " + mahalle;

const dateEl = document.createElement("div");
dateEl.className = "fd-date";
dateEl.textContent = formatted;

const verified = document.createElement("div");
verified.className = "fd-verified";
verified.textContent = "✔ Etiket doğrulandı";

left.appendChild(title);
left.appendChild(meta);
left.appendChild(dateEl);
left.appendChild(verified);

const price = document.createElement("div");
price.className = "fd-price";
price.textContent = fiyat + " TL";

wrapper.appendChild(left);
wrapper.appendChild(price);

fragment.appendChild(wrapper);

});

/* tek seferde DOM'a bas */
container.appendChild(fragment);

}