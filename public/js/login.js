
function myFunction(){
    var x = document.getElementById("password");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if(x.type === "password"){
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    } else{
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
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