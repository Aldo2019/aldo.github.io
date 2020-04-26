/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');

var ref = firebase.storage().ref('arquivos');
/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
    var arquivo = event.target.files[0];

    ref.child('arquivo').put(arquivo).then(snapshot => {
      ref.child('arquivo').getDownloadURL().then(
        url => {console.log('string para download', url);
      });
    });
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(arquivo);
  reader.onload = function() {
    //console.log(reader.result);
    const base64 = reader.result.split('base64,')[1];

    ref.child('imagem').putString(base64, 'base64', {
      contentType: 'image/png'}).then(snapshot => {
        //console.log('snapshot', snapshot);
        ref.child('imagem').getDownloadURL().then(
        url => {console.log('string para download', url);
      });
    });
  }
}