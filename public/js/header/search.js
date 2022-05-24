// header

//searchbar
let search = document.querySelector(".search");
let clear = document.querySelector(".clear");

search.onclick = function () {
  document.querySelector(".container__searchbar").classList.toggle("active");
};

//on off sidenav
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// sidebar
document.addEventListener("DOMContentLoaded", function(event) {

  const showNavbar = (toggleId, navId, bodyId, headerId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId),
  bodypd = document.getElementById(bodyId),
  headerpd = document.getElementById(headerId)
  
  // Validate that all variables exist
  if(toggle && nav && bodypd && headerpd){
  toggle.addEventListener('click', ()=>{
  // show navbar
  nav.classList.toggle('show')
  // change icon
  toggle.classList.toggle('bx-x')
  // add padding to body
  bodypd.classList.toggle('body-pd')
  // add padding to header
  headerpd.classList.toggle('body-pd')
  })
  }
  }
  
  showNavbar('header-toggle','nav-bar','body-pd','header')
});

// background
// song
var mySong = document.getElementById("mySong");
var play = document.getElementById("icon-music");

play.onclick = function () {
  if (mySong.paused) {
    mySong.play();
    play.classList.remove("bx-volume-mute");
    play.classList.add("bx-music");
  } else {
    mySong.pause();
    play.classList.remove("bx-music");
    play.classList.add("bx-volume-mute");
  }
};

// snow
setInterval(createSnowFlake, 100);

function createSnowFlake() {
  const snow_flake = document.createElement("i");
  snow_flake.classList.add("fa");
  snow_flake.classList.add("fa-snowflake-o");
  snow_flake.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(snow_flake);

  setTimeout(() => {
    snow_flake.remove();
  }, 10000);
}
