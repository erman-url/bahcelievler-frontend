// ==============================
// NEWS SYSTEM (FRONTEND)
// ==============================

const FALLBACK_NEWS = [
  {
    id: 1,
    title: "Semtte Yeni Park Açıldı",
    date: "2026-03-24",
    content: "Parkta yürüyüş alanları, çocuk oyun alanları ve spor ekipmanları bulunuyor...",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  }
];

// ==============================
// GLOBAL SLIDER STATE
// ==============================

let sliderIndex = 0;
let sliderInterval = null;
let startX = 0;

// ==============================
// LOAD NEWS
// ==============================

async function loadNews(){

  const track = document.getElementById("newsTrack");
  if(!track) return;

  const API_URL = "https://icy-thunder-44fb.erman-urel.workers.dev";
  const CACHE_KEY = "news_cache_v1";
  const CACHE_TIME = 60000;

  // CACHE
  try{
    const cached = localStorage.getItem(CACHE_KEY);
    if(cached){
      const parsed = JSON.parse(cached);
      if(Date.now() - parsed.time < CACHE_TIME){
        renderNews(parsed.data);
      }
    }
  }catch(e){
    console.warn("CACHE READ ERROR", e);
  }

  // API
  try{
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(API_URL, {
      signal: controller.signal,
      cache: "no-store"
    });

    clearTimeout(timeout);

    if(!res.ok) throw new Error("API error");

    const data = await res.json();

    renderNews(data);

    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      time: Date.now()
    }));

  }catch(err){

    console.warn("NEWS API ERROR → FALLBACK", err);

    try{
      const cached = localStorage.getItem(CACHE_KEY);
      if(cached){
        const parsed = JSON.parse(cached);
        renderNews(parsed.data);
        return;
      }
    }catch(e){}

    renderNews(FALLBACK_NEWS);
  }
}

// ==============================
// RENDER
// ==============================

function renderNews(data){

  const track = document.getElementById("newsTrack");
  if(!track) return;

  // reset slider
  stopSlider();
  sliderIndex = 0;
  track.style.transform = "translateX(0)";

  if(!data || data.length === 0){
    track.innerHTML = `
      <div class="news-card">
        <div class="content">Henüz haber bulunamadı</div>
      </div>
    `;
    return;
  }

  track.innerHTML = "";

  const fragment = document.createDocumentFragment();

  data.forEach(news => {

    const card = document.createElement("div");
    card.className = "news-card";

    const image = news.image || "assets/images/default-news.jpg";

    card.innerHTML = `
      <div class="news-badge">YENİ</div>
      <img src="${image}" loading="lazy" alt="${news.title}">
      <div class="content">${news.title}</div>
    `;

    card.onclick = () => openNewsModal(news);

    fragment.appendChild(card);
  });

  track.appendChild(fragment);

  startSlider();
  initTouch(track);
}

// ==============================
// SLIDER
// ==============================

function startSlider(){

  const track = document.getElementById("newsTrack");
  if(!track) return;

  const total = track.children.length;
  if(total <= 1) return;

  stopSlider();

  sliderInterval = setInterval(() => {
    sliderIndex++;
    if(sliderIndex >= total) sliderIndex = 0;

    track.style.transform = `translateX(-${sliderIndex * 100}%)`;
  }, 4000);
}

function stopSlider(){
  if(sliderInterval){
    clearInterval(sliderInterval);
    sliderInterval = null;
  }
}

// ==============================
// TOUCH (MOBILE)
// ==============================

function initTouch(track){

  track.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
    stopSlider();
  });

  track.addEventListener("touchend", e=>{
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    const total = track.children.length;

    if(diff > 50){
      sliderIndex++;
    }else if(diff < -50){
      sliderIndex--;
    }

    if(sliderIndex >= total) sliderIndex = 0;
    if(sliderIndex < 0) sliderIndex = total - 1;

    track.style.transform = `translateX(-${sliderIndex * 100}%)`;

    startSlider();
  });
}

// ==============================
// VISIBILITY FIX (TAB SWITCH)
// ==============================

document.addEventListener("visibilitychange", () => {
  if(document.hidden){
    stopSlider();
  }else{
    startSlider();
  }
});
// ==============================
// DATE FORMATTER
// ==============================

function formatDate(dateStr){
  if(!dateStr) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

// ==============================
// MODAL
// ==============================

window.openNewsModal = function(news){

  const imageEl = document.getElementById("modalImage");
  const titleEl = document.getElementById("modalTitle");
  const dateEl = document.getElementById("modalDate");
  const contentEl = document.getElementById("modalContent");

  // güvenli set
  imageEl.src = news.image || "";
  titleEl.innerText = news.title || "";
  contentEl.innerText = news.content || "";

  // 🔥 KRİTİK FIX (created_at destek)
  const date = news.created_at || news.date || "";
  dateEl.innerText = formatDate(date);

  document.getElementById("newsModal").classList.add("active");

  // scroll lock
  document.body.style.overflow = "hidden";
};

window.closeNewsModal = function(){

  document.getElementById("newsModal").classList.remove("active");

  document.body.style.overflow = "";
};

// backdrop click
document.addEventListener("click", function(e){
  const modal = document.getElementById("newsModal");
  if(e.target === modal){
    closeNewsModal();
  }
});

// ==============================
// INIT
// ==============================

document.addEventListener("DOMContentLoaded", loadNews);