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
"https://bahcelievler-api.erman-urel.workers.dev/api/tavsiye-sikayet",
{
method:"GET",
headers:{
"Accept":"application/json"
}
}
)

/* API STATUS */

if(!res.ok){
throw new Error("API hata")
}

const data = await res.json()

/* DATA VALIDATION */

if(!Array.isArray(data) || data.length===0){

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

/* SAFE DATA */

const type = item.type || ""
const title = item.title || ""
const business = item.business_name || ""
const content = item.content || ""
const image = item.image_url || ""
const district = item.district || ""
const created = item.created_at || ""
const rating = parseInt(item.rating) || 0

const el = document.createElement("div")

el.className="ts-card"

/* STARS */

let stars=""

if(type==="tavsiye" && rating>0){

for(let i=0;i<rating;i++){
stars+="★"
}

}

/* DATE FORMAT */

let dateText=""

if(created){

try{
dateText = new Date(created).toLocaleDateString("tr-TR")
}catch{
dateText=""
}

}

/* CARD HTML */

el.innerHTML=`

<span class="ts-type ${type}">
${type==="tavsiye" ? "⭐ Tavsiye" : "⚠️ Şikayet"}
</span>

<div class="ts-title">
${escapeHTML(title)}
</div>

${business ? `

<div class="ts-business">
${escapeHTML(business)}
</div>

` : ""}

${image ? `

<img class="ts-image"
src="${image}"
loading="lazy"
alt="Gönderi görseli">

` : ""}

<div class="ts-text">
${escapeHTML(content)}
</div>

${stars ? `

<div class="ts-stars">
${stars}
</div>

` : ""}

<div class="ts-meta">

<span>
${escapeHTML(district)}
</span>

<span>
${dateText}
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

/* =======================================
XSS PROTECTION
======================================= */

function escapeHTML(text){

if(!text) return ""

return text
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;")

}

/* =======================================
INIT
======================================= */

document.addEventListener("DOMContentLoaded",loadTS)