
function sesion() {


  // @ts-check
  /** Nombre de usuario atenticado por Firebase. */
  let usuario = "";
  /** Conexión al sistema de autenticación de Firebase. */
  // @ts-ignore
  const auth = firebase.auth();
  /** Tipo de autenticación de usuarios. En este caso es con Google. */
  // @ts-ignore
  // const provider = new firebase.auth.GoogleAuthProvider();
  // /* Configura el proveedor de Google para que permita seleccionar de una
  //  * lista. */
  // provider.setCustomParameters({ prompt: "select_account" });
  // /* Recibe una función que se invoca cada que hay un cambio en la
  //  * autenticación y recibe el modelo con las características del usuario.*/
  // auth.onAuthStateChanged(
  //   /** Recibe las características del usuario o null si no ha iniciado
  //    * sesión. */
  //   async usuarioAuth => {
  //     if (usuarioAuth && usuarioAuth.email) {
  //       // Usuario aceptado.
  //       usuario = usuarioAuth.email;
  //       // Muestra los salida del chat.        
  //     } else {
  //       // No ha iniciado sesión. Pide datos para iniciar sesión.
  //       await auth.signInWithRedirect(provider);
  //     }
  //   },
  //   // Función que se invoca si hay un error al verificar el usuario.
  //   procesaError
  // );


  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
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
var db = firebase.firestore();

function agrega() {

  var tel = document.getElementById("telefono").value;
  var nom = document.getElementById("nombre").value;
  var matri = document.getElementById("matricula").value;
  var grupo = document.getElementById("grupo").value;
  var fecha = document.getElementById("fecha").value;



  db.collection("Alumnos").add({
    TELEFONO: tel,
    NOMBRE: nom,
    MATRICULA: matri,
    GRUPO: grupo,
    FECHA: fecha
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
/** Muestra los mensaje almacenados en la collection "MENSAJE". Se
 * actualiza automáticamente. */


var db = firebase.firestore();

db.collection("Alumnos")
  .onSnapshot(
    /** Función que muestra los datos enviados por el servidor. Si los
     * datos cambian en el servidor, se vuelve a invocar esta función y
     * recibe los datos actualizados.
     * @param {Array} querySnapshot estructura parecida a un Array, que
     * contiene una copia de los datos en el servidor. */
    querySnapshot => {
      // Vacía la lista con los mensajes.
      // @ts-ignore
      var salida = document.getElementById('salida');
      salida.innerHTML = " ";
      /* Revisa un por uno los registros de la consulta y los muestra.
       * El iterador "doc" es un registro de la base de datos. */
      querySnapshot.forEach(doc => {
        // recupera los datos almacenados en el registro.
        const data = doc.data();

        salida.innerHTML += /* html */
          `<td>${doc.id} </td>
              <td>${doc.data().NOMBRE} </td>
              <td>${doc.data().MATRICULA} </td>
              <td>${doc.data().GRUPO} </td>
              <td>${doc.data().TELEFONO} </td>
              <td>${doc.data().FECHA} </td>
              <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')" >Eliminar</button></td>
              <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().NOMBRE}','${doc.data().MATRICULA}','${doc.data().GRUPO}','${doc.data().TELEFONO}','${doc.data().FECHA}')">Editar</button></td>`;



      })
    },
    /* Función que se invoca cuando hay un error. Muesstra el error. Al
     * invocar esta función la conexión se cancela. Por lo mismo, se
     * vuelve a conectar. */
    e => {
      procesaError(e);
      // Intenta conectarse otra vez.
      muestraMensajes();
    }
  )







/** Procesa un error. Muestra el objeto en la consola y un cuadro de
 * alerta con el mensaje.
 * @param {Error} e descripción del error. */
function procesaError(e) {
  console.log(e);
  alert(e.message);
}

/** Map que contiene el texto de escape de los caracteres especiales de
 * HTML.
 * @type {Readonly<Map<string, string>> } */
const codMap = Object.freeze(new Map([['&', '&amp;'], ['<', '&lt;'],
['>', '&gt;'], ['"', '&quot;'], ["'", '&#039;']]));

/** Codifica un texto para que escape los caracteres especiales y no se
 * pueda interpretar como HTML. Esta técnica evita la inyección de código.
 * @param {string} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
function cod(texto) {
  return (texto || "").replace(/[&<>"']/g, letra => codMap.get(letra));
}


function eliminar(id) {
  db.collection("Alumnos").doc(id).delete().then(function () {
    console.log("Se borro el documento");
  }).catch(function (error) {
    console.log("Error al borrar el documento ");
  });


}

function editar(id, nombre, matricula, grupo, telefono,fecha) {


  document.getElementById("telefono").value = telefono;
  document.getElementById("nombre").value = nombre;
  document.getElementById("matricula").value = matricula;
  document.getElementById("grupo").value = grupo;
  document.getElementById("fecha").value = fecha;
  


  // const fech = "Ejemplo";



  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';
  boton.onclick = function () {


    var tel = document.getElementById("telefono").value;
    var nom = document.getElementById("nombre").value;
    var matri = document.getElementById("matricula").value;
    var grup = document.getElementById("grupo").value;
    var fech = document.getElementById("fecha").value;  

    var alumno = db.collection("Alumnos").doc(id);

    return alumno.update({
      TELEFONO: tel,
      NOMBRE: nom,
      MATRICULA: matri,
      GRUPO: grup,
      FECHA: fech,
    })  
      .then(() => {
        boton.innerHTML = 'Guardar';
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

  }

}

function terminarSesion(){

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}
