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

function sort(event){
var sortBy = document.querySelector('#sort-by');
    item = document.querySelectorAll('.search');
    ul = document.getElementById("myUL");
    let itemsArray = Array.prototype.slice.call(item,0);
    itemsArray = itemsArray.sort(function(a, b) {
    let aVal = ('stock' == sortBy.value) ? a.dataset.stock : ('rating' == sortBy.value) ? a.dataset.rating : ('none' == sortBy.value) ? a.dataset.none : ('price-high' == sortBy.value) ? parseInt(a.dataset.price) : ('price-low' == sortBy.value) ? parseInt(a.dataset.price) : a.dataset.name.toLowerCase();
    let bVal = ('stock' == sortBy.value) ? b.dataset.stock : ('rating' == sortBy.value) ? b.dataset.rating : ('none' == sortBy.value) ? b.dataset.none : ('price-high' == sortBy.value) ? parseInt(b.dataset.price) : ('price-low' == sortBy.value) ? parseInt(b.dataset.price) : b.dataset.name.toLowerCase();
    if(sortBy.value == 'price-high' || sortBy.value == 'rating' || sortBy.value == 'stock'){
        return aVal > bVal ? -1 : 1;
    } else {
        return aVal > bVal ? 1 : -1;
    }
    });
    ul.innerHTML = '';
    itemsArray.forEach((item,index) => {
      ul.append(item);
    });
}

var loadFile = function(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
};

document.addEventListener(
  "click",
  function(event) {
      var target = event.target;
      var replyForm;
      if (target.matches("[data-toggle='reply-form']")) {
          replyForm = document.getElementById(target.getAttribute("data-target"));
          text = document.getElementById(target.getAttribute("data-target")+"-2");
          replyForm.classList.toggle("d-none");
          text.classList.toggle('d-none');
      }
  },
  false
);