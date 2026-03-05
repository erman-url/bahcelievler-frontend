/* ======================================
Bahçelievler Forum
Merkezi Moderasyon Sistemi
====================================== */

window.BFModeration = {

minLength:10,
maxLength:1200,

/* --------------------------------------
KÜFÜR FİLTRESİ
-------------------------------------- */

bannedWords:[
"amk",
"aq",
"orospu",
"piç",
"siktir",
"salak",
"gerizekalı",
"mal",
"yarrak",
"sik",
"amcık"
],

/* --------------------------------------
LINK SPAM
-------------------------------------- */

bannedLinks:[
"http://",
"https://",
"www."
],

/* --------------------------------------
ANLAMSIZ METİN KALIPLARI
-------------------------------------- */

nonsensePatterns:[
"asdasd",
"qweqwe",
"zxc",
"123123",
"aaaa",
"bbbb",
"cccc"
],

/* --------------------------------------
REKLAM / HİZMET SPAM
-------------------------------------- */

spamKeywords:[
"tesisatçı",
"kombici",
"klimacı",
"telefon tamiri",
"reklam",
"seo hizmeti",
"kredi verilir",
"bahis",
"iddaa",
"casino",
"escort",
"ucuz takipçi"
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

const lower = t.toLowerCase()

/* ======================================
KÜFÜR KONTROL
====================================== */

for(const w of this.bannedWords){

if(lower.includes(w)){
return {ok:false,msg:"Uygunsuz kelime içeriyor"}
}

}

/* ======================================
LINK SPAM
====================================== */

for(const l of this.bannedLinks){

if(lower.includes(l)){
return {ok:false,msg:"Link paylaşımı yasak"}
}

}

/* ======================================
REKLAM SPAM
====================================== */

for(const s of this.spamKeywords){

if(lower.includes(s)){
return {ok:false,msg:"Reklam içerikli mesaj yasak"}
}

}

/* ======================================
AYNI HARF 3+ TEKRAR
örnek: aaa, ffff
====================================== */

if(/(.)\1{2,}/i.test(lower)){
return {ok:false,msg:"Aynı harfi çok fazla tekrar edemezsiniz"}
}

/* ======================================
ANLAMSIZ METİN
====================================== */

for(const p of this.nonsensePatterns){

if(lower.includes(p)){
return {ok:false,msg:"Anlamsız içerik algılandı"}
}

}

/* ======================================
TELEFON NUMARASI
====================================== */

if(/\b\d{10,11}\b/.test(lower)){
return {ok:false,msg:"Telefon numarası paylaşımı yasak"}
}

/* ======================================
ÇOK FAZLA EMOJI
====================================== */

const emojiCount = (t.match(/[\u{1F300}-\u{1F6FF}]/gu) || []).length

if(emojiCount > 6){
return {ok:false,msg:"Çok fazla emoji kullanımı"}
}

/* ======================================
KELİME TEKRARI
====================================== */

const words = lower.split(/\s+/)

let repeat=0

for(let i=1;i<words.length;i++){

if(words[i]===words[i-1]){
repeat++
}

}

if(repeat>4){
return {ok:false,msg:"Spam içerik algılandı"}
}

/* ======================================
HARF ÇEŞİTLİLİĞİ ANALİZİ
====================================== */

const letters = lower.replace(/[^a-zçğıöşü]/g,"")

const uniqueLetters = new Set(letters)

if(letters.length>20 && uniqueLetters.size<4){
return {ok:false,msg:"Metin anlamlı görünmüyor"}
}

return {ok:true}

}

}