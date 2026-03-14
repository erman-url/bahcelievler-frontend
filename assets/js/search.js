BF.registerModule("search", function(){

    const overlay = document.querySelector(".search-overlay");
    const input = document.getElementById("siteSearchInput");
    const results = document.getElementById("searchResults");

    if(!overlay || !input) return;

    document.addEventListener("click", function(e){

        if(e.target.closest("#searchBtn")){
            overlay.classList.add("active");
            input.focus();
        }

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

        const q = input.value.toLowerCase();
        results.innerHTML = "";

        if(q.length < 2) return;

        const found = pages.filter(p =>
            p.title.toLowerCase().includes(q)
        );

        found.forEach(item=>{
            const el = document.createElement("a");
            el.href = item.url;
            el.textContent = item.title;
            el.className = "search-result-item";
            results.appendChild(el);
        });

    });

});