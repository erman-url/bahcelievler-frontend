,async function submitPrice(){

const barcode = document.getElementById("barcodeInput").value.trim()
const urun = document.getElementById("urunInput").value.trim()
let fiyat = document.getElementById("priceInput").value.trim()
const market = document.getElementById("marketSelect").value
const mahalle = document.getElementById("districtSelect").value
const captcha = document.getElementById("captchaInput").value.trim()

const btn = document.querySelector(".fd-submit")

/* captcha kontrol */

if(captcha !== "5"){
alert("Doğrulama hatalı")
return
}

/* veri kontrol */

if(!barcode || !urun || !fiyat){
alert("Eksik bilgi var")
return
}

/* fiyat format normalize */

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
barcode:barcode,
urun:urun,
fiyat:fiyat,
market:market,
mahalle:mahalle
}

let timeout
let controller

try{

/* network timeout */

controller = new AbortController()
timeout = setTimeout(()=>controller.abort(),8000)

/* worker endpoint */

const res = await fetch("/api/fiyat-ekle",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data),
signal:controller.signal
})

clearTimeout(timeout)

/* http hata */

if(!res.ok){

const text = await res.text()
throw new Error("HTTP "+res.status+" : "+text)

}

/* json güvenli parse */

let result

try{
result = await res.json()
}catch{
throw new Error("JSON parse hatası")
}

/* api cevap kontrol */

if(!result.ok){

alert(result.error || "Kayıt başarısız")

btn.disabled=false
btn.innerText="RADARA EKLE"

return
}

/* başarı */

alert("✅ Fiyat başarıyla eklendi")

/* form reset */

document.getElementById("barcodeInput").value=""
document.getElementById("urunInput").value=""
document.getElementById("priceInput").value=""
document.getElementById("captchaInput").value=""

/* modal kapat */

closeModal()

}catch(e){

console.error("Fiyat gönderme hatası:",e)

if(timeout){
clearTimeout(timeout)
}

if(e.name === "AbortError"){
alert("Sunucu yanıt vermedi (timeout)")
}else{
alert("Sunucu bağlantı hatası")
}

}finally{

/* buton tekrar aktif */

btn.disabled=false
btn.innerText="RADARA EKLE"

}

}