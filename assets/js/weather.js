/* ================================================
   Weather + Currency System
   Cache'li | Kota Dostu | BF Core Entegre
================================================ */

(function(){

/* ================= WEATHER ================= */

async function fetchWeather(){

    const cacheKey = "bf_weather";
    const cached = BF.cache.getCached(cacheKey);

    if(cached){
        renderWeather(cached);
        return;
    }

    try {

        // Bahçelievler koordinatları (sabit - DB yükü yok)
        const lat = 41.0030;
        const lon = 28.8597;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        const res = await fetch(url);
        const data = await res.json();

        const temp = data.current_weather.temperature;

        BF.cache.setCached(cacheKey, temp, BF.config.apiCacheMinutes);

        renderWeather(temp);

    } catch (e) {
        console.warn("Weather error", e);
    }
}

function renderWeather(temp){
    const el = BF.utils.q("#weatherValue");
    if(el){
        el.textContent = temp + "°C";
    }
}


/* ================= CURRENCY ================= */

async function fetchCurrency(){

    const cacheKey = "bf_currency";
    const cached = BF.cache.getCached(cacheKey);

    if(cached){
        renderCurrency(cached);
        return;
    }

    try {

        const url = "https://api.frankfurter.app/latest?from=EUR&to=TRY,USD";

        const res = await fetch(url);
        const data = await res.json();

        const eurTry = data.rates.TRY;
        const usdTry = eurTry / data.rates.USD;

        const currencyData = {
            eur: BF.utils.formatNumber(eurTry),
            usd: BF.utils.formatNumber(usdTry)
        };

        BF.cache.setCached(cacheKey, currencyData, BF.config.apiCacheMinutes);

        renderCurrency(currencyData);

    } catch (e){
        console.warn("Currency error", e);
    }
}

function renderCurrency(data){

    const usdEl = BF.utils.q("#usdValue");
    const eurEl = BF.utils.q("#eurValue");

    if(usdEl) usdEl.textContent = data.usd;
    if(eurEl) eurEl.textContent = data.eur;
}


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
    fetchCurrency();
});

})();