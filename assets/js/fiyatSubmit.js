async function submitPrice(event){

/* doğru buton */
const btn = event.target

/* double click engelle */
if(btn.disabled) return

/* inputlar */
const barcode = document.getElementById("barcodeInput").value.trim()
const urun = document.getElementById("urunInput").value.trim()
let fiyat = document.getElementById("priceInput").value.trim()
const market = document.getElementById("marketSelect").value
const mahalle = document.getElementById("districtSelect").value
const captcha = document.getElementById("captchaInput").value.trim()

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

let timeout
let controller

try{

/* timeout sistemi */
controller = new AbortController()
timeout = setTimeout(()=>controller.abort(),8000)

/* API çağrısı */
const res = await fetch("/api/fiyat-ekle",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data),
signal:controller.signal
})

clearTimeout(timeout)

/* HTTP kontrol */
if(!res.ok){
const text = await res.text()
throw new Error("HTTP "+res.status+" : "+text)
}

/* JSON parse */
let result
try{
result = await res.json()
}catch{
throw new Error("JSON parse hatası")
}

/* API kontrol */
if(!result || !result.ok){
alert(result?.error || "Kayıt başarısız")
return
}

/* başarı akışı */
closeModal()
alert("✅ Fiyat başarıyla eklendi")

/* listeyi yenile */
if (window.refreshPrices) {
  window.refreshPrices()
}

/* form temizle */
document.getElementById("barcodeInput").value=""
document.getElementById("urunInput").value=""
document.getElementById("priceInput").value=""
document.getElementById("captchaInput").value=""

}catch(e){

console.error("Fiyat gönderme hatası:", e)

/* timeout temizle */
if(timeout) clearTimeout(timeout)

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