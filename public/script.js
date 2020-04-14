function onOff(){
    document.querySelector("#modal")
    .classList
    .toggle("hide");
}

function checkFields(event){
 
    const valuesToCheck = [
        
        "title",
        "image",
        "category",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value){
        
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty ){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault() // Para não enviar o form pro banco
        alert("Por favor, preencha todos os campos")
    }

}