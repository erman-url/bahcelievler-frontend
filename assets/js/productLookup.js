async function getProductByBarcode(){

let barcode = document.getElementById("barcodeInput").value

if(!barcode) return

let res = await fetch("/api/urun-getir?barcode="+barcode)

let data = await res.json()

if(data){

document.getElementById("urunInput").value = data.urun_adi

}

}