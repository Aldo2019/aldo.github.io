var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
   var email = document.getElementById('email').value;
   var senha = document.getElementById('senha').value;
   firebase.auth().createUserWithEmailAndPassword(
     email,senha).then(user => {
       console.log('usuario', user);
       alert('Usuario criado e logado.');
     }).catch(err => {
       console.log('error', error);
     });
}

/**
 * Função para login
 */
function loginEmail() {
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;
  firebase.auth().signInWithEmailAndPassword(
    email, senha).then(() => { alert('Usuário Logado.');
    }).catch(err => {
      console.log('error', error);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged((usuario) => {
      if(usuario) {
        console.log('usuario', usuario);
        currentUser = usuario;

        //Mudando o idioma do Firebase
        firebase.auth().languageCode = 'pt';

        if(!usuario.emailVerified) { 
          //Envia um email para o usuario verificar a conta dele
          usuario.sendEmailVerification().then(() => {
            alert('email de verificação enviado');
          });
        };
        
        //Envia um email para mudança de senha ao email do usuario
        firebase.auth().sendPasswordResetEmail(usuario.email).then(() => {
           alert('Email para reset de senha enviado.');
        });
      } else {
        console.log('Não há usuários logados');
      }
    });
    currentUser = firebase.auth().currentUser;

    if(currentUser) {
      console.log('currentUser', currentUser);
      currentUser.updateProfile({
        displayName: "Aldo Costa",
        photoURL: ''
      });
    }
});

//deleta usuario
function deletaUsuario() {
  if (currentUser){
      currentUser.delete().then(() => {
        alert ('usuario excluido');
      });
  }
}