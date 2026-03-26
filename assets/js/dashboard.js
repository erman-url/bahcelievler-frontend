// =======================================
// CONFIG
// =======================================

const CACHE_TIME = 10 * 60 * 1000;
const WEATHER_KEY = "weather_cache_v2";
const CURRENCY_KEY = "currency_cache_v5"; // 🔥 artırıldı

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

    if(!parsed || typeof parsed !== "object") return null;
    if(!parsed.time || !parsed.data) return null;

    if(Date.now() - parsed.time > CACHE_TIME){
      console.log("cache expired:", key);
      return null;
    }

    return parsed.data;

  }catch(e){
    console.log("cache read error", e);
    return null;
  }
}

// =======================================
// FETCH HELPER (GELİŞTİRİLDİ)
// =======================================

async function fetchSafe(url){

  const controller = new AbortController();
  let timeoutId;

  try{

    timeoutId = setTimeout(()=>{
      console.log("FETCH TIMEOUT:", url);
      controller.abort();
    }, 12000); // 🔥 artırıldı

    console.log("FETCH START:", url);

    const res = await fetch(url, {
      signal: controller.signal
    });

    if(!res.ok){
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    console.log("FETCH SUCCESS:", url);

    return data;

  }catch(e){

    if(e.name === "AbortError"){
      console.log("FETCH ABORT:", url);
    }else{
      console.log("FETCH ERROR:", url, e);
    }

    throw e;

  }finally{
    if(timeoutId) clearTimeout(timeoutId);
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

    if(!data || !data.current_weather){
      throw new Error("weather empty");
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
      console.log("weather CACHE used");
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
// DÖVİZ (🔥 GENİŞLETİLDİ)
// =======================================

async function fetchCurrency(){

  console.log("currency fetch start");

  try{

    // 🔥 PRIMARY API
    const data = await fetchSafe(
      "https://api.frankfurter.app/latest?from=EUR&to=TRY,USD"
    );

    if(!data || !data.rates){
      throw new Error("currency empty");
    }

    const TRY = data.rates.TRY;
    const USD = data.rates.USD;

    const usdTry = (TRY / USD).toFixed(2);
    const eurTry = TRY.toFixed(2);

    const result = `USD ${usdTry} • EUR ${eurTry}`;

    console.log("currency OK (primary)", result);

    setCache(CURRENCY_KEY, result);
    renderCurrency(result);

  }catch(e){

    console.log("currency PRIMARY FAIL", e);

    try{

      // 🔥 FALLBACK API
      const data = await fetchSafe(
        "https://open.er-api.com/v6/latest/EUR"
      );

      if(!data || !data.rates){
        throw new Error("fallback empty");
      }

      const TRY = data.rates.TRY;
      const USD = data.rates.USD;

      const usdTry = (TRY / USD).toFixed(2);
      const eurTry = TRY.toFixed(2);

      const result = `USD ${usdTry} • EUR ${eurTry}`;

      console.log("currency OK (fallback)", result);

      setCache(CURRENCY_KEY, result);
      renderCurrency(result);

    }catch(e2){

      console.log("currency FALLBACK FAIL", e2);

      const cache = getCache(CURRENCY_KEY);

      if(cache){
        console.log("currency CACHE used");
        renderCurrency(cache);
      }else{
        renderCurrency("Veri yok");
      }
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
// INIT
// =======================================

function initDashboard(){

  console.log("dashboard init");

  const weatherEl = document.getElementById("weatherBox");
  const currencyEl = document.getElementById("currencyBox");

  if(!weatherEl || !currencyEl){

    if(retryCount < MAX_RETRY){
      retryCount++;
      console.log("DOM hazır değil retry:", retryCount);

      setTimeout(initDashboard, 250);
      return;
    }

    console.warn("Dashboard init iptal edildi");
    return;
  }

  console.log("Dashboard başlatıldı");

  // CACHE FIRST
  const weatherCache = getCache(WEATHER_KEY);
  const currencyCache = getCache(CURRENCY_KEY);

  if(weatherCache){
    console.log("weather cache render");
    renderWeather(weatherCache);
  }

  if(currencyCache){
    console.log("currency cache render");
    renderCurrency(currencyCache);
  }

  // ASYNC FETCH
  fetchWeather();
  fetchCurrency();
}

// =======================================
// START
// =======================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  setTimeout(initDashboard, 0);
}