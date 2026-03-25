/* =====================================================
   Bahçelievler Forum - Core System
   Mobil-first | Merkezi Yönetim | Kota Dostu
===================================================== */

(function(){

if(window.__BF_CORE__) return;
window.__BF_CORE__ = true;

/* ================= GLOBAL OBJECT ================= */

window.BF = {

    version: "1.4.1", // 🔥 version bump

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
        newsTimer: null,
        initialized: false,
        eventsBound: false // 🔥 new
    },

    utils: {},
    cache: {},
    ui: {},

    /* 🔥 MODULE SYSTEM */
    modules: {}
};


/* ================= MODULE SYSTEM ================= */

BF.registerModule = function(name, init){
    if(typeof init !== "function") return;
    BF.modules[name] = init;
};

BF.runModules = function(){

    Object.keys(BF.modules).forEach(name=>{
        try{
            BF.modules[name]();
        }catch(e){
            console.warn("Module error:", name, e);
        }
    });

};


/* ================= UTILITIES ================= */

BF.utils.q = (selector) => document.querySelector(selector);
BF.utils.qa = (selector) => document.querySelectorAll(selector);

BF.utils.formatNumber = (num, digits = 2) =>
    Number(num).toFixed(digits);

BF.utils.storage = {
    set(key, value){
        try{
            localStorage.setItem(key, JSON.stringify(value));
        }catch(e){}
    },
    get(key){
        try{
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        }catch(e){
            return null;
        }
    },
    remove(key){
        try{
            localStorage.removeItem(key);
        }catch(e){}
    }
};


/* ================= PERFORMANCE ================= */

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


/* ================= UI ENGINE ================= */
/* -------- HEADER -------- */
BF.ui.renderHeader = function(){

    const container = document.getElementById("globalHeader");
    if(!container) return;

    if(container.innerHTML.trim() !== "") return; // 🔥 double render fix

    container.innerHTML = `
        <div class="top-header">
            <div class="header-inner">

                <div class="header-left">
                    <i id="menuBtn" class="fa-solid fa-bars"></i>
                </div>

                <div class="header-center">
                    <div class="header-title">BAHÇELİEVLER FORUM</div>
                    <div class="header-sub">Semt · Bilgi · Yaşam Portalı</div>
                </div>

                <div class="header-right">
                    <i id="searchBtn" class="fa-solid fa-magnifying-glass"></i>
                </div>

            </div>
        </div>

        <div class="search-panel">
            <input 
                id="globalSearchInput" 
                type="text" 
                placeholder="Tüm sitede ara..."
                autocomplete="off"
            />
        </div>
    `;
};


/* -------- FOOTER NAV -------- */
BF.ui.renderFooterNav = function(){

    if(document.querySelector(".app-footer-nav")) return;

    const nav = document.createElement("nav");
    nav.className = "app-footer-nav";

    nav.innerHTML = `...`; // aynen korunur

    document.body.appendChild(nav);
};


/* -------- SIDE MENU -------- */
BF.ui.renderSideMenu = function(){

    if(document.querySelector(".side-menu")) return;

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const menu = document.createElement("div");
    menu.className = "side-menu";

    menu.innerHTML = `...`;

    document.body.appendChild(overlay);
    document.body.appendChild(menu);
};


/* -------- FOOTER -------- */
BF.ui.renderFooter = function(){

    const el = document.getElementById("globalFooter");
    if(!el) return;

    if(el.innerHTML.trim() !== "") return;

    el.innerHTML = `
        <footer class="corporate-footer">
            ...
        </footer>
    `;
};


/* -------- MENU EVENTS -------- */
BF.ui.bindMenuEvents = function(){

    if(BF.state.eventsBound) return; // 🔥 duplicate bind fix
    BF.state.eventsBound = true;

    document.addEventListener("click", function(e){

        if(e.target.closest("#menuBtn")){
            document.querySelector(".side-menu")?.classList.add("active");
            document.querySelector(".overlay")?.classList.add("active");
        }

        if(e.target.closest("#closeMenu") || e.target.classList.contains("overlay")){
            document.querySelector(".side-menu")?.classList.remove("active");
            document.querySelector(".overlay")?.classList.remove("active");
        }

        if(e.target.closest(".menu-item")){
            document.querySelector(".side-menu")?.classList.remove("active");
            document.querySelector(".overlay")?.classList.remove("active");
        }

        if(e.target.closest("#searchBtn")){
            const panel = document.querySelector(".search-panel");
            if(panel){
                panel.classList.toggle("active");
                const input = document.getElementById("globalSearchInput");
                if(panel.classList.contains("active")){
                    input?.focus();
                }
            }
        }

    });

    document.addEventListener("keydown", function(e){
        if(e.target.id === "globalSearchInput" && e.key === "Enter"){
            const q = e.target.value.trim();
            if(!q) return;
            window.location.href = "arama.html?q=" + encodeURIComponent(q);
        }
    });

};


/* ================= HERO ================= */

BF.utils.initHeroSlider = function(){

    const slides = document.querySelectorAll(".hero-slide");
    if(slides.length < 2) return;

    if(BF.state.heroTimer){
        clearInterval(BF.state.heroTimer); // 🔥 leak fix
    }

    let index = 0;

    BF.state.heroTimer = setInterval(()=>{
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, BF.config.heroInterval);

};


/* ================= NEWS ================= */

BF.utils.initNewsSlider = function(){

    if(BF.state.isMobile) return;

    const track = document.getElementById("newsTrack");
    if(!track) return;

    const cards = track.children;
    if(cards.length < 2) return;

    if(BF.state.newsTimer){
        clearInterval(BF.state.newsTimer); // 🔥 leak fix
    }

    let index = 0;

    const move = ()=>{
        const cardWidth = cards[0].offsetWidth + 16;
        index = (index + 1) % cards.length;
        track.style.transform =
            "translateX(-" + (index * cardWidth) + "px)";
    };

    BF.state.newsTimer = setInterval(move, BF.config.newsInterval);

    track.addEventListener("mouseenter", ()=> clearInterval(BF.state.newsTimer));
    track.addEventListener("mouseleave", ()=>{
        BF.state.newsTimer = setInterval(move, BF.config.newsInterval);
    });

};


/* ================= RESPONSIVE ================= */

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


/* ================= INIT ================= */

BF.init = function(){

    if(BF.state.initialized){
        console.log("BF init skip (already initialized)");
        return;
    }

    BF.state.initialized = true;

    document.documentElement.classList.add("bf-loaded");

    BF.state.isMobile = window.innerWidth < 1024;

    BF.ui.renderHeader();
    BF.ui.renderFooterNav();
    BF.ui.renderSideMenu();
    BF.ui.bindMenuEvents();
    BF.ui.renderFooter();
    BF.ui.renderCookieBar();

    BF.utils.setActiveNav();
    BF.utils.initHeroSlider();
    BF.utils.initNewsSlider();

    window.addEventListener("resize", BF.utils.handleResize);

    BF.runModules();

    console.log("BF Core Ready v" + BF.version);
};


/* HEADER SCROLL EFFECT */
window.addEventListener("scroll", function(){

  const header = document.querySelector(".top-header");
  if(!header) return;

  if(window.scrollY > 20){
    header.classList.add("scrolled");
  }else{
    header.classList.remove("scrolled");
  }

});


/* ================= SAFE START ================= */

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", BF.init);
}else{
    setTimeout(BF.init,0);
}

window.addEventListener("load", function(){
    if(!BF.state.initialized){
        BF.init();
    }
});

})();