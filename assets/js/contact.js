/* =====================================================
   Bahçelievler Forum - Contact Module
   Modüler Sistem | KVKK | Veri Toplama Hazır
===================================================== */

(function(){

if(window.__BF_CONTACT__) return;
window.__BF_CONTACT__ = true;

/* ================= MODULE REGISTER ================= */

BF.registerModule("contact", function(){

    /* ================= PAGE CHECK ================= */
    if(!document.getElementById("contactPage")) return;

    console.log("Contact module loaded");

    /* ================= ELEMENTS ================= */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");
    const btn = document.getElementById("submitBtn");

    /* ================= ACCORDION ================= */
    const accItems = document.querySelectorAll(".acc-item");

    if(accItems.length){
        accItems.forEach(item=>{
            const title = item.querySelector(".acc-title");

            if(!title) return;

            title.addEventListener("click", ()=>{
                item.classList.toggle("active");
            });
        });
    }

    /* ================= FORM CHECK ================= */
    if(!form) return;

    /* ================= SUBMIT ================= */
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const name = getValue("name");
        const email = getValue("email");
        const message = getValue("message");
        const kvkk = document.getElementById("kvkk")?.checked;
        const honeypot = getValue("website");

        /* ================= SPAM CHECK ================= */
        if(honeypot){
            console.warn("Spam blocked");
            return;
        }

        /* ================= VALIDATION ================= */
        if(!name || !email || !message){
            return showStatus("Lütfen tüm alanları doldurun", "error");
        }

        if(!validateEmail(email)){
            return showStatus("Geçerli bir e-posta girin", "error");
        }

        if(message.length < 5){
            return showStatus("Mesaj çok kısa", "error");
        }

        if(!kvkk){
            return showStatus("KVKK onayı gereklidir", "error");
        }

        /* ================= BUTTON STATE ================= */
        btn.disabled = true;
        btn.innerText = "Gönderiliyor...";

        /* ================= DATA ================= */
        const payload = {
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
            page: "contact",
            userAgent: navigator.userAgent
        };

        console.log("Contact payload:", payload);

        /* ================= MOCK SUBMIT ================= */
        setTimeout(()=>{
            showStatus("Mesajınız alındı", "success");
            form.reset();
            resetButton();

            /* TRACK */
            track("contact_submit");

        }, 900);

        /* ================= FIREBASE (İLERİDE) ================= */
        /*
        BF.api.saveContact(payload)
        .then(()=>{
            showStatus("Mesaj alındı", "success");
            form.reset();
            resetButton();
        })
        .catch(()=>{
            showStatus("Bir hata oluştu", "error");
            resetButton();
        });
        */

    });

    /* ================= HELPERS ================= */

    function getValue(id){
        return document.getElementById(id)?.value.trim() || "";
    }

    function validateEmail(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showStatus(msg, type){

        if(!status) return;

        status.innerText = msg;
        status.className = "status " + type;
        status.style.display = "block";

        setTimeout(()=>{
            status.style.display = "none";
        }, 4000);
    }

    function resetButton(){
        btn.disabled = false;
        btn.innerText = "Gönder";
    }

    /* ================= TRACKING ================= */
    function track(event){
        console.log("EVENT:", event);

        /* ileride analytics */
        /*
        BF.analytics.track(event)
        */
    }

});
})();