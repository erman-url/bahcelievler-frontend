function startScanner(){

document.getElementById("scannerArea").style.display="block"

Quagga.init({

inputStream:{

name:"Live",
type:"LiveStream",
target:document.querySelector('#scanner'),
constraints:{
facingMode:"environment"
}

},

decoder:{

readers:[
"ean_reader",
"ean_8_reader",
"code_128_reader"
]

}

},function(err){

if(err){
console.log(err)
return
}

Quagga.start()

})

Quagga.onDetected(function(data){

let barcode=data.codeResult.code

document.getElementById("barcodeInput").value=barcode

stopScanner()

})

}

function stopScanner(){

Quagga.stop()

document.getElementById("scannerArea").style.display="none"

}