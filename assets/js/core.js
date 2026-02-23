/* =====================================================
   Bahçelievler Forum - Core System
   Mobil-first | Merkezi Yönetim | Kota Dostu
===================================================== */

(function(){

/* ================= GLOBAL OBJECT ================= */

window.BF = {

    version: "1.2.0",

    config: {
        apiCacheMinutes: 30,
        weatherCity: "Bahçelievler",
        eventDate: "2026-03-16T00:00:00",
        heroInterval: 5000,
        newsInterval: 4000
    },

    state: {
        isMobile: false,
        heroTimer: null,
        newsTimer: null
    },

    utils: {},
    cache: {}
};


/* ================= UTILITIES ================= */

BF.utils.q = (selector) => document.querySelector(selector);
BF.utils.qa = (selector) => document.querySelectorAll(selector);

BF.utils.formatNumber = (num, digits = 2) =>
    Number(num).toFixed(digits);

BF.utils.storage = {
    set(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key){
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    remove(key){
        localStorage.removeItem(key);
    }
};



/* ================= PERFORMANCE HELPERS ================= */

BF.utils.debounce = function(func, delay){
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(()=>func.apply(this, arguments), delay);
    };
};



/* ================= CACHE SYSTEM ================= */

BF.cache.getCached = function(key){
    const data = BF.utils.storage.get(key);
    if(!data) return null;

    if(Date.now() > data.expiry){
        BF.utils.storage.remove(key);
        return null;
    }
    return data.value;
};

BF.cache.setCached = function(key, value, minutes){
    BF.utils.storage.set(key,{
        value,
        expiry: Date.now() + (minutes * 60 * 1000)
    });
};


/* ================= NAVIGATION ================= */

BF.utils.setActiveNav = function(){

    const currentPath = window.location.pathname
        .replace(/\/$/, "")
        .toLowerCase();

    const navLinks = document.querySelectorAll(
        ".nav-item-modern, .nav-center-wrapper"
    );

    navLinks.forEach(link => {

        const href = (link.getAttribute("href") || "")
            .replace(/\/$/, "")
            .toLowerCase();

        if(!href) return;

        if(currentPath === "" || currentPath === "/index.html"){
            if(href === "/" || href === "/index.html"){
                link.classList.add("active");
            }
            return;
        }

        if(currentPath === href || currentPath.startsWith(href + "/")){
            link.classList.add("active");
        }

    });
};


/* ================= HERO SLIDER ================= */

BF.utils.initHeroSlider = function(){

    const slides = document.querySelectorAll(".hero-slide");
    if(slides.length < 2) return;

    let index = 0;

    BF.state.heroTimer = setInterval(()=>{

        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");

    }, BF.config.heroInterval);

};


/* ================= NEWS SLIDER ================= */

BF.utils.initNewsSlider = function(){

    if(BF.state.isMobile) return;

    const track = document.getElementById("newsTrack");
    if(!track) return;

    const cards = track.children;
    if(cards.length < 2) return;

    let index = 0;

    const move = ()=>{
        const cardWidth = cards[0].offsetWidth + 16;
        index = (index + 1) % cards.length;
        track.style.transform =
            "translateX(-" + (index * cardWidth) + "px)";
    };

    BF.state.newsTimer = setInterval(move, BF.config.newsInterval);

    // Hover'da durdur (desktop UX)
    track.addEventListener("mouseenter", ()=>{
        clearInterval(BF.state.newsTimer);
    });

    track.addEventListener("mouseleave", ()=>{
        BF.state.newsTimer = setInterval(move, BF.config.newsInterval);
    });

};


/* ================= RESPONSIVE UPDATE ================= */

BF.utils.handleResize = BF.utils.debounce(function(){

    const wasMobile = BF.state.isMobile;
    BF.state.isMobile = window.innerWidth < 1024;

    if(wasMobile !== BF.state.isMobile){

        clearInterval(BF.state.newsTimer);

        if(!BF.state.isMobile){
            BF.utils.initNewsSlider();
        }

    }

}, 300);



/* ================= EVENT ENGINE ================= */

BF.utils.getRemainingTime = function(targetDate){

    const now = Date.now();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if(diff <= 0) return null;

    return {
        days: Math.floor(diff / (1000*60*60*24)),
        hours: Math.floor((diff % (1000*60*60*24)) / (1000*60*60)),
        minutes: Math.floor((diff % (1000*60*60)) / (1000*60)),
        seconds: Math.floor((diff % (1000*60)) / 1000)
    };
};


/* ================= CORE INIT ================= */

BF.init = function(){

    document.documentElement.classList.add("bf-loaded");

    BF.state.isMobile = window.innerWidth < 1024;

    BF.utils.setActiveNav();
    BF.utils.initHeroSlider();
    BF.utils.initNewsSlider();

    window.addEventListener("resize", BF.utils.handleResize);

    console.log("BF Core Ready v" + BF.version);
};


/* ================= SAFE START ================= */

document.addEventListener("DOMContentLoaded", BF.init);

})();