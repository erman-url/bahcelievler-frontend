async function submitPrice(){

const barcode = document.getElementById("barcodeInput").value.trim()
const urun = document.getElementById("urunInput").value.trim()
let fiyat = document.getElementById("priceInput").value.trim()
const market = document.getElementById("marketSelect").value
const mahalle = document.getElementById("districtSelect").value
const captcha = document.getElementById("captchaInput").value.trim()

const btn = document.querySelector(".fd-submit")

/* captcha kontrol */

if(captcha != "5"){

alert("Doğrulama hatalı")
return

}

/* veri kontrol */

if(!barcode || !urun || !fiyat){

alert("Eksik bilgi var")
return

}

/* fiyat format düzelt */

fiyat = fiyat.replace(",",".")
fiyat = parseFloat(fiyat)

if(isNaN(fiyat) || fiyat <= 0){

alert("Fiyat geçersiz")
return

}

/* buton kilitle (spam engelle) */

btn.disabled = true
btn.innerText = "Gönderiliyor..."

const data = {

barcode:barcode,
urun:urun,
fiyat:fiyat,
market:market,
mahalle:mahalle

}

try{

const res = await fetch("/api/fiyat-ekle",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

/* http hata kontrol */

if(!res.ok){

throw new Error("Sunucu hatası")

}

const result = await res.json()

/* api hata kontrol */

if(!result.ok){

alert(result.error || "Kayıt başarısız")

btn.disabled = false
btn.innerText = "RADARA EKLE"

return

}

alert("✅ Fiyat başarıyla eklendi")

/* form temizle */

document.getElementById("barcodeInput").value=""
document.getElementById("urunInput").value=""
document.getElementById("priceInput").value=""
document.getElementById("captchaInput").value=""

/* modal kapat */

closeModal()

}catch(e){

console.error(e)

alert("Sunucu bağlantı hatası")

}

/* buton tekrar aktif */

btn.disabled = false
btn.innerText = "RADARA EKLE"

}