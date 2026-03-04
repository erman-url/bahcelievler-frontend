/* =====================================================
Bahçelievler Forum - Duyurular Module
API → Worker → D1
===================================================== */

BF.registerModule("duyurular", async function(){

const container = document.getElementById("duyuruList")

if(!container) return

try{

/* API REQUEST */

const res = await fetch("https://bahcelievler-api.erman-urel.workers.dev/api/duyurular",{
headers:{
"accept":"application/json"
}
})

if(!res.ok){
throw new Error("API hata")
}

const data = await res.json()

/* EMPTY STATE */

if(!data || !data.length){

container.innerHTML = `

<div class="empty-box">
Henüz yayınlanmış duyuru bulunmuyor.
</div>
`
return
}

/* RENDER */

container.innerHTML=""

data.forEach(item=>{

const el = document.createElement("div")

el.className="duyuru-card"

/* PRIORITY STYLE */

let badgeClass="badge-normal"

if(item.priority === "onemli"){
badgeClass="badge-important"
}

if(item.priority === "acil"){
badgeClass="badge-urgent"
}

/* SAFE TEXT */

const title = escapeHtml(item.title || "")
const content = escapeHtml(item.content || "")

/* DATE */

let date=""

if(item.published_at){
date = new Date(item.published_at).toLocaleDateString("tr-TR")
}

/* CARD HTML */

el.innerHTML=`

${item.image_url ? `
<img
class="duyuru-image"
src="${item.image_url}"
loading="lazy"
alt="${title}"

>

` : ""}

<div class="duyuru-title">
${title}
</div>

<div class="duyuru-text">
${content}
</div>

<div class="duyuru-meta">

<span class="duyuru-date">
${date}
</span>

<span class="duyuru-badge ${badgeClass}">
${item.priority || "duyuru"}
</span>

</div>

`

container.appendChild(el)

})

}catch(e){

console.error("Duyurular yüklenemedi:",e)

container.innerHTML=`

<div class="empty-box">
Duyurular yüklenemedi.
</div>
`

}

/* SECURITY */

function escapeHtml(text){

const div = document.createElement("div")
div.innerText = text
return div.innerHTML

}

})
