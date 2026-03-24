// =======================================
// CONFIG
// =======================================

const CACHE_TIME = 10 * 60 * 1000;
const WEATHER_KEY = "weather_cache_v2";
const CURRENCY_KEY = "currency_cache_v2";

// retry kontrol (🔥 yeni)
let retryCount = 0;
const MAX_RETRY = 10;

// =======================================
// CACHE
// =======================================

function setCache(key, data){
  try{
    localStorage.setItem(key, JSON.stringify({
      data,
      time: Date.now()
    }));
  }catch(e){
    console.log("cache write error", e);
  }
}

function getCache(key){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return null;

    const parsed = JSON.parse(raw);

    if(!parsed.time) return null;

    if(Date.now() - parsed.time > CACHE_TIME){
      return null;
    }

    return parsed.data;

  }catch(e){
    console.log("cache read error", e);
    return null;
  }
}

// =======================================
// FETCH HELPER (timeout + safety)
// =======================================

async function fetchSafe(url){

  try{

    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 5000);

    const res = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeout);

    if(!res.ok){
      throw new Error("HTTP " + res.status);
    }

    return await res.json();

  }catch(e){
    console.log("FETCH ERROR:", url, e);
    throw e;
  }
}

// =======================================
// HAVA
// =======================================

async function fetchWeather(){

  console.log("weather fetch start");

  try{

    const data = await fetchSafe(
      "https://api.open-meteo.com/v1/forecast?latitude=41.003&longitude=28.859&current_weather=true"
    );

    if(!data.current_weather){
      throw "weather empty";
    }

    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;

    const result = `📍 Bahçelievler • ${temp}°C • ${wind} km/h`;

    console.log("weather OK", result);

    setCache(WEATHER_KEY, result);
    renderWeather(result);

  }catch(e){

    console.log("weather FAIL", e);

    const cache = getCache(WEATHER_KEY);

    if(cache){
      renderWeather(cache);
    }else{
      renderWeather("Veri yok");
    }
  }
}

function renderWeather(data){
  const el = document.getElementById("weatherBox");

  if(!el){
    console.log("weatherBox yok");
    return;
  }

  el.textContent = data;
  el.classList.remove("loading");
}

// =======================================
// DÖVİZ
// =======================================

async function fetchCurrency(){

  console.log("currency fetch start");

  try{

    const data = await fetchSafe(
      "https://api.frankfurter.app/latest?from=TRY&to=USD,EUR"
    );

    if(!data.rates){
      throw "currency empty";
    }

    const usd = (1 / data.rates.USD).toFixed(2);
    const eur = (1 / data.rates.EUR).toFixed(2);

    const result = `USD ${usd} • EUR ${eur}`;

    console.log("currency OK", result);

    setCache(CURRENCY_KEY, result);
    renderCurrency(result);

  }catch(e){

    console.log("currency FAIL", e);

    const cache = getCache(CURRENCY_KEY);

    if(cache){
      renderCurrency(cache);
    }else{
      renderCurrency("Veri yok");
    }
  }
}

function renderCurrency(data){
  const el = document.getElementById("currencyBox");

  if(!el){
    console.log("currencyBox yok");
    return;
  }

  el.textContent = data;
  el.classList.remove("loading");
}

// =======================================
// INIT (FIXED)
// =======================================

function initDashboard(){

  console.log("dashboard init");

  const weatherEl = document.getElementById("weatherBox");
  const currencyEl = document.getElementById("currencyBox");

  // 🔥 kontrollü retry (sonsuz loop yok)
  if(!weatherEl || !currencyEl){

    if(retryCount < MAX_RETRY){
      retryCount++;
      console.log("DOM hazır değil, retry:", retryCount);
      setTimeout(initDashboard, 200);
      return;
    }

    console.warn("Dashboard init iptal edildi (DOM bulunamadı)");
    return;
  }

  console.log("Dashboard başlatıldı");

  // cache hızlı yükleme
  const weatherCache = getCache(WEATHER_KEY);
  const currencyCache = getCache(CURRENCY_KEY);

  if(weatherCache){
    renderWeather(weatherCache);
  }

  if(currencyCache){
    renderCurrency(currencyCache);
  }

  // async fetch
  fetchWeather();
  fetchCurrency();
}

// =======================================
// START (🔥 DEĞİŞTİ)
// =======================================

document.addEventListener("DOMContentLoaded", initDashboard);