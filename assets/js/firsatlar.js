/* =========================================
Bahçelievler Forum
Fırsatlar Modülü
========================================= */

let dealType = "online"

/* =========================================
MODAL AÇ / KAPAT
========================================= */

function openDealForm(type){

dealType = type

document.getElementById("dealModal").style.display="flex"

const title = document.getElementById("dealFormTitle")

const linkBox = document.getElementById("linkBox")
const districtBox = document.getElementById("districtBox")

if(type==="online"){

title.innerText="Online Fırsat Paylaş"

linkBox.style.display="block"
districtBox.style.display="none"

}

if(type==="store"){

title.innerText="Mağaza / Esnaf Fırsatı"

linkBox.style.display="none"
districtBox.style.display="block"

}

}

function closeDealForm(){

document.getElementById("dealModal").style.display="none"

document.getElementById("nickname").value=""
document.getElementById("dealTitle").value=""
document.getElementById("storeName").value=""
document.getElementById("dealLink").value=""
document.getElementById("dealContent").value=""
document.getElementById("dealImage").value=""

}

/* =========================================
NICKNAME VALIDATION
========================================= */

function validateNickname(name){

const regex=/^[a-zA-Z0-9.-]{3,10}$/

return regex.test(name)

}

/* =========================================
DOMAIN PARSE
========================================= */

function getDomain(url){

try{

const u = new URL(url)

return u.hostname.replace("[www](http://www).","")

}catch{

return ""

}

}

/* =========================================
LOAD DEALS
========================================= */

async function loadDeals(){

const container = document.getElementById("dealList")

if(!container) return

try{

const res = await fetch("/api/firsatlar")

if(!res.ok) throw new Error("API hata")

const data = await res.json()

if(!Array.isArray(data) || data.length===0){

container.innerHTML=`

<div class="empty-box">
Henüz fırsat paylaşılmamış
</div>
`

return

}

container.innerHTML=""

const tokens = JSON.parse(localStorage.getItem("bf_deal_tokens") || "{}")

data.forEach(item=>{

const type = item.type || ""
const title = item.title || ""
const content = item.content || ""
const nickname = item.nickname || ""
const district = item.district || ""
const created = item.created_at || ""
const link = item.link || ""
const store = item.store_name || ""
const image = item.image_url || ""

let domain = ""
if(link) domain = getDomain(link)

let logo=""
if(domain) logo = `https://logo.clearbit.com/${domain}`

let deleteBtn=""

if(item.delete_token && tokens[item.delete_token]){

deleteBtn = `<button class="ts-delete"
onclick="deleteDeal('${item.id}','${item.delete_token}')">
Gönderiyi Sil </button>`

}

let dateText=""

if(created){

try{
dateText = new Date(created).toLocaleDateString("tr-TR")
}catch{}

}

const el=document.createElement("div")

el.className="deal-card"
el.dataset.type=type

el.innerHTML=`

<span class="deal-badge ${type==="online"?"badge-online":"badge-store"}">
${type==="online"?"🔥 Online Fırsat":"📍 Esnaf Fırsatı"} </span>

<div class="deal-title">
${escapeHTML(title)}
</div>

${domain ? `

<div class="deal-domain">
<img src="${logo}" loading="lazy">
<span>${domain}</span>
</div>
` : ""}

${store ? `

<div class="deal-domain">
${escapeHTML(store)}
</div>
` : ""}

${image ? `<img class="ts-image"
src="${image}"
loading="lazy">` : ""}

<div class="deal-text">
${escapeHTML(content)}
</div>

<div class="deal-meta">

<span>
👤 ${escapeHTML(nickname)}
</span>

<span>
${district ? "📍 "+escapeHTML(district) : dateText}
</span>

</div>

<div style="margin-top:8px;display:flex;gap:8px">

${link ? `<a href="${link}" target="_blank" class="submit-btn" style="flex:1;text-align:center;text-decoration:none">
Siteye Git </a>` : ""}

<button class="submit-btn" style="flex:1"
onclick="shareDeal('${escapeHTML(title)}','${window.location.origin}/firsatlar')">
Paylaş </button>

</div>

${deleteBtn}

`

container.appendChild(el)

})

}catch(e){

console.error("Deals load error",e)

container.innerHTML=`

<div class="empty-box">
Fırsatlar yüklenemedi
</div>
`

}

}

/* =========================================
SUBMIT DEAL
========================================= */

async function submitDeal(){

const nickname=document.getElementById("nickname").value.trim()
const title=document.getElementById("dealTitle").value.trim()
const store=document.getElementById("storeName").value.trim()
const link=document.getElementById("dealLink").value.trim()
const content=document.getElementById("dealContent").value.trim()
const district=document.getElementById("district").value

const imageFile=document.getElementById("dealImage").files[0]

if(!validateNickname(nickname)){
alert("Nickname 3-10 karakter olmalı.")
return
}

if(title.length<4){
alert("Başlık çok kısa")
return
}

if(content.length<10){
alert("Açıklama çok kısa")
return
}

if(window.BFModeration){

const check = BFModeration.validate(content)

if(!check.ok){
alert(check.msg)
return
}

}

if(dealType==="online" && !link.startsWith("http")){
alert("Geçerli bir link giriniz")
return
}

if(imageFile && imageFile.size > 2*1024*1024){
alert("Fotoğraf maksimum 2MB olabilir")
return
}

let imageBase64=null

if(imageFile){

const reader=new FileReader()

imageBase64 = await new Promise(resolve=>{
reader.onload=()=>resolve(reader.result)
reader.readAsDataURL(imageFile)
})

}

try{

const res = await fetch("/api/firsatlar",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
type:dealType,
title:title,
content:content,
nickname:nickname,
store_name:store,
link:link,
district:district,
image:imageBase64
})
})

if(!res.ok) throw new Error("API hata")

const result = await res.json()

if(result.delete_token){

let tokens = JSON.parse(localStorage.getItem("bf_deal_tokens") || "{}")

tokens[result.delete_token] = true

localStorage.setItem("bf_deal_tokens", JSON.stringify(tokens))

}

alert("Fırsat başarıyla paylaşıldı")

closeDealForm()
loadDeals()

}catch(e){

console.error("Deal submit error",e)
alert("Gönderi gönderilemedi")

}

}

/* =========================================
DELETE DEAL
========================================= */

async function deleteDeal(id,token){

if(!confirm("Gönderiyi silmek istiyor musunuz?")) return

try{

const res = await fetch("/api/firsatlar-delete",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
id:id,
token:token
})
})

const data = await res.json()

if(data.ok){
alert("Gönderi silindi")
loadDeals()
}else{
alert("Silme başarısız")
}

}catch{
alert("Silme hatası")
}

}

/* =========================================
SHARE
========================================= */

function shareDeal(title,url){

if(navigator.share){

navigator.share({title:title,url:url})

}else{

navigator.clipboard.writeText(url)
alert("Link kopyalandı")

}

}

/* =========================================
XSS PROTECTION
========================================= */

function escapeHTML(text){

if(!text) return ""

return text
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;")

}

/* =========================================
INIT
========================================= */

document.addEventListener("DOMContentLoaded",()=>{

loadDeals()

const modal = document.getElementById("dealModal")

if(modal){

modal.addEventListener("click",function(e){

if(e.target.id==="dealModal"){
closeDealForm()
}

})

}

})
