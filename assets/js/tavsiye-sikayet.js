/* =======================================
Bahçelievler Forum
Tavsiye & Şikayet Feed
======================================= */

async function loadTS(){

const container = document.getElementById("tsList")

/* container kontrol */

if(!container) return

try{

/* API REQUEST */

const res = await fetch(
"https://bahcelievler-api.erman-urel.workers.dev/api/tavsiye-sikayet"
)

/* API STATUS */

if(!res.ok){
throw new Error("API hata")
}

const data = await res.json()

/* EMPTY */

if(!data || !data.length){

container.innerHTML=`

<div class="empty-box">
Henüz gönderi yok
</div>
`

return
}

/* RESET */

container.innerHTML=""

/* LOOP */

data.forEach(item=>{

const el = document.createElement("div")

el.className="ts-card"

/* STARS */

let stars=""

const rating = parseInt(item.rating)

if(item.type==="tavsiye" && rating){

for(let i=0;i<rating;i++){
stars+="★"
}

}

/* CARD HTML */

el.innerHTML=`

<span class="ts-type ${item.type}">
${item.type==="tavsiye" ? "⭐ Tavsiye" : "⚠️ Şikayet"}
</span>

<div class="ts-title">
${item.title || ""}
</div>

${item.business_name ? `

<div class="ts-business">
${item.business_name}
</div>
` : ""}

${item.image_url ? `<img class="ts-image"
src="${item.image_url}"
loading="lazy">` : ""}

<div class="ts-text">
${item.content || ""}
</div>

${stars ? `

<div class="ts-stars">
${stars}
</div>
` : ""}

<div class="ts-meta">

<span>
${item.district || ""}
</span>

<span>
${item.created_at
? new Date(item.created_at).toLocaleDateString("tr-TR")
: ""}
</span>

</div>

`

container.appendChild(el)

})

}catch(e){

console.error("TS yükleme hatası",e)

container.innerHTML=`

<div class="empty-box">
Gönderiler yüklenemedi
</div>
`

}

}

/* INIT */

document.addEventListener("DOMContentLoaded",loadTS)
