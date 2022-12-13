function getUrl(url) {
    var requisicao = new XMLHttpRequest();
    requisicao.open("GET", url, false);
    requisicao.send();
    return requisicao.response;
}

function carregaApis() {
    let categorias = getUrl("https://api.publicapis.org/categories");
    let dados = JSON.parse(categorias);
    const select = document.querySelector('select'); //pegando o select do formulário
    dados.categories.forEach(element => {
        let opcoes = criaOpcoesForm(element);
        select.appendChild(opcoes);        
    });    
}

function criaOpcoesForm(opcoes) {
    const op = document.createElement('option');
    const opText = document.createTextNode(opcoes); //informando qual será o texto ao option
    op.appendChild(opText); //adicionando o texto ao option
    op.setAttribute('value', opcoes); // adicionando o valor ao option
    return op; 
}

function preencheTabela(categoria){
    selectApi(''); //limpando a tabela anterior 
    let entrada = getUrl(`https://api.publicapis.org/entries?category=${categoria}`);
    let dados = JSON.parse(entrada);
    let tabela = document.getElementById("tabela");

    dados.entries.forEach(element => {      //foreach para pegar os dados que irão preencher a tabela
        let linha = criaLinhaTabela(element); //passando o dado para a função que criará a linha e coluna
        tabela.appendChild(linha); // adicionando a linha a tabela
    });
}

function criaLinhaTabela(dados) {
    let linha = document.createElement("tr"); //Criando elemento na tabela
    let colApi = document.createElement("td");
    let colDescription = document.createElement("td");
    colApi.innerHTML = dados.API; //Adicionando informações ao campo da tabela
    colDescription.innerHTML = dados.Description;

    linha.appendChild(colApi); //Adicionando as colunas a linha
    linha.appendChild(colDescription);

    return linha;
}

function selectApi(entrada) {
    if (entrada == "") { //Condicional para caso a entrada seja vazia ela limpará a tela ou não exibirá nenhum dado
        document.getElementById("tabela").innerHTML = "";
        return;
      }
      
    var select = document.getElementById("select"); //pegando o select pelo ID
    var optVal = select.options[select.selectedIndex].value; //pegando o valor que o user definiu no select
    preencheTabela(optVal); //passando o valor para a função que irá preencher a tabela com a categoria escolhida pelo usuário
    
}

carregaApis(); // inicia o formulário com as categorias existentes na api
