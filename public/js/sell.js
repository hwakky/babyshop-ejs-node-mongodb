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

// snow
setInterval(createSnowFlake, 300);

function createSnowFlake() {
  const snow_flake = document.createElement("i");
  snow_flake.classList.add("bx");
  snow_flake.classList.add("bx-bitcoin");
  snow_flake.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(snow_flake);

  setTimeout(() => {
    snow_flake.remove();
  }, 9500);
}
// cursor
const cursor = document.querySelector(".cursor");
var timeout;

//follow cursor on mousemove
document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = "block";

  //cursor effects when mouse stopped
  function mouseStopped() {
    cursor.style.display = "none";
  }
  clearTimeout(timeout);
  timeout = setTimeout(mouseStopped, 1000);
});

//cursor effects when mouseout
document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});

function myFunction(){
    alert("ไม่มีไรให้ดูหรอกว้ายๆๆ");
}