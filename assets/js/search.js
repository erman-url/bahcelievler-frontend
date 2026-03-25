BF.registerModule("search", function(){

    const overlay = document.querySelector(".search-overlay");
    const input = document.getElementById("siteSearchInput");
    const results = document.getElementById("searchResults");

    /* DOM safety */
    if(!overlay || !input){
        console.warn("Search modülü: gerekli elementler yok");
        return;
    }

    /* double bind engelle */
    if(overlay.dataset.bound === "1"){
        return;
    }
    overlay.dataset.bound = "1";

    /* click events */
    document.addEventListener("click", function(e){

        /* sadece overlay açma (core ile çakışmaz) */
        if(e.target.closest("#searchBtn")){
            if(overlay){
                overlay.classList.add("active");
                setTimeout(()=> input.focus(), 50);
            }
        }

        /* overlay kapama */
        if(e.target === overlay){
            overlay.classList.remove("active");
        }

    });

    const pages = [
        {title:"İlanlar", url:"ilanlar.html"},
        {title:"Fırsatlar", url:"firsatlar.html"},
        {title:"Tavsiyeler", url:"tavsiyeler.html"},
        {title:"Şikayetler", url:"sikayetler.html"},
        {title:"Hizmetler", url:"hizmetler.html"},
        {title:"Duyurular", url:"duyurular.html"}
    ];

    input.addEventListener("input", function(){

        const q = input.value.toLowerCase().trim();

        /* results safety */
        if(!results){
            console.warn("searchResults elementi yok");
            return;
        }

        results.innerHTML = "";

        if(q.length < 2){
            return;
        }

        const found = pages.filter(p =>
            p.title.toLowerCase().includes(q)
        );

        /* sonuç yoksa */
        if(found.length === 0){
            const empty = document.createElement("div");
            empty.className = "search-empty";
            empty.textContent = "Sonuç bulunamadı";
            results.appendChild(empty);
            return;
        }

        found.forEach(item=>{
            const el = document.createElement("a");
            el.href = item.url;

            /* güvenli text */
            el.textContent = item.title;

            el.className = "search-result-item";

            results.appendChild(el);
        });

    });

});