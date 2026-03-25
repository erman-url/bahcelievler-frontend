/* ==========================================
   Bahçelievler Forum - Countdown
   Kurban Bayramı Arefe Sayacı (2026)
========================================== */

/* ✅ AREFE GÜNÜ (26 Mayıs 2026) */
const target = new Date("2026-05-26T00:00:00").getTime();

/* GLOBAL GUARD (double init engelle) */
if(window.__BF_COUNTDOWN__) {
  console.warn("Countdown zaten çalışıyor");
}else{
window.__BF_COUNTDOWN__ = true;

/* SAFE INIT WRAPPER */
function initCountdown(){

/* elementler */
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* eğer bu sayfada countdown yoksa script çalışmasın */
if(!daysEl || !hoursEl || !minutesEl || !secondsEl){

console.debug("Countdown elementi bulunamadı, script durduruldu.");
return;

}

let timer; /* ✅ scope fix */

/* update fonksiyon */
function updateCountdown(){

const now = Date.now();
const diff = target - now;

/* süre bittiyse */
if(diff <= 0){

daysEl.textContent = "0";
hoursEl.textContent = "0";
minutesEl.textContent = "0";
secondsEl.textContent = "0";

if(timer){
clearInterval(timer);
timer = null;
}
return;

}

/* hesaplama */
const days = Math.floor(diff / (1000*60*60*24));
const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
const seconds = Math.floor((diff % (1000*60)) / 1000);

/* DOM yaz (string garantili) */
daysEl.textContent = String(days);
hoursEl.textContent = String(hours);
minutesEl.textContent = String(minutes);
secondsEl.textContent = String(seconds);

}

/* ilk çalıştırma */
updateCountdown();

/* interval (önce temizle) */
if(timer){
clearInterval(timer);
}

timer = setInterval(updateCountdown,1000);

}

/* ================= START ================= */

/* BF core varsa module olarak bağla */
if(window.BF && typeof BF.registerModule === "function"){
BF.registerModule("countdown", initCountdown);
}else{

/* klasik fallback */
if(document.readyState === "loading"){
document.addEventListener("DOMContentLoaded", initCountdown);
}else{
setTimeout(initCountdown,0);
}

}

}