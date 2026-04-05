(function(){

let sliderIndex = 0;
let sliderInterval = null;
let startX = 0;
let initialized = false;

function initNewsSlider(){

  const track = document.getElementById("newsTrack");
  if(!track) return;

  // ⚠️ tekrar init engelle (kritik)
  if(initialized) return;
  initialized = true;

  const cards = track.children;
  const total = cards.length;

  if(total <= 1) return;

  sliderIndex = 0;

  // =========================
  // AUTO SLIDE
  // =========================

  if(sliderInterval){
    clearInterval(sliderInterval);
  }

  sliderInterval = setInterval(() => {
    goToSlide(sliderIndex + 1, total, track);
  }, 4000);

  // =========================
  // TOUCH (MOBILE SWIPE)
  // =========================

  track.addEventListener("touchstart", handleTouchStart, { passive:true });
  track.addEventListener("touchend", handleTouchEnd, { passive:true });

}

function handleTouchStart(e){
  startX = e.touches[0].clientX;

  // swipe sırasında auto stop
  if(sliderInterval){
    clearInterval(sliderInterval);
  }
}

function handleTouchEnd(e){

  const track = document.getElementById("newsTrack");
  if(!track) return;

  const total = track.children.length;

  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if(diff > 50){
    goToSlide(sliderIndex + 1, total, track);
  }else if(diff < -50){
    goToSlide(sliderIndex - 1, total, track);
  }

  // tekrar başlat
  sliderInterval = setInterval(() => {
    goToSlide(sliderIndex + 1, total, track);
  }, 4000);
}

// =========================
// SLIDE FUNCTION
// =========================

function goToSlide(index, total, track){

  if(index >= total) index = 0;
  if(index < 0) index = total - 1;

  sliderIndex = index;

  track.style.transform = `translateX(-${sliderIndex * 100}%)`;
}

// =========================
// GLOBAL EXPORT
// =========================

window.initNewsSlider = initNewsSlider;

})();