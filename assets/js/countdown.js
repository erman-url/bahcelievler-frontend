/* ==========================================
   Bahçelievler Forum - Countdown
   Kurban Bayramı Arefe Sayacı (2026)
========================================== */

/* ✅ AREFE GÜNÜ (26 Mayıs 2026) */
const target = new Date("2026-05-26T00:00:00").getTime();

/* elementler */

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* eğer bu sayfada countdown yoksa script çalışmasın */

if(!daysEl || !hoursEl || !minutesEl || !secondsEl){

console.debug("Countdown elementi bulunamadı, script durduruldu.");

}else{

let timer; /* ✅ scope fix */

function updateCountdown(){

const now = Date.now();
const diff = target - now;

/* süre bittiyse */

if(diff <= 0){

daysEl.textContent = "0";
hoursEl.textContent = "0";
minutesEl.textContent = "0";
secondsEl.textContent = "0";

clearInterval(timer);
return;

}

/* hesaplama */

const days = Math.floor(diff / (1000*60*60*24));
const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
const seconds = Math.floor((diff % (1000*60)) / 1000);

/* DOM yaz */

daysEl.textContent = days;
hoursEl.textContent = hours;
minutesEl.textContent = minutes;
secondsEl.textContent = seconds;

}

/* ilk çalıştırma */

updateCountdown();

/* interval */

timer = setInterval(updateCountdown,1000);

}