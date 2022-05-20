var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src)
    }
};

function liveSearch() {
    var input, filter, ul, li, a, i, txtValue,bValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    li = table.getElementsByClassName('search');
      for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByClassName("item")[0];
      b = li[i].getElementsByClassName("seller")[0];
      txtValue = a.textContent || a.innerText;
      txtValue2 = b.textContent || b.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }