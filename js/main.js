function sesion(){

    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

}

function agrega(){
    let nombre = document.getElementById('nombre').value;
    let matricula = document.getElementById('matricula').value;
    let grupo = document.getElementById('grupo').value;
    let telefono = document.getElementById('telefono').value;
    let cumpleanios = document.getElementById('nacimiento').value;
    console.log(nombre);

}