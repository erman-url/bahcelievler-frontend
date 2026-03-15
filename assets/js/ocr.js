async function runOCR(file){

if(!file) return

const worker = await Tesseract.createWorker("tur")

const { data: { text } } = await worker.recognize(file)

await worker.terminate()

parseOCR(text)

}


function parseOCR(text){

console.log("OCR TEXT:",text)

/* fiyat yakalama */

let price = text.match(/[0-9]+[.,][0-9]{2}/)

if(price){

document.getElementById("priceInput").value =
price[0].replace(",", ".")

}

/* barkod yakalama */

let barcode = text.match(/[0-9]{8,13}/)

if(barcode){

document.getElementById("barcodeInput").value =
barcode[0]

}

}