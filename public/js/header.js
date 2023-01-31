const navbarToggler = document.getElementById("navbar-toggler");
const menu = document.getElementById("menu");

navbarToggler.addEventListener("click", (event)=>{
    menu.classList.toggle("active");
});