/* ======================================
Bahçelievler Forum
Merkezi Moderasyon Sistemi
====================================== */

window.BFModeration = {

minLength:10,
maxLength:1200,

bannedWords:[
"amk",
"aq",
"orospu",
"piç",
"siktir",
"salak",
"gerizekalı",
"mal",
"yarrak"
"sik"
"amcık"
],

bannedLinks:[
"http://",
"https://",
"www."
],

validate(text){

if(!text) return {ok:false,msg:"Metin boş"}

const t = text.trim()

if(t.length < this.minLength){
return {ok:false,msg:"Metin çok kısa"}
}

if(t.length > this.maxLength){
return {ok:false,msg:"Metin çok uzun"}
}

/* KÜFÜR */

for(const w of this.bannedWords){

if(t.toLowerCase().includes(w)){
return {ok:false,msg:"Uygunsuz kelime içeriyor"}
}

}

/* LINK SPAM */

for(const l of this.bannedLinks){

if(t.includes(l)){
return {ok:false,msg:"Link paylaşımı yasak"}
}

}

/* TEKRAR KELİME */

const words = t.split(" ")

let repeat=0

for(let i=1;i<words.length;i++){

if(words[i]===words[i-1]){
repeat++
}

}

if(repeat>4){
return {ok:false,msg:"Spam içerik algılandı"}
}

return {ok:true}

}

}