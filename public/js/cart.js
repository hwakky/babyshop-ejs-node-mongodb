function disableProceed(){
    const proceedButton = document.getElementById('proceed');
    const check = document.getElementsById('quantity');
    if(check.value > check.max){
      proceedButton.disabled = true;
    } else {
      proceedButton.disabled = false;
    }
}