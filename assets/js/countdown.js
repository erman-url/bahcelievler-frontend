const target = new Date("2026-03-16T00:00:00").getTime();

/* countdown elementleri */

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* eğer countdown bu sayfada yoksa script çalışmasın */

if(!daysEl || !hoursEl || !minutesEl || !secondsEl){
console.debug("Countdown elementi bulunamadı, script durduruldu.");
}else{

setInterval(()=>{

```
const now = new Date().getTime();
const diff = target - now;

if(diff <= 0) return;

daysEl.innerText = Math.floor(diff / (1000*60*60*24));
hoursEl.innerText = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
minutesEl.innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
secondsEl.innerText = Math.floor((diff % (1000*60)) / 1000);
```

},1000);

}
