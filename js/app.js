function logout() {
firebase.auth().signOut().then(() => {
  alert('Usuário deslogado');
})
}

document.addEventListener("DOMContentLoaded", function () {
  // nova instancia do firebaseui
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  //configurações do firebaseui
  var config = {
    callbacks : {
      signInSucessWithAuthResult: function(authResult) {
        console.log('authResult', authResult);
        return false;
      }
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVEDOR_ID,
      firebase.auth.FacebookAuthProvider.PROVEDOR_ID,
      firebase.auth.GoogleAuthProvider.PROVEDOR_ID,
      //firebase.auth.TwitterAuthProvider.PROVEDOR_ID,

      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'BR'
      }
    ],
    signInFlow: 'popup'
  };
  // inicializa o firebaseui
  ui.start('#firebaseui-auth', config);
})