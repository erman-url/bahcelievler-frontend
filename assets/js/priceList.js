async function loadLastPrices(){

let res = await fetch("/api/son-fiyatlar")

let data = await res.json()

let container = document.getElementById("lastPrices")

container.innerHTML=""

data.forEach(p => {

container.innerHTML += `

<div class="fd-product">

<div>

<strong>${p.urun_adi}</strong>

<div class="fd-meta">${p.market} • ${p.mahalle}</div>

<div class="fd-date">${p.created_at}</div>

<div class="fd-verified">✔ Etiket doğrulandı</div>

</div>

<div class="fd-price">${p.fiyat} TL</div>

</div>

`

})

}