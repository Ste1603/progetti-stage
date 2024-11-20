//imposto il counter a 0 come valore iniziale
let count = 0;
const value = document.getElementById("value");

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    //nella funzione di callback al click passo come parametro l'evento 
    //stesso che ha scatenato l'evento (conterrà tutte le informazioni)
    //su quell'evento) in modo da capire su quale dei tre tasti ho premuto
    button.addEventListener('click', function(e){
        //e.currentTarget ritorna l'oggetto su cui si preme
        const classes = e.currentTarget.classList;
        if(classes.contains('decrease'))
            count--;
        else if(classes.contains('increase'))
            count++;
        else
            count = 0;

        value.textContent = count;

        if(count > 0)
            value.style.color = "green";
        else if(count < 0)
            value.style.color = "red";
        else
            value.style.color = "black";
    })
});
