async function submitPrice(event){

/* event güvenliği */
if(!event || !event.target){
console.error("Event hatalı");
return;
}

/* doğru buton */
const btn = event.target

/* double click engelle */
if(btn.disabled) return

/* inputlar (null safety eklendi) */
const barcodeEl = document.getElementById("barcodeInput")
const urunEl = document.getElementById("urunInput")
const fiyatEl = document.getElementById("priceInput")
const marketEl = document.getElementById("marketSelect")
const mahalleEl = document.getElementById("districtSelect")
const captchaEl = document.getElementById("captchaInput")

if(!barcodeEl || !urunEl || !fiyatEl || !captchaEl){
console.error("Form elementleri eksik")
alert("Form hatası")
return
}

const barcode = barcodeEl.value.trim()
const urun = urunEl.value.trim()
let fiyat = fiyatEl.value.trim()
const market = marketEl ? marketEl.value : ""
const mahalle = mahalleEl ? mahalleEl.value : ""
const captcha = captchaEl.value.trim()

/* captcha */
if(captcha !== "5"){
alert("Doğrulama hatalı")
return
}

/* zorunlu alanlar */
if(!barcode || !urun || !fiyat){
alert("Eksik bilgi var")
return
}

/* fiyat normalize */
fiyat = fiyat.replace(",",".")
fiyat = parseFloat(fiyat)

if(isNaN(fiyat) || fiyat <= 0){
alert("Fiyat geçersiz")
return
}

/* buton kilitle */
btn.disabled = true
btn.innerText = "Gönderiliyor..."

const data = {
barcode,
urun,
fiyat,
market,
mahalle
}

let timeout = null
let controller = null

try{

/* timeout sistemi (safe) */
controller = new AbortController()

timeout = setTimeout(()=>{
if(controller){
controller.abort()
}
},8000)

/* API çağrısı */
const res = await fetch("/api/fiyat-ekle",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data),
signal:controller.signal
})

/* timeout temizle */
if(timeout){
clearTimeout(timeout)
timeout = null
}

/* HTTP kontrol */
if(!res.ok){
let text = ""
try{
text = await res.text()
}catch{}
throw new Error("HTTP "+res.status+" : "+text)
}

/* JSON parse (safe) */
let result = null
try{
result = await res.json()
}catch(e){
console.error("JSON parse error:", e)
throw new Error("JSON parse hatası")
}

/* API kontrol */
if(!result || result.ok !== true){
alert(result?.error || "Kayıt başarısız")
return
}

/* başarı akışı */
if(typeof closeModal === "function"){
closeModal()
}

alert("✅ Fiyat başarıyla eklendi")

/* listeyi yenile */
if (window.refreshPrices && typeof window.refreshPrices === "function") {
window.refreshPrices()
}

/* form temizle */
barcodeEl.value=""
urunEl.value=""
fiyatEl.value=""
captchaEl.value=""

}catch(e){

console.error("Fiyat gönderme hatası:", e)

/* timeout temizle */
if(timeout){
clearTimeout(timeout)
timeout = null
}

/* hata mesajı */
if(e.name === "AbortError"){
alert("Sunucu yanıt vermedi (timeout)")
}else{
alert("Sunucu bağlantı hatası")
}

}finally{

/* buton aç */
btn.disabled = false
btn.innerText = "RADARA EKLE"

}

}