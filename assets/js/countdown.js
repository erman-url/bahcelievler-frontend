const target=new Date("2026-03-16T00:00:00").getTime();

setInterval(()=>{
const now=new Date().getTime();
const diff=target-now;
if(diff<=0)return;

document.getElementById("days").innerText=Math.floor(diff/(1000*60*60*24));
document.getElementById("hours").innerText=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
document.getElementById("minutes").innerText=Math.floor((diff%(1000*60*60))/(1000*60));
document.getElementById("seconds").innerText=Math.floor((diff%(1000*60))/1000);
},1000);