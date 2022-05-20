// header

//searchbar
let search = document.querySelector(".search");
let clear = document.querySelector(".clear");

search.onclick = function () {
  document.querySelector(".container__searchbar").classList.toggle("active");
};

clear.onclick = function () {
  document.getElementById("search").value = "";
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

// popup
const popupScreen = document.querySelector(".popup-screen");
const popupBox = document.querySelector(".popup-box");
const closeBtn = document.querySelector(".close-btn");

window.addEventListener("load", () => {
  setTimeout(() => {
    popupScreen.classList.add("active");
  }, 600000);
});

closeBtn.addEventListener("click", () => {
  popupScreen.classList.remove("active");
  document.cookie = "WebsiteName=testWebsite; max-age=" + 1 * 1 * 1;
});
const WebsiteCookie = document.cookie.indexOf("WebsiteName=");

if (WebsiteCookie != -1) {
  popupScreen.style.display = "none";
} else {
  popupScreen.style.display = "flex";
}

// slide bar auto
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activee", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " activee";
  setTimeout(showSlides, 1800); // Change image every 5 seconds 
}

// timer 
var countDownDate = new Date("May 25, 2022 4:30:00").getTime();

var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


// click to up
const btnScrollToTop = document.querySelector("#btnScrollToTop");

btnScrollToTop.addEventListener("click", function(){
    // one
    // window.scrollTo(0,0);

    // two
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth",
    });
})

// book & electronics
function myFunction(){
  alert("ไม่มีไรให้ดูหรอกว้ายๆๆ");
}