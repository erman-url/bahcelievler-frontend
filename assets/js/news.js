// Basit in-memory cache
let cache = null;
let lastFetch = 0;

const CACHE_TIME = 60000; // 60 sn

module.exports = async (req, res) => {

  const now = Date.now();

  if(cache && (now - lastFetch < CACHE_TIME)){
    return res.json(cache);
  }

  // 🔥 BURAYI DB'ye bağlayacaksın
  const data = [
    {
      id: 1,
      title: "Semtte Yeni Park Açıldı",
      date: "2026-03-24",
      content: "Parkta yürüyüş alanları, çocuk oyun alanları ve spor ekipmanları bulunuyor...",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    {
      id: 2,
      title: "Trafik Düzenlemesi Başladı",
      date: "2026-03-23",
      content: "Yeni trafik planı ile yoğunluk azaltılması hedefleniyor...",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    }
  ];

  cache = data;
  lastFetch = now;

  res.setHeader("Cache-Control", "public, max-age=60");
  res.json(data);
};