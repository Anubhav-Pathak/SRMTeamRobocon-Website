const navbarToggler = document.getElementById("navbar-toggler");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay")
const menuIcon = document.getElementById("menu-icon")

navbarToggler.addEventListener("click", ()=>{
    menu.classList.toggle("active");
    overlay.classList.toggle("hidden");
    if(menuIcon.classList.contains("fa-bars")){
        menuIcon.classList.replace("fa-bars", "fa-times");
    }else {
        menuIcon.classList.replace("fa-times", "fa-bars");
    }
    menuIcon.classList.add("switch");
});

overlay.addEventListener("click", ()=> {
    menu.classList.toggle("active");
    overlay.classList.toggle("hidden");
    menuIcon.classList.replace("fa-times", "fa-bars");
})