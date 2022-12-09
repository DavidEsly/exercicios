var xhr = new XMLHttpRequest();
var doc;
//função onde caso a resposta seja positiva ele faz a coleta dos dados e joga na variável doc
xhr.onreadystatechange = function (){
    if (xhr.readyState == 4 && xhr.status == 200){
        doc = xhr.response;
        console.log(doc.entries)
        //percorrendo o array de objetos
        doc.entries.forEach((entries, index) => {
            console.log('API: ' + entries["API"] + ' Category: ' + entries["Category"]);
        });
    }
   

    
}

//pegando da url somente quem possuir a categoria animals
xhr.open("GET", "https://api.publicapis.org/entries?category=animals");

xhr.responseType = 'json'; //definindo o tipo de resposta recebido

xhr.send(); //enviando a requisição