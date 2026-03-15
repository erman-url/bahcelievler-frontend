async function submitPrice(){

let barcode = document.getElementById("barcodeInput").value
let urun = document.getElementById("urunInput").value
let fiyat = document.getElementById("priceInput").value
let market = document.getElementById("marketSelect").value
let mahalle = document.getElementById("districtSelect").value
let captcha = document.getElementById("captchaInput").value


/* captcha kontrol */

if(captcha != 5){

alert("Doğrulama hatalı")

return

}


/* veri kontrol */

if(!barcode || !urun || !fiyat){

alert("Eksik bilgi var")

return

}


let data = {

barcode:barcode,
urun:urun,
fiyat:fiyat,
market:market,
mahalle:mahalle

}


try{

let res = await fetch("/api/fiyat-ekle",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})


let result = await res.text()

alert("Fiyat başarıyla eklendi")

closeModal()

}catch(e){

console.log(e)

alert("Bir hata oluştu")

}

}