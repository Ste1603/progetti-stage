const sideBar = document.querySelector(".sidebar");
const openBar = document.querySelector(".sidebar-toggle");
const closeBar = document.querySelector(".close-btn");


openBar.addEventListener('click', function(){
    sideBar.classList.add("show-sidebar");
})

closeBar.addEventListener('click', function(){
    sideBar.classList.remove("show-sidebar");
})



 