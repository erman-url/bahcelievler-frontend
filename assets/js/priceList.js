async function loadLastPrices(){

let res = await fetch("/api/son-fiyatlar")
let data = await res.json()

let container = document.getElementById("lastPrices")

container.innerHTML = "<h3>Son Eklenen Fiyatlar</h3>"

data.forEach(p => {

const date = new Date(p.created_at)
const formatted = date.toLocaleDateString("tr-TR")

container.innerHTML += `

<div class="fd-product">

<div>

<strong>${p.urun_adi || p.urun}</strong>

<div class="fd-meta">${p.market} • ${p.mahalle}</div>

<div class="fd-date">${formatted}</div>

<div class="fd-verified">✔ Etiket doğrulandı</div>

</div>

<div class="fd-price">${p.fiyat} TL</div>

</div>

`

})

}