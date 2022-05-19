function liveSearch() {
    var input, filter, table, li, a, i, txtValue,bValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    li = table.getElementsByClassName('search');
      for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByClassName("item")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}