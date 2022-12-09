var xhr = new XMLHttpRequest();
var doc;
xhr.onreadystatechange = function (){
    if (xhr.readyState == 4 && xhr.status == 200){
        doc = xhr.response;
        console.log(doc.entries)
        doc.entries.forEach((entries, index) => {
            console.log('API: ' + entries["API"] + ' Category: ' + entries["Category"]);
        });
    }
   

    
}


xhr.open("GET", "https://api.publicapis.org/entries");

xhr.responseType = 'json';

xhr.send();