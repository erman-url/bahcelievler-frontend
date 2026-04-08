async function loadLastPrices(){

let res;
let json;
let data = [];

const API_BASE = location.hostname === "127.0.0.1"
  ? "https://www.bahcelievlerforum.com.tr"
  : "";

/* ===============================
FETCH
=============================== */
try{

res = await fetch(API_BASE + "/api/son-fiyatlar");

if(!res.ok){
throw new Error("HTTP " + res.status);
}

try{
json = await res.json();
}catch(e){
console.error("JSON parse hatası", e);
throw new Error("Veri okunamadı");
}

/* 🔥 API FORMAT FIX */
data = json?.data || [];

}catch(e){

console.error("Son fiyatlar yüklenemedi:", e);

const container = document.getElementById("lastPrices");

if(container){
container.innerHTML = `
<h3>Son Eklenen Fiyatlar</h3>
<div style="padding:10px;color:#999">
Veri yüklenemedi
</div>`;
}

return;
}

/* ===============================
CONTAINER
=============================== */
const container = document.getElementById("lastPrices");

if(!container){
console.warn("lastPrices container yok");
return;
}

/* ===============================
DATA VALIDATION
=============================== */
if(!Array.isArray(data) || data.length === 0){

container.innerHTML = `
<h3>Son Eklenen Fiyatlar</h3>
<div style="padding:10px;color:#999">
Henüz veri yok
</div>`;

return;
}

/* ===============================
RENDER
=============================== */
container.innerHTML = "<h3>Son Eklenen Fiyatlar</h3>";

const fragment = document.createDocumentFragment();

data.forEach(p => {

/* güvenli alanlar */
const urun = String(p.urun_adi || p.urun || "Ürün");
const market = String(p.market || "-");
const mahalle = String(p.mahalle || "-");
const fiyat = Number(p.fiyat) || 0;

/* tarih */
let formatted = "-";
if(p.created_at){
try{
const date = new Date(p.created_at);
formatted = date.toLocaleDateString("tr-TR");
}catch{}
}

/* DOM */
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

/* 🔥 fiyat format */
price.textContent = fiyat.toFixed(2) + " TL";

wrapper.appendChild(left);
wrapper.appendChild(price);

fragment.appendChild(wrapper);

});

/* tek seferde bas */
container.appendChild(fragment);

}