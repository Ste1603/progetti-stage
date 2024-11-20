//using selectors inside the element solution
/*const questionBtns = document.querySelectorAll(".question-btn");

questionBtns.forEach((btn) => {
    btn.addEventListener('click', function(e){
       //recupero l'elemento question da button
       const question = e.currentTarget.parentElement.parentElement;
       question.classList.toggle("show-text");
    })
})*/

// traversing the dom solution
const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
    const btn = question.querySelector(".question-btn");
    btn.addEventListener('click', function(){
       
        //controllo se la question aperta è quella associata al 
        //button premuto, altrimenti la chiudo
        questions.forEach((item) => {
            if(item !== question){
                item.classList.remove("show-text");
            }
        })

        question.classList.toggle("show-text");
    })
})
