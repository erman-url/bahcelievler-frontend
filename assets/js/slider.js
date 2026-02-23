document.addEventListener("DOMContentLoaded", function(){

  if(window.innerWidth < 1024) return;

  const track = document.getElementById("newsTrack");
  if(!track) return;

  const cards = track.children;
  if(cards.length === 0) return;

  let sliderIndex = 0;

  setInterval(()=>{

    const cardWidth = cards[0].offsetWidth + 16;

    sliderIndex = (sliderIndex + 1) % cards.length;

    track.style.transform =
      "translateX(-" + (sliderIndex * cardWidth) + "px)";

  },4000);

});