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

  try{
    const res = await fetch("/api/news");

    if(!res.ok) throw new Error("API error");

    const data = await res.json();

    renderNews(data);

  }catch(err){
    console.warn("NEWS FALLBACK ACTIVE", err);
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