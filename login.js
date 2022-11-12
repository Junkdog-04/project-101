function loggin(){
  if (document.getElementById('password').value == 'GUEST' && document.getElementById('user__name').value=='ADA'){
    window.location = "test.html";
  }
  else{
    alert("Datos erroneos, ingresa los datos correctos");
  }
}