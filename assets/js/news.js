// ==============================
// NEWS SYSTEM (FRONTEND)
// ==============================

// fallback (API patlarsa boş ekran olmasın)
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
// LOAD NEWS
// ==============================

async function loadNews(){

  const track = document.getElementById("newsTrack");
  if(!track) return;

  const API_URL = "https://icy-thunder-44fb.erman-urel.workers.dev";
  const CACHE_KEY = "news_cache_v1";
  const CACHE_TIME = 60000; // 60 sn

  // =========================
  // 1. CACHE OKU (ANINDA UI)
  // =========================
  try{
    const cached = localStorage.getItem(CACHE_KEY);

    if(cached){
      const parsed = JSON.parse(cached);

      if(Date.now() - parsed.time < CACHE_TIME){
        renderNews(parsed.data); // hızlı yükleme
      }
    }
  }catch(e){
    console.warn("CACHE READ ERROR", e);
  }

  // =========================
  // 2. API CALL (TIMEOUT)
  // =========================
  try{

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5sn

    const res = await fetch(API_URL, {
      signal: controller.signal,
      cache: "no-store"
    });

    clearTimeout(timeout);

    if(!res.ok) throw new Error("API error");

    const data = await res.json();

    // =========================
    // 3. RENDER
    // =========================
    renderNews(data);

    // =========================
    // 4. CACHE YAZ
    // =========================
    try{
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        time: Date.now()
      }));
    }catch(e){
      console.warn("CACHE WRITE ERROR", e);
    }

  }catch(err){

    console.warn("NEWS API ERROR → FALLBACK", err);

    // =========================
    // 5. CACHE FALLBACK
    // =========================
    try{
      const cached = localStorage.getItem(CACHE_KEY);
      if(cached){
        const parsed = JSON.parse(cached);
        renderNews(parsed.data);
        return;
      }
    }catch(e){
      console.warn("CACHE FAIL", e);
    }

    // =========================
    // 6. SON ÇARE
    // =========================
    renderNews(FALLBACK_NEWS);
  }
}

// ==============================
// RENDER
// ==============================

function renderNews(data){

  const track = document.getElementById("newsTrack");
  track.innerHTML = "";

  data.forEach(news => {

    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <div class="news-badge">YENİ</div>
      <img src="${news.image}" loading="lazy">
      <div class="content">${news.title}</div>
    `;

    card.onclick = () => openNewsModal(news);

    track.appendChild(card);
  });

}

// ==============================
// MODAL (GLOBAL)
// ==============================

window.openNewsModal = function(news){

  document.getElementById("modalImage").src = news.image;
  document.getElementById("modalTitle").innerText = news.title;
  document.getElementById("modalDate").innerText = news.date;
  document.getElementById("modalContent").innerText = news.content;

  document.getElementById("newsModal").classList.add("active");

  // scroll lock (premium UX)
  document.body.style.overflow = "hidden";
};

window.closeNewsModal = function(){

  document.getElementById("newsModal").classList.remove("active");

  document.body.style.overflow = "";
};

// backdrop click kapatma
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