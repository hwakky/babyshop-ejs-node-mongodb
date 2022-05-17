function liveSearch() {
  var input, filter, ul, li, a, i, txtValue,bValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByClassName('search');

  word = document.getElementById('word');

  word.innerText = input.value; 
  word.value = input.value;
  min = document.getElementById('min').value;
  max = document.getElementById('max').value;
  if(min != '' && max == ''){
    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("item")[0];
    b = li[i].getElementsByClassName('cate')[0];
    txtValue = a.textContent || a.innerText;
    bValue = b.value;
    price = li[i].getElementsByClassName("price")[0];
    priceValue = parseInt(price.innerText);
    if (txtValue.toUpperCase().indexOf(filter) > -1 && priceValue >= min) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
    }
  } else if(min != '' && max != ''){
    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("item")[0];
    txtValue = a.textContent || a.innerText;
    price = li[i].getElementsByClassName("price")[0];
    priceValue = parseInt(price.innerText);
    if (txtValue.toUpperCase().indexOf(filter) > -1 && priceValue <= max && priceValue >= min) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
    }
  } else if(min == '' && max != ''){
    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("item")[0];
    txtValue = a.textContent || a.innerText;
    price = li[i].getElementsByClassName("price")[0];
    priceValue = parseInt(price.innerText);
    if (txtValue.toUpperCase().indexOf(filter) > -1 && priceValue <= max) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
    }
  } 
  else {
    for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("item")[0];
    b = li[i].getElementsByClassName('cate')[0];
    txtValue = a.textContent || a.innerText;
    bValue = b.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 || bValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  }
}
    function sort(event){
      var sortBy = document.querySelector('#sort-by');
          item = document.querySelectorAll('.search');
          ul = document.getElementById("myUL");
        let itemsArray = Array.prototype.slice.call(item,0);
        itemsArray = itemsArray.sort(function(a, b) {
          let aVal = ('rating' == sortBy.value) ? a.dataset.rating : ('none' == sortBy.value) ? a.dataset.none : ('price-high' == sortBy.value) ? parseInt(a.dataset.price) : ('price-low' == sortBy.value) ? parseInt(a.dataset.price) : a.dataset.name.toLowerCase();
          let bVal = ('rating' == sortBy.value) ? b.dataset.rating : ('none' == sortBy.value) ? b.dataset.none : ('price-high' == sortBy.value) ? parseInt(b.dataset.price) : ('price-low' == sortBy.value) ? parseInt(b.dataset.price) : b.dataset.name.toLowerCase();
          if(sortBy.value == 'price-high' || sortBy.value == 'rating'){
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