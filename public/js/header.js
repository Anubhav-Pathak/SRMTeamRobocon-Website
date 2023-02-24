const navbarToggler = document.getElementById("navbar-toggler");
const menu = document.getElementById("menu");

navbarToggler.addEventListener("click", ()=>{
    menu.classList.toggle("active");
});