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

/* LOCAL TOKEN */

const tokens = JSON.parse(localStorage.getItem("bf_tokens") || "{}")

/* LOOP */

data.forEach(item=>{

let deleteBtn=""

if(item.delete_token && tokens[item.delete_token]){

deleteBtn = `
<button class="ts-delete"
onclick="deletePost('${item.id}','${item.delete_token}')">
Gönderiyi Sil
</button>
`

}



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
el.dataset.type = type

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

<div class="ts-header">

<span class="ts-badge ${type}">
${type==="tavsiye" ? "⭐ Tavsiye" : "⚠️ Şikayet"}
</span>

</div>

<div class="ts-title">
${escapeHTML(title)}
</div>

${business ? `
<div class="ts-business">
${escapeHTML(business)}
</div>
` : ""}

${image ? `
<img
class="ts-image"
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

<span class="ts-district">
${escapeHTML(district)}
</span>

<span class="ts-date">
${dateText}
</span>

</div>

${deleteBtn}

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



async function deletePost(id,token){

if(!confirm("Gönderiyi silmek istiyor musunuz?")) return

try{

const res = await fetch(
"https://bahcelievler-api.erman-urel.workers.dev/api/tavsiye-sikayet-delete",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:id,
token:token
})
}
)

const data = await res.json()

if(data.ok){

alert("Gönderi silindi")

loadTS()

}else{

alert("Silme başarısız")

}

}catch(e){

alert("Silme hatası")

}

}