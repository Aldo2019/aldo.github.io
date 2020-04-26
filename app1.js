/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = ["Anderson", "Beatriz", "Caio", "Daniela", "Everton", "Fabiana", "Gabriel", "Hortencia", "Igor", "Joana"];
var ref = firebase.database().ref('card');
/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
    var card = {
    nome: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
    idade: Math.floor (Math.random() * 22 + 18),
    curtidas: 0
    };

    /**
     * firebase: objeto global
     * database(): metodo para o acesso ao realtime database
     * ref(): url em string para referencia do caminho do banco
     * set(): metodo que cria dados na url passada e coloca no mesmo caminho
     * child(): acessa o nó filho passando por parametro
     * push(): cria um id e insere os dados dentro desse uid
     * once(): retorna os dados lidos de uma url
     * snapshot: um objeto retornado pela leitura
     */
    //firebase.database().ref('card/' + card.nome).set(card).then(() => {
            //adicionaCardATela(card); também funciona mas sem o Var no inicio
    //ref.set(card).then(() => {adicionaCardATela(card);});
    ref.push(card).then(snapshot =>
         {//adicionaCardATela(card, snapshot.key);
    });       
 };

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
//.remove(): remove o nó em que o metodo é utilizado, remove também todos os nós
//dentro desse nó removido.
function deletar(id) {
    ref.child(id).remove().then(() => {
        var card = document.getElementById(id);
        card.remove();
    });
};

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {

};

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {

};

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
    //ref.once('value').then(snapshot => {
    // a chave desse snapshot/caminho
    //console.log('chave', snapshot.key);
    //snapshot.forEach(value => {
      //console.log('chave', value.key);
      //adicionaCardATela(value.val(), value.key);  
    //});
   //});
   ref.on('value', snapshot => { 
        snapshot.forEach(value => {
            adicionaCardATela(value.val(), value.key);
        });
    
   });
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
    /**
     * HEADER DO CARD
     */
    let header = document.createElement("h2");
    header.innerText = informacao.nome;
    header.classList.add('card-title');
    // ===================================

    /**
     * CONTENT DO CARD
     */
    let content = document.createElement("p");
    content.classList.add('card-text');
    content.innerText = informacao.idade + ' anos.';
    // ===================================

    /**
     * BOTÕES DO CARD
     */
    let inner = document.createElement("div");
    inner.classList.add('row')
    // Botão adicionar
    let button_add = document.createElement("button");
    button_add.classList.add('btn', 'btn-link', 'col-3');
    button_add.setAttribute('onclick', "curtir('" + id + "')");
    button_add.innerText = '+';
    inner.appendChild(button_add);

    // Contador de curtidas
    let counter = document.createElement("span");
    counter.innerHTML = informacao.curtidas;
    counter.classList.add('col-3', 'text-center', 'count-number');
    inner.appendChild(counter);

    // Botão de subtrair
    let button_sub = document.createElement("button");
    button_sub.classList.add('btn', 'btn-link', 'col-3');
    button_sub.setAttribute('onclick', "descurtir('" + id + "')");
    button_sub.innerText = '-';
    inner.appendChild(button_sub);
    // ===================================

    // Botão de excluir
    let button_del = document.createElement("button");
    button_del.classList.add('btn', 'btn-danger', 'col-3');
    button_del.setAttribute('onclick', "deletar('" + id + "')");
    button_del.innerText = 'x';
    inner.appendChild(button_del);
    // ===================================

    /**
     * CARD
     */
    let card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    let card_body = document.createElement("div");
    card_body.classList.add('card-body');
    // ===================================

    // popula card
    card_body.appendChild(header);
    card_body.appendChild(content);
    card_body.appendChild(inner);
    card.appendChild(card_body);

    // insere no container
    CARD_CONTAINER.appendChild(card);
}