const sideMenu=document.getElementById("sideMenu");
const overlay=document.getElementById("overlay");

document.getElementById("openMenu").onclick=()=>{
sideMenu.classList.add("active");
overlay.classList.add("active");
};

document.getElementById("closeMenu").onclick=()=>{
sideMenu.classList.remove("active");
overlay.classList.remove("active");
};

overlay.onclick=()=>{
sideMenu.classList.remove("active");
overlay.classList.remove("active");
};